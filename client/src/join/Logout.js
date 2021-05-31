import React, { useState } from 'react';
import {Redirect} from "react-router";

const Logout = () => {

    const [logout, setLoggout] = useState(false);
    
    const onClick = event => {
        sessionStorage.clear();
        setLoggout(true); 
    }

    return logout ? 
        <Redirect to={'/login'} /> :
             (<button class="logout" onClick={onClick}>logout</button>)
}

export default Logout;