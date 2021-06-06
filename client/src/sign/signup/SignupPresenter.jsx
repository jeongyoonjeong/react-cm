import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

const JoinForm = props => {
  

    return props.state.redirect ? <Redirect to='/login'/> : (
    <div>
        <div className="input-field">
            <label className="input-box" htmlFor="role">
                <select name="role" onChange={props.handleRoleChange}>
                    <option value="">계정 종류</option>                
                    <option value="ROLE_EMP">근로자</option>
                    <option value="ROLE_AUTH">기업/기관/사업자</option>
                </select>
            </label>
            
            <label className="input-box" htmlFor="address">
                <input type="text" value={props.state.user.address} name="address"
                       placeholder="metamask address를 입력하세용"
                       autoComplete="off"
                       onChange={props.handleInputChange}/>
            </label>
            <label className="input-box" htmlFor="userId">
                <input type="text" value={props.state.user.userId} name="userId"
                       placeholder="사용하실 아이디를 입력하세용"
                       onChange={props.handleInputChange}/>
            </label>
            {/*todo. 아이디 중복 체크 구현*/}
            <label className="input-box" htmlFor="userPw">
                <input type="password" value={props.state.user.userPw} name="userPw"
                       placeholder="비밀번호 생성 규칙 : 영문,숫자 조합 8자리 이상"
                       onChange={props.handleInputChange}/>
            </label>
            {/*todo. adobe 패스워드 정책 체크 구현*/}
            <label className="input-box" htmlFor="name">
                <input type="text" value={props.state.user.userName} name="userName"
                       placeholder="이름이 뭐예용"
                       autoComplete="off"
                       onChange={props.handleInputChange}/>
            </label>
        </div>
        <button className="button" onClick={()=>props.joinUser()}>가 입</button>
    </div>
)
}
export default JoinForm;