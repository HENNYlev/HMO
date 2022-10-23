import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './../DeleteMember.css';

const DeleteMemberComp = () => {
    const [allMembers, setAllMembers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { getAllMembers(); }, [])
    const getAllMembers = async () => {
        const { data } = await axios.get("http://localhost:8000/api/members/")
        setAllMembers(data);
    }
    const deletMember = async (id) => {
        const { data } = await axios.delete("http://localhost:8000/api/members/" + id)
        getAllMembers();
    }
    return (<div>
        <div id="title">
            <h2>מחיקת חבר קיים</h2>
            <input type={"button"} value="בחזרה לכל חברי קופת החולים" onClick={() => navigate("/")} /></div>
        {allMembers.map((member, index) => {
            return (<div key={index} id="member">
                <h2>{member.firstName + "  " + member.lastName}</h2>
                <input type={"button"} value="מחק" onClick={() => deletMember(member._id)} />
            </div>)
        })}
    </div>);
}

export default DeleteMemberComp;