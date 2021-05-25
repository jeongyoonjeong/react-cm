import React from "react";
// import './join.css';
import JoinForm from './JoinForm'
import {Link} from "react-router-dom";
import SocialLogin from "./SocialLogin";

import "./joinStyle.css";
import "./IconStyle";



const Join = () => {

    return (
        <div className="join">
            <div className="joinItem">
                <h2 className="headline">
                    CareerManagement System
                    <div>
                        with decentralized application.
                    </div>
                </h2>
                <p className="description"> 경력관리시스템 가입 화면입니다. <br/>
                    MetaMask 계정이 필요합니다.</p>
                <JoinForm />
                <SocialLogin />
                <div className="login">
                    <p>이미 계정이 존재하시나요?
                        <Link to="/login">로그인</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Join;