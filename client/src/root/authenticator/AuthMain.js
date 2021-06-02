
import React, {useState, useEffect} from "react";

import AuthCareerTbl from "./form/AuthCareerTbl";



const AuthMain = props =>{

    const {address, name,token} = sessionStorage;
    let [ careers, setCareers ] = useState([]);


    useEffect( ()=>{ (async function ()  {
        let url = `http://${process.env.REACT_APP_API_HOST}/v1/careers/auth/${address}`;
        try{
            const res = await fetch(url,{
                headers : {
                    'X-AUTH-TOKEN' : token
                }                
            });
            console.log(res);
            const result = [...await res.json()];
            // console.log(result);
            // const verifiedCareer = result.map(career=>{
            //     let code = `${career.id}${career.emp.address}${sessionStorage.getItem("address")}`;
            //     let verified = props.verify(code)
            //     return {...career, verified: verified};
            // })
            setCareers(result);
        }catch(e){
            alert(e.message);
        };
        })();

    },[]);

    


    const callCertify = code => {
        props.certify(code).then(r => console.log(r))
        console.log(code);
    }
        return (
                <div className="authContainer">
                    {/* <h2>{name}님 안녕하세요.</h2>
                    <p> MetamaskAddress ({address})</p>
                    <Logout/> */}
                    <div className="flex-row">
                    <div className="flex-large">
                    <AuthCareerTbl
                        careers={careers}
                        certify={callCertify}
                        verify={props.verify}
                    />
                    </div></div>
                </div>
        );
}

export default AuthMain;