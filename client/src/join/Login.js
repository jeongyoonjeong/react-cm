import React from "react";
import {Link} from "react-router-dom";
import SocialLogin from "./SocialLogin";
import LoginForm from "./LoginForm";

const Login = () => {

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
                <LoginForm />
                <SocialLogin />
                    <p>계정을 생성하시겠습니까?
                        <Link to="/join"> 가입</Link>
                    </p>
            </div>
        </div>
    );
}
export default Login;