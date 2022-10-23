import axios from "axios";
import { useEffect, useState } from "react";

const UpdateMemberComp = (props) => {
    let [member, setMember] = useState(props.member);
    const [address, setAddress] = useState({})
    let [vaccinations, setVaccinations] = useState(props.member.vaccinations);
    let values = ["פייזר", "מודרנה", "אסטרהזניקה"];
    const [disabled, setDisable] = useState(props.member.vaccinations.length > 3)
    const [newVac, setNewVac] = useState({});
    useEffect(() => {
        console.log(disabled);
    }, [])
    const addVac = () => {
        if (vaccinations.length == 3) {
            setDisable(true);
        }

        vaccinations.push(newVac);
        member.vaccinations = vaccinations;

    }
    const setNewAddress = () => {
        if (address.city) {
            member.address.city = address.city;
        }
        if (address.street) {
            member.address.street = address.street;
        } if (address.streetNumber) {
            member.address.streetNumber = address.streetNumber;
        }
    }
    const update = async () => {
        setNewAddress();
        const { data } = await axios.put("http://localhost:8000/api/members/" + props.member._id, member)
        if (data.msg == "Invalid") {
            alert("אחד הפרטים שוקשו שגוי נסה שנית")
        }
        else {
            alert("הפרטים החדשים נשמרו במערכת בהצלחה")
        }
    }
    return (<div style={{ "border": "3px black solid" }}>
        <div>
            <h3>עריכת חבר קיים</h3>
        </div>
        <b>שם פרטי:  </b> <input type={"text"} defaultValue={props.member.firstName} onChange={e => setMember({ ...member, firstName: e.target.value })} /><br />
        <b>שם משפחה:  </b> <input type={"text"} defaultValue={props.member.lastName} onChange={e => setMember({ ...member, lastName: e.target.value })} /><br />
        <b>תעודת זהות:  </b> <input type={"text"} defaultValue={props.member.ID} onChange={e => setMember({ ...member, ID: e.target.value })} /><br />
        <b>כתובת:  </b>
        <input type={"text"} defaultValue={props.member.address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
        <input type={"text"} defaultValue={props.member.address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
        <input type={"number"} defaultValue={props.member.address.streetNumber} onChange={e => setAddress({ ...address, streetNumber: e.target.value })} />
        <b>תאריך לידה:  </b> <input type={"date"} defaultValue={props.member.birthDate.slice(0, 10)} onChange={e => setMember({ ...member, birthDate: e.target.value })} /><br />
        <b>מספר טלפון:  </b> <input type={"text"} defaultValue={props.member.phoneNumber} onChange={e => setMember({ ...member, phoneNumber: e.target.value })} /><br />
        <b>טלפון נייד:  </b> <input type={"text"} defaultValue={props.member.phoneMobileNumber} onChange={e => setMember({ ...member, phoneMobileNumber: e.target.value })} /><br />
        <b>תוצאה חיובית: </b> <input type={"date"} defaultValue={props.member.positiveResult && props.member.positiveResult.slice(0, 10)} onChange={e => setMember({ ...member, positiveResult: e.target.value })} /><br />
        <b>מועד החלמה:</b> <input type={"date"} defaultValue={props.member.recoveryDate && props.member.recoveryDate.slice(0, 10)} onChange={e => setMember({ ...member, recoveryDate: e.target.value })} /><br />
        <b>חיסונים קיימים:  </b>
        {member.vaccinations && member.vaccinations.map((vac, index) => {
            return (
                <div key={index}>
                    <input type={"date"} defaultValue={vac.date} onChange={e => vaccinations[index].date = e.target.value} />
                    <select defaultValue={vac.manufacturer} onChange={e => vaccinations[index].manufacturer = values[+e.target.value - 1]}>
                        <option>{vac.manufacturer}</option>
                        <option value={1}>פייזר </option>
                        <option value={2}>מודרנה </option>
                        <option value={3}>אסטרהזניקה </option>
                    </select>
                </div>
            )
        })}
        <b>הוספת חיסונים חדשים:  </b><br />
        <input type={"date"} disabled={disabled} onChange={e => setNewVac({ ...newVac, date: e.target.value })} />
        <select disabled={disabled} onChange={e => setNewVac({ ...newVac, manufacturer: values[+e.target.value - 1] })}>
            <option>בחר יצרן חיסון</option>
            <option value={1}>פייזר </option>
            <option value={2}>מודרנה </option>
            <option value={3}>אסטרהזניקה </option>
        </select><br />
        <input type={"button"} value="הוסף חיסון" onClick={addVac} />&nbsp;
        <input type={"button"} value="שמור נתונים" onClick={update} />
    </div>);
}

export default UpdateMemberComp;