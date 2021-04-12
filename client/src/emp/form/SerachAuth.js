// import React , {useState,useEffect} from 'react';
// import { Input, AutoComplete } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// //
// const renderTitle = (title) => (
//     <span>
//     {title}
//         <a
//             style={{
//                 float: 'right',
//             }}
//             href="https://www.google.com/search?q=antd"
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//       more
//     </a>
//   </span>
// );
//
// const renderItem = (title, count) => ({
//     value: title,
//     label: (
//         <div
//             style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//             }}
//         >
//             {title}
//             <span>
//         <UserOutlined /> {count}
//       </span>
//         </div>
//     ),
// });
//
// // const options = [
// //     {
// //         label: renderTitle('Libraries'),
// //         options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
// //     },
// //     {
// //         label: renderTitle('Solutions'),
// //         options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
// //     },
// //     {
// //         label: renderTitle('Articles'),
// //         options: [renderItem('AntDesign design language', 100000)],
// //     },
// // ];
//
// const SearchAuth = () => {
//     const [options,setOptions] = useState([]);
//
//     useEffect( ()=>{ getAllAuth().then() } ,[]);
//
//     const getAllAuth = async () => {
//         try {
//             const url = 'http://localhost:8090/v1/auth/all'
//             const res = await fetch(url);
//             const data = await res.json();
//             console.log(data);
//             setOptions(data);
//         } catch (e) {
//             alert("인증처 정보를 불러올 수 없습니다")
//         }
//     }
//
//     return (
//     <AutoComplete
//         dropdownClassName="certain-category-search-dropdown"
//         dropdownMatchSelectWidth={500}
//         style={{
//             width: 250,
//         }}
//         options={options}
//     >
//         <Input.Search size="large" placeholder="input here" />
//     </AutoComplete>
// )};
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
            placeholder="인증처명을 검색하세요"
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