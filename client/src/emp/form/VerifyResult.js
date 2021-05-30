import React, {useEffect,useState} from "react";
import loadingGif from '../../Spinner-1.2s-188px.gif'

const VerifyResult = props => {
    const { verify , code } = props;
    const [ result , setResult ] = useState();
    const [ loading , setLoading ] = useState(false);

    useEffect(()=>{
        (async function(){
            try {
                const result = await verify(code);
                setResult(result);
                setLoading(true);
            }catch (e) {
                console.log(e.message);
            }
        })();
    },[])

    return !loading ?
        <img src={loadingGif} alt=""></img> :
            result ? <p>인증 완료</p> : <p>인증 미완료</p>
};
export default VerifyResult;