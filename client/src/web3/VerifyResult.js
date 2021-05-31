import React, {useEffect,useState} from "react";
import loadingGif from '../resources/ajax-loader.gif'

const VerifyResult = props => {
    const { verify , code } = props;
    const [ result , setResult ] = useState();
    const [ loading , setLoading ] = useState(false);


    const imgStyle = {
        'width' :'70px' 
    }


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

    return (<div className="verified"> {!loading ?
                    <img style={imgStyle} src={loadingGif} ></img> 
                            : result ? (<span>인증<br/> 완료</span>) : (<span>인증<br/>미완료</span>) }</div>)
};
export default VerifyResult;