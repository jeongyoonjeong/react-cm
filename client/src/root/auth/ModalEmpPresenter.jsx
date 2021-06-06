import React from 'react';
import dateToString from '../common/dateToString'
// import './main.css';

const EmpInfoModal = props => (
        <div className="empInfo-dimmer">
            <div className="empInfo-container">
                <div className="empInfo-contents">
                    <h2>근로자 정보</h2>
                    <label>계정 주소: </label>
                    <div className="address">{props.emp.address}</div>
                    <label>이름 : </label>
                    <div className="name">{props.emp.name}</div>
                    <label>생년월일 : </label>
                    <div className="birth">{dateToString(props.emp.birth)|| '생일 정보 없음'} </div>
                    <label>Email : </label>
                    <div className="email">{props.emp.email}</div>
                </div>
                <button className="empInfoButton" 
                        onClick={()=>props.handleEmpModal()}>확인</button>
                </div>
        </div>
);

export default EmpInfoModal;