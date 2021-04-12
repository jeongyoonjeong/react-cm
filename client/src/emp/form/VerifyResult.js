import React, {useEffect,useState} from "react";
import loadingGif from '../../Spinner-1.2s-188px.gif'

const VerifyResult = props => {
    const [ result , setResult ] = useState();
    const [ loading , setLoading ] = useState(false);

    useEffect(()=>{
        callVerify(props)
    },[])


    const callVerify =  async props => {
            const code = `${props.career.id}${props.userAddr}${props.career.auth.address}`;
            try {
                const result = await props.verify(code);
                console.log(result)
                setResult(result);
                setLoading(true);
            }catch (e) {
                console.log(e.message);
            }
    }

    return !loading ?
        <img src={loadingGif} alt=""></img> :
            result ? <p>인증 완료</p> : <p>인증 미완료</p>
};
export default VerifyResult;