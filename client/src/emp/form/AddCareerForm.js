import React ,{ useState } from 'react';
import SerachAuth from "./SerachAuth";
import 'antd/dist/antd.css';


const AddCareerForm = props  => {
    const initialFormState = {
        title : '',
        summary : '',
        authAddr : '',
        start_date : '',
        end_date : '',
        delete_at : ''
    }

    const [ career, setCareer ] = useState(initialFormState)
    const [ error, setError ] = useState({})

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCareer({ ...career, [name]: value });    // merge
    }

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


    const onSubmit = event => {
        event.preventDefault()      // 새로고침 방지
        if (vaildateCareer())  props.addCareer(career);
        else return;
        setCareer(initialFormState)
    }
     // SearchAuth에서 검색된 addr를  받아서 state에 적용
    const setAuthAddress = authAddr => {
        setCareer({...career, authAddr : authAddr});
    }

    return (
            <form className="addCareerForm" onSubmit={onSubmit}>
            <label>경력 제목</label>
            <input type="text" name="title" value={career.title} onChange={handleInputChange} />
            <br/><span style={{ color : 'red'}}>{error["title"]} </span>
            <label>내용 기술</label>
            <textarea name="summary" value={career.summary} onChange={handleInputChange}  />
            <br/><span style={{ color : 'red'}}>{error["summary"]} </span>
            <label>인증처 address</label>
            <SerachAuth
                setAuthAddress = {setAuthAddress}
                // authAddr={career.authAddr}
                key={career.authAddr}
            />
            <br/><span style={{ color : 'red'}}>{error["authAddr"]} </span>
            <label>근무 기간</label>
            <label>시작일</label>
            <input type="date" name="start_date" value={career.start_date} onChange={handleInputChange}  />
            <label>종료일</label>
            <input type="date" name="end_date" value={career.end_date} onChange={handleInputChange}  />
            <button>경력 추가</button>
        </form>
    )
}
export default AddCareerForm;