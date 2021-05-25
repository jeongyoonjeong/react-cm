import React, {useEffect, useState} from 'react';
import { AutoComplete } from 'antd';
const { Option } = AutoComplete;

const SearchAuth = props => {
    //all auth
    const [auths, setAuths]  = useState([]);

    //input과 매칭되는 auth 결과
    const [matched, setMatched] = useState([]);

    useEffect( ()=>{
        (async function getAuths(){
            try {
                const url = 'http://localhost:8090/v1/auth/all'
                const res = await fetch(url);
                const data = await res.json();
                setAuths(data);
            } catch (e) {
                alert("인증처 정보를 불러올 수 없습니다")
            }
        })(); } ,[]);


    const onSearch = (searchText) => {
        setMatched(
            !searchText ? [] : auths.filter(auth=>{
                let matcher = new RegExp(searchText,'g');
                return  auth.name.match(matcher);
            }) ,
        );
    };

    return (
        <AutoComplete
            style={{
                width: 500
            }}
            onSearch={onSearch}
            onSelect={props.setAuthAddress}
            placeholder={  props.authAddr ? props.authAddr : "인증처명을 검색하세요"} 
            >
            {matched.map(auth => (
                <Option key={auth.address} value={auth.address}>
                    {auth.name}&nbsp;&nbsp;&nbsp;<b>{auth.address}</b>
                </Option>
            ))}
        </AutoComplete>
    );
};
export default SearchAuth;