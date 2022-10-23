import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './../AddMember.css';

const AddMemberComp = () => {
    const navigate = useNavigate();
    let newMember = {
        firstName: "null",
        lastName: "null",
        ID: "null",
        address: {
            city: "null",
            street: "null",
            streetNumber: "null"
        },
        birthDate: "null",
        phoneNumber: "null",
        phoneMobileNumber: "null",
        vaccinations: [{}, {}, {}, {}],
        recoveryDate: "null",
        positiveResult: "null"
    };
    let values = ["פייזר", "מודרנה", "אסטרהזניקה"];
    let [allVac, setAllVabc] = useState([{}, {}, {}, {}]);
    const [errors, setErrors] = useState({})
    const [disable, setDisable] = useState([true, true, true])

    const addVac = (number) => {
        if (allVac[number].date && allVac[number].manufacturer) {
            let arr = [...disable];
            arr[number] = false;
            setDisable(arr)
        }
    }
    let firstNameRef = useRef("null");
    let lastNameRef = useRef("null");
    let IDRef = useRef("null");
    let cityRef = useRef({});
    let streetRef = useRef({});
    let streetNumberRef = useRef({});
    let birthDateRef = useRef("null");
    let phoneNumberRef = useRef("null");
    let phoneMobileNumberRef = useRef("null");
    let recoveryDateRef = useRef("null");
    let positiveResultRef = useRef("null");
    let add = async (e) => {
        if (saveDetails()) {
            const { data } = await axios.post("http://localhost:8000/api/members/", newMember);
            if(data="Created successfully"){
                alert("החבר נוסף בהצלחה חזור לדף כל החברים כדי לראותו")
            }
        }
    }
    let saveDetails = () => {
        newMember.firstName = firstNameRef.current.value;
        newMember.lastName = lastNameRef.current.value;
        newMember.ID = IDRef.current.value;
        newMember.address.city = cityRef.current.value;
        newMember.address.street = streetRef.current.value;
        newMember.address.streetNumber = streetNumberRef.current.value;
        newMember.birthDate = birthDateRef.current.value;
        newMember.phoneNumber = phoneNumberRef.current.value;
        newMember.phoneMobileNumber = phoneMobileNumberRef.current.value;
        newMember.positiveResult = positiveResultRef.current.value;
        newMember.recoveryDate = recoveryDateRef.current.value;
        newMember.vaccinations = allVac;
        let err = {};
        for (let i = 0; i < newMember.vaccinations.length; i++) {
            if (!newMember.vaccinations[i].date && newMember.vaccinations[i].manufacturer || newMember.vaccinations[i].date && !newMember.vaccinations[i].manufacturer)
                err["vaccinations"] = { massege: "חסרים נתונים לגבי אחד מהחיסונים" }
        }
        alert(newMember.vaccinations.length)

        while (newMember.vaccinations.length > 0 && !newMember.vaccinations[newMember.vaccinations.length - 1].date && !newMember.vaccinations[newMember.vaccinations.length - 1].manufacturer) {
            newMember.vaccinations.pop();
        }
        let isValidForm = true;
        var name = /^[\u0590-\u05fe]+$/i
        var onlyNumbers = /^[0-9]*$/;
        if (!name.test(newMember.firstName)) {
            isValidForm = false;
            err["firstName"] = { massege: "הכנס אותיות בעברית בלבד" };
        }
        if (!name.test(newMember.lastName)) {
            isValidForm = false;
            err["lastName"] = { massege: "הכנס אותיות בעברית בלבד" };
        }

        if (newMember.ID.length != 9 || !onlyNumbers.test(newMember.ID)) {
            isValidForm = false;
            err["ID"] = { massege: "תעודת זהות צריכה להכיל 9 ספרות בלבד" };
        }
        if (!name.test(newMember.address.city)) {
            isValidForm = false;
            err["city"] = { massege: "הכנס אותיות בעברית בלבד" };
        }
        if (!name.test(newMember.address.street)) {
            isValidForm = false;
            err["street"] = { massege: "הכנס אותיות בעברית בלבד" };
        }
        if (!onlyNumbers.test(newMember.address.streetNumber) || (newMember.address.streetNumber < 1 || newMember.address.streetNumber > 999)) {
            isValidForm = false;
            err["streetNumber"] = { massege: "מספר רחוב צריך להיות בין 1 ל-1,000" };
        }
        if (newMember.phoneNumber.length != 9 || !onlyNumbers.test(newMember.phoneNumber)) {
            isValidForm = false;
            err["phoneNumber"] = { massege: "מספר טלפון נייח חייב להכיל 9 ספרות כולל קידומת" };
        }
        if (newMember.phoneMobileNumber.length != 10 || !onlyNumbers.test(newMember.phoneMobileNumber)) {
            isValidForm = false;
            err["phoneMobileNumber"] = { massege: "מספר טלפון נייד חייב להכיל 10 ספרות בדיוק" };
        }
        if (!newMember.birthDate) {
            isValidForm = false;
            err["birthDate"] = { massege: "לא נבחר תאריך לידה" }
        }
        if (newMember.recoveryDate && !newMember.positiveResult) {
            isValidForm = false;
            err["recoveryDate"] = { massege: "הוכנס תאריך החלמה ללא תאריך תוצאה חיובית" }
        }
        setErrors(err);
        return isValidForm;
    }
    return (<div>
        <div id="header">
            <h2>הוספת חבר חדש</h2>
            <input type={"button"} value="בחזרה לכל חברי קופת החולים" onClick={() => navigate("/")} /></div>
        <form id="form">
            <div>
                <label>שם פרטי</label>
                <input type={"text"} ref={firstNameRef} /><br />
                {errors["firstName"] && <b>{errors["firstName"].massege}</b>}
            </div>
            <div>
                <label>שם משפחה</label>
                <input type={"text"} ref={lastNameRef} /><br />
                {errors["lastName"] && <b>{errors["lastName"].massege}</b>}
            </div>
            <div>
                <label>תעודת זהות</label>
                <input type={"text"} ref={IDRef} /><br />
                {errors["ID"] && <b>{errors["ID"].massege}</b>}
            </div>
            <div style={{ "border": "1px black solid" }}>
                <h3>כתובת</h3>
                <div>
                    <label>עיר</label>
                    <input type={"text"} ref={cityRef} /><br />
                    {errors["city"] && <b>{errors["city"].massege}</b>}
                </div>
                <div>
                    <label>רחוב</label>
                    <input type={"text"} ref={streetRef} /><br />
                    {errors["street"] && <b>{errors["street"].massege}</b>}
                </div>
                <div>
                    <label>מספר רחוב</label>
                    <input type={"number"} ref={streetNumberRef} /><br />
                    {errors["streetNumber"] && <b>{errors["streetNumber"].massege}</b>}
                </div>
            </div>
            <div>
                <label>תאריך לידה</label>
                <input type={"date"} ref={birthDateRef} /><br />
                {errors["birthDate"] && <b>{errors["birthDate"].massege}</b>}
            </div>
            <div>
                <label>טלפון</label>
                <input type={"text"} ref={phoneNumberRef} /><br />
                {errors["phoneNumber"] && <b>{errors["phoneNumber"].massege}</b>}
            </div>
            <div>
                <label>טלפון נייד</label>
                <input type={"text"} ref={phoneMobileNumberRef} /><br />
                {errors["phoneMobileNumber"] && <b>{errors["phoneMobileNumber"].massege}</b>}
            </div>
            <div style={{ "border": "1px black solid" }} >
                <h3>חיסונים</h3>
                <div>
                    <label>חיסון ראשון</label>
                    <input type={"date"} onChange={e => { allVac[0].date = e.target.value; addVac(0) }} />
                    <select onChange={e => { allVac[0].manufacturer = values[+e.target.value - 1]; addVac(0) }}>
                        <option value={0}></option>
                        <option value={1}>פייזר </option>
                        <option value={2}>מודרנה </option>
                        <option value={3}>אסטרהזניקה </option>
                    </select>
                </div>
                <div>
                    <label>חיסון שני</label>
                    <input type={"date"} disabled={disable[0]} onChange={e => { allVac[1].date = e.target.value; addVac(1) }} />
                    <select disabled={disable[0]} onChange={e => { allVac[1].manufacturer = values[+e.target.value - 1]; addVac(1) }} >
                        <option value={0}></option>
                        <option value={1}>פייזר </option>
                        <option value={2}>מודרנה </option>
                        <option value={3}>אסטרהזניקה </option>
                    </select>
                </div>
                <div>
                    <label>חיסון שלישי</label>
                    <input type={"date"} disabled={disable[1]} onChange={e => { allVac[2].date = e.target.value; addVac(2) }} />
                    <select disabled={disable[1]} onChange={e => { allVac[2].manufacturer = values[+e.target.value - 1]; addVac(2) }}>
                        <option value={0}></option>
                        <option value={1}>פייזר </option>
                        <option value={2}>מודרנה </option>
                        <option value={3}>אסטרהזניקה </option>
                    </select>
                </div>
                <div>
                    <label>חיסון רביעי</label>
                    <input type={"date"} disabled={disable[2]} onChange={e => { allVac[3].date = e.target.value; addVac(3) }} />
                    <select disabled={disable[2]} onChange={e => { allVac[3].manufacturer = values[+e.target.value - 1]; addVac(3) }}>
                        <option value={0}></option>
                        <option value={1}>פייזר </option>
                        <option value={2}>מודרנה </option>
                        <option value={3}>אסטרהזניקה </option>
                    </select>
                </div>
            </div>
            {errors["vaccinations"] && <b>{errors["vaccinations"].massege}</b>}

            <div>
                <label> תוצאה חיובית</label>
                <input type={"date"} ref={positiveResultRef} /><br />
            </div> <div>
                <label>מועד החלמה</label>
                <input type={"date"} ref={recoveryDateRef} /><br />
                {errors["recoveryDate"] && <b>{errors["recoveryDate"].massege}</b>}
            </div>
            <button type={"submit"} onClick={add}>הוסף</button>
        </form>
    </div>);
}

export default AddMemberComp;