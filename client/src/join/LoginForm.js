import React, {useState} from "react";
import {Redirect} from "react-router";
import {Input, Button} from 'antd';


const LoginForm = () => {

    const initLoginState = {
        input :
            {
                userId : '',
                userPw : ''
            },
        loginSuccessed : false
    };

    const [ loginState, setLoginState ] = useState(initLoginState);
    const [ user, setUser ] = useState();

    const handleInputChange = event => {
        const { name, value } = event.target
        const input = {...(loginState.input), [name] : value }
        setLoginState({ ...loginState, input : input })
    }

    const loginUser = async () => {

        const successed = await fetch('http://localhost:8090/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: loginState.input.userId,
                userpw: loginState.input.userPw,
            })})
        .then((res)=>res.json())
        .then(data=>{
            //JsonString으로 session에 저장 
            sessionStorage.setItem("user",data.data.stringify())    
            alert('메타마스크 로그인을 진행해주세요.');
            setLoginState({...loginState, loginSuccessed : true });
        })
        .catch((err)=>{
            alert('로그인 실패');
            setLoginState(initLoginState);
        });

    }


    return loginState.loginSuccessed ?
        <Redirect
            to={{ pathname: '/authority', state: { user: sessionStorage.user }}} /> :
        (<div>
                    <Input type="text" value={loginState.input.userId} name="userId"
                           placeholder="아이디를 입력하세요"
                           onChange={handleInputChange}/>
                    <Input type="password" value={loginState.input.userPw} name="userPw"
                           placeholder="패스워드 정책 : 영문,숫자 조합 8자리 이상"
                           onChange={handleInputChange}/>
            <Button size="large" className="button" onClick={()=>loginUser()}>로그인</Button>
        </div> )
}
export default LoginForm;