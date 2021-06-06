
import React, {useState, useEffect} from "react";
import ReceiptModal from "../../web3/ModalReceiptPresenter";
import EmpInfoModal from "./ModalEmpPresenter";
import AuthCareerTbl from "./AuthMainPresenter";



const AuthMain = props =>{

    const {address, token} = sessionStorage;
    
    let [ careers, setCareers ] = useState([]);
    
    //receipt form state
    let [ receiptState, setReceiptState ] = useState(false);
    let [ receipt, setReceipt ] = useState({});

    let [ empInfoState, setEmpInfoState ] = useState(false);
    let [ empInfo, setEmpInfo ]  = useState();

    useEffect( ()=>{ (async function ()  {
        let url = `http://${process.env.REACT_APP_API_HOST}/v1/careers/auth/${address}`;
        try{
            const res = await fetch(url,{
                headers : {
                    'X-AUTH-TOKEN' : token
                }                
            });
            const result = await res.json();
            setCareers(result);
        }catch(e){
            alert(e.message);
        };
        })();
    },[]);

    const forceUpdate = React.useReducer(() => ({}))[1]
    
    const callCertify = async code => {
        const receipt = await props.certify(code);
        setReceipt(receipt);
        setReceiptState(true);
        forceUpdate();                  //career table re-rendering
    }

    const handleEmpModal = emp => {
        if(!emp){
            setEmpInfo(null);
            setEmpInfoState(false);
         }else{
            setEmpInfo(emp);
            setEmpInfoState(true); 
        } 
    }
    

    const handleReceiptModal = _ => {
        setReceiptState(false);
    }
    
    return (
                <div className="authContainer">
                    {receiptState && <ReceiptModal receipt={receipt} handleReceiptModal={handleReceiptModal}/>}
                    {empInfoState && <EmpInfoModal emp={empInfo} handleEmpModal={handleEmpModal}/>}
                    <div className="flex-row">
                    <div className="flex-large">
                    <AuthCareerTbl
                        careers={careers}
                        handleEmpModal={handleEmpModal}
                        certify={callCertify}
                        verify={props.verify}
                    />
                    </div></div>
                </div>
        );
}

export default AuthMain;