import React, { useState } from 'react';
import {Redirect} from "react-router";

const Logout = () => {

    const [logout, setLoggout] = useState(false);
    

    const onClick = event => {
        sessionStorage.clear();
        setLoggout(true); 
    }
//todo. session 만료 시간 컴포넌트 만들기

    return logout ? 
        <Redirect to={'/login'} /> :
             (<button className="logout"  onClick={onClick}>logout</button>)
}

export default Logout;