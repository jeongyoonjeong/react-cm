import React from 'react';
import EmpMain from './emp/EmpMainContainer';
import AuthMain from './auth/AuthMainContainer';
import Logout from '../sign/signin/SignoutPresenter'

import '../mainStyle/MainStyle.css';


const Main = props => {
    let {name, address} = sessionStorage;


    return(
        <div className="main">
            <div className="container">
                <div className="header">
                <Logout/>
                <h2 className="userHeader">{name}님 안녕하세요.</h2>
                <p className="metamaskHeader"> <b>🦊 METAMASK ADDRESS 🦊</b><br/>{address}</p>
                </div>
            {sessionStorage.getItem("role") === "ROLE_EMP" ?
                    <EmpMain
                        web3={props.web3}
                        verify={props.verify}
                        register={props.register}
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
