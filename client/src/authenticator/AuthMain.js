import { Progress } from "antd";
import React, {useState, useEffect} from "react";

import Authority from "../web3/authority";
import AuthCareerTbl from "./form/AuthCareerTbl";

const AuthMain = props =>{
    // todo. 백엔드 springboot security하고 props로 전환

    let [ careers, setCareers ] = useState([]);

    useEffect( ()=>{ (async function ()  {
        let url = `http://${process.env.REACT_APP_API_HOST}/v1/careers/auth/${props.user.address}/emp`;
        try{
            const res = await fetch(url);
            setCareers(await res.json())

        }catch(e){
            alert(e.message);
        };
    })();
    },[]);


    const callCertify = code => {
        props.certify(code).then(r => console.log(r))
        console.log(code);
    }

    const callVerify = code => {
        return props.verify(code);
    }

        return (
            <div>
                <h2>{props.user.name}님 안녕하세요.</h2>
                <p> MetamaskAddress ({props.user.address})</p>
                <div className="flex-row">
                <div className="flex-large">
                <AuthCareerTbl
                    careers={careers}
                    verify={callVerify}
                    certify={callCertify}
                    user={props.user}
                />
                </div>
                </div>
            </div>
        );
}

export default AuthMain;