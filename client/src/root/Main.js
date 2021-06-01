import React from 'react';
import EmpMain from './emp/EmpMain';
import AuthMain from './authenticator/AuthMain';
import Logout from '../join/Logout'

import './main.css';


const Main = props => {
    let {name, address} = sessionStorage;


    return(
        <div className="main">
            <div className="container">
                <div className="header">
                <h2>{name}님 안녕하세요.</h2>
                <p> 🦊 Metamask Address <b>{address}</b> 🦊</p>
                <Logout/>
                </div>
            {sessionStorage.getItem("role") === "ROLE_EMP" ?
                    <EmpMain
                        web3={props.web3}
                        verify={props.verify}
                        register={props.registerCareer}
                    /> :
                ( sessionStorage.getItem("role") === "ROLE_AUTH" ?
                        <AuthMain
                            web3={props.web3}
                            verify={props.verify}
                            certify={props.certify}
                        />
                    : <div> common user page </div>)
            }
            </div>
        </div>
    )
}

export default Main;
