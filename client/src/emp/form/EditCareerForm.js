import React, {useState, useEffect } from 'react';
import SerachAuth from "./SerachAuth";

const EditCareerForm = props => {
        const [ career, setCareer ] = useState(props.currentCareer)
        const [ error, setError ] = useState([])

        // useEffect(
        //     () => {
        //         setCareer(props.currentCareer)
        //     },
        //     [ props ]
        // )

    const vaildateCareer = () => {

        let fields = career;
        let errors = {};
        let formIsValid = true;

        //title
        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Cannot be empty";
        }
        //summary
        if(!fields["summary"]){
            formIsValid = false;
            errors["summary"] = "Cannot be empty";
        }

        //authAddress
        if(!fields["authAddr"]){
            formIsValid = false;
            errors["authAddr"] = "Cannot be empty";
        }

        if(typeof fields["authAddr"] !== "undefined"){
            if(!fields["authAddr"].match(/[a-zA-Z0-9]{42}/g)){
                formIsValid = false;
                errors["authAddr"] = "this is not blockchain address";
            }
        }
        setError(errors);
        return formIsValid;

    }
    const setAuthAddress = authAddr => {
        setCareer({...career, authAddr : authAddr })
    }

    const handleInputChange = event => {
            const { name, value } = event.target

            setCareer({ ...career, [name]: value })
        }

        return (
            <form
                onSubmit={event => {
                    event.preventDefault()
                    if(vaildateCareer()) props.updateCareer(career);
                }}
            >
                <label>경력 제목</label>
                <input type="text" name="title" value={career.title} onChange={handleInputChange} />
                <br/><span style={{ color : 'red'}}>{error["title"]} </span>
                <label>내용 기술</label>
                <input type="text" name="summary" value={career.summary} onChange={handleInputChange}  />
                <br/><span style={{ color : 'red'}}>{error["summary"]} </span>
                <label>인증처 address</label>
                <SerachAuth
                    setAuthAddress = {setAuthAddress}
                    authAddr={career.authAddr}
                    key={career.authAddr}
                />
                <button>인증처 변경</button>
                <br/><span style={{ color : 'red'}}>{error["authAddr"]} </span>
                <label>근무 기간</label>
                <label>시작일</label>
                <input type="date" name="start_date" value={career.start_date} onChange={handleInputChange}  />
                <label>종료일</label>
                <input type="date" name="end_date" value={career.end_date} onChange={handleInputChange}  />
                <button>Update user</button>
                <button onClick={() => props.setEditing(false)} className="button muted-button">
                    Cancel
                </button>
            </form>
        )
}

export default EditCareerForm;