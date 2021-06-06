import React, {useState} from "react";
import {Link} from "react-router-dom";
import SocialLogin from "./SocialLogin";
import LoginForm from "./SigninPresenter";

const Login = () => {

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

    const loginUser = () => {
        const url = `http://${process.env.REACT_APP_API_HOST}/signin`;
        const successed = fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: loginState.input.userId,
                userPw: loginState.input.userPw,
            })})
        .then((res)=>res.json())
        .then(data=>{
             const userData = {...data['data'], token : data['token'] }
            for(let prop in userData){
                sessionStorage.setItem(prop,userData[prop]);
            }
            alert('메타마스크 로그인을 진행해주세요.');
            setLoginState({...loginState, loginSuccessed : true });
        })
        .catch((err)=>{
            alert('로그인 실패');
            console.log(err.message);
            setLoginState(initLoginState);
        });

    }

    return (
        <div className="login">
            <div className="loginItem">
                <h2 className="headline">
                    CareerManagement System
                    <div>
                        with decentralized application.
                    </div>
                </h2>
                <p className="description"> 경력관리시스템 로그인 화면입니다. <br/>
                    MetaMask 계정이 필요합니다.</p>
                <LoginForm 
                    loginState={loginState}
                    loginUser={loginUser}
                    handleInputChange={handleInputChange}/>
                <SocialLogin />
                    <p>계정을 생성하시겠습니까?
                        <Link to="/join"> 가입</Link>
                    </p>
            </div>
        </div>
    );
}
export default Login;