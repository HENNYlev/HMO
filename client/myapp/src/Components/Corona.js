import axios from "axios";
import { useEffect, useState } from "react";
import MemberComp from "./Member";
import { useNavigate } from "react-router-dom";
import './../Corona.css';
const CorinaComp = () => {
    const [allMembers, setAllMembers] = useState([]);
    const navigate=useNavigate();
    useEffect(() => { getAllMembers(); }, [])
    const getAllMembers = async () => {
        const { data } = await axios.get("http://localhost:8000/api/members/")
        let arr = data.filter(member => member.vaccinations.length == 0);
        setAllMembers(arr);
    }
    return (<div id="corona">
        <input type={"button"} value="בחזרה לכל חברי קופת החולים" onClick={()=>navigate("/")}/>
        <h2>{allMembers.length} חברים לא מחוסנים כלל  </h2>
        {allMembers.map((member, index) => {
            return (<div key={index}>
             <MemberComp key={index} member={member}/>
                </div>
            )
        })}
    </div>);
}

export default CorinaComp;