import React, {useState, userRef} from "react";
import {Redirect} from "react-router";
import {Input, Button} from 'antd';


const LoginForm = props => {
    
    return props.loginState.loginSuccessed ?
        <Redirect
            to={{ pathname: '/authority' }} /> :
        (<div>
                    <Input type="text" value={props.loginState.input.userId} name="userId"
                           placeholder="아이디를 입력하세요"
                           onChange={props.handleInputChange}/>
                    <Input type="password" value={props.loginState.input.userPw} name="userPw"
                           placeholder="패스워드 정책 : 영문,숫자 조합 8자리 이상"
                           onChange={props.handleInputChange}/>
            <Button size="large" className="button" onClick={()=>props.loginUser()}>로그인</Button>
        </div> )
}
export default LoginForm;