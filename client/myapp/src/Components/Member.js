import { useState } from "react"
import './../Member.css';
import UpdateMemberComp from "./UpdateMember";
const MemberComp = (props) => {
    const [details, setDetails] = useState(false);
    const [edit, setEdit] = useState(false);
    return (<div id="member">
        <h5 onClick={() => setDetails(!details)}>{props.member.firstName + " " + props.member.lastName}</h5>
        {details && <div style={{ "border": "2px black solid" }}>
            <b>חיסונים:</b>
            {props.member.vaccinations.length > 0 &&
                <table border={"1"}>
                    <tbody>
                        <tr><th>חיסון מספר</th><th>מועד קבלת החיסון</th><th>יצרן</th></tr>
                        {props.member.vaccinations.map((vac, index) => {
                            return (<tr key={index}>
                                <td>{index + 1}</td><td>{vac.date.slice(0, 10)}</td><td>{vac.manufacturer}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            }
            {props.member.vaccinations.length <= 0 && <>המבוטח לא התחסן</>}<br />
            {props.member.positiveResult && <><b>תוצאה חיובית: </b>{props.member.positiveResult.slice(0, 10)}</>}<br />
            {props.member.recoveryDate && <> <b>מועד החלמה:</b>{props.member.recoveryDate.slice(0, 10)}</>}<br />
            <input type={"button"} value="עריכה/סגור עריכה" onClick={()=>setEdit(!edit)} />
            {edit&&<UpdateMemberComp member={props.member}/>}
        </div>}
    </div>);
}

export default MemberComp;