import axios from "axios"
import { useEffect, useState } from "react"
import MemberComp from "./Member";
import { useNavigate } from "react-router-dom";
import './../Members.css';

const MembersComponent = () => {
    const [members, setMembers] = useState([])
    const getAllMembers = async () => {
        const { data } = await axios.get("http://localhost:8000/api/members/")
        setMembers(data);
    }
    const navigate=useNavigate();
    useEffect(() => { getAllMembers(); }, [<MemberComp/>]);
    return (<div>
        <h1>
            כל החברים
        </h1>
        <div id="allInputs">
        <input type={"button"} value="הוספת חבר חדש" onClick={()=>navigate("/add")}/>
        <input type={"button"} value="למידע כללי אודות מגיפת הקורונה"onClick={()=>navigate("/corona")}/>
        <input type={"button"} value="מחיקת חבר קיים"onClick={()=>navigate("/delete")}/></div>
        {members.map((member, index) => {
            return (<div key={index}>
             <MemberComp key={index} member={member}/>
                </div>
            )
        })}
    </div>);
}

export default MembersComponent;