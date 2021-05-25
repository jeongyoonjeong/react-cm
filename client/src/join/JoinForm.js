import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

const JoinForm = () => {
    const initializeState = {
        user :
            {
                role: '',
                address : '',
                userId : '',
                userPw : '',
                userName: '',

            },
        redirect : false
    };

    const [ state, setState ] = useState(initializeState);

    const joinUser = () => {

        fetch('http://localhost:8090/join',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: state.user.userName,
                userid: state.user.userId,
                userpw: state.user.userPw,
                address: state.user.address,
                role: state.user.role
            })
        }).then((res)=>{
            alert('가입 성공');
            setState({...state, redirect: true});
        }).catch((err)=>{
            alert('가입 실패');
            setState({...state, redirect: false});
        });

        setState(initializeState);
    }
    const handleRoleChange = event =>{
        const { value } = event.target;
        const input = {...state.user, role : value }
        setState({...state, user : input })
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        const input = {...(state.user), [name] : value }
        setState({ ...state, user : input })
    }


    return state.redirect ? <Redirect to='/login'/> : (
    <div>
        <div className="input-field">
            <label className="input-box" htmlFor="role">
                <select name="role" onChange={handleRoleChange}>
                    <option value="">계정 종류</option>                
                    <option value="ROLE_EMP">근로자</option>
                    <option value="ROLE_AUTH">기업/기관/사업자</option>
                </select>
            </label>
            
            <label className="input-box" htmlFor="address">
                <input type="text" value={state.user.address} name="address"
                       placeholder="metamask address를 입력하세용"
                       autoComplete="off"
                       onChange={handleInputChange}/>
            </label>
            <label className="input-box" htmlFor="userId">
                <input type="text" value={state.user.userId} name="userId"
                       placeholder="사용하실 아이디를 입력하세용"
                       onChange={handleInputChange}/>
            </label>
            {/*todo. 아이디 중복 체크 구현*/}
            <label className="input-box" htmlFor="userPw">
                <input type="password" value={state.user.userPw} name="userPw"
                       placeholder="비밀번호 생성 규칙 : 영문,숫자 조합 8자리 이상"
                       onChange={handleInputChange}/>
            </label>
            {/*todo. adobe 패스워드 정책 체크 구현*/}
            <label className="input-box" htmlFor="name">
                <input type="text" value={state.user.userName} name="userName"
                       placeholder="이름이 뭐예용"
                       autoComplete="off"
                       onChange={handleInputChange}/>
            </label>
        </div>
        <label className="label" name="term-of-use">
            <input type="checkbox" name="term-of-use" id="term-of-use" />
            <span className="checkmark"></span>
            약관을 동의하고 개인정보를 수집 ... <Link to="#">개인정보처리지침</Link>
        </label>
        <button className="button" onClick={()=>joinUser()}>가 입</button>
    </div>
)
}
export default JoinForm;