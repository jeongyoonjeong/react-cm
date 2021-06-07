import React , {useState} from "react";
// import './join.css';
import JoinForm from './SignupPresenter'
import {Link} from "react-router-dom";
import SocialLogin from "../signin/SocialLogin";

import "../SignStyle.css";



const Join = () => {
    const initializeState = {
        user :
            {
                role: '',
                address : '',
                userId : '',
                userPw : '',
                name: '',

            },
        redirect : false
    };

    const [ state, setState ] = useState(initializeState);

    const joinUser = () => {

        fetch(`http://${process.env.REACT_APP_API_HOST}/signup`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address: state.user.address,
                name: state.user.userName,
                userId: state.user.userId,
                userPw: state.user.userPw,
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
                <JoinForm 
                    state={state}
                    joinUser={joinUser}
                    handleInputChange={handleInputChange}
                    handleRoleChange={handleRoleChange}/>
                <SocialLogin />
                    <p>이미 계정이 존재하시나요?
                        <Link to="/login">로그인</Link>
                    </p>
            </div>
        </div>
    );
}
export default Join;