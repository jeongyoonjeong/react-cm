import React, { useState, useEffect, Component } from 'react';

function UserEdit(){
    const [userInfo, setUserInfo] = useState({
        name: null,
        userId: null,
        userPw: null,
        addr: null,
        role: null
    });

    const getUser =  async () => {
        const id = 'dge03129';
        const url = 'http://localhost:8090/user/' + id;
        return  await window.fetch(url)
            .then((response) => response.json())
            .then(response => {
                const data = response.data;
                console.log(data);
                setUserInfo({
                    name: data.name,
                    userId: data.userid,
                    userPw: data.userpw,
                    addr: data.address,
                    role: data.role
                });
            }).catch((err)=>console.log(err));
    };

    useEffect(()=>{
        getUser().then(r => console.log('getUser') );
    },[]);


    const setUser = ()=>{

    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserInfo({
            ...userInfo,      // 기존의 input 객체를 복사한 뒤
            [name]: value   // name 키를 가진 값을 value 로 설정
        });
    }
        return (
            <form>
                <div>
                    Name:
                    <input name="name" value={userInfo.name} onChange={handleChange}/>
                </div>
                <div>
                    ID:
                    <input name="userId" value={userInfo.userId} onChange={handleChange} />
                </div>
                <div>
                    Metamask Address:
                    <input name="addr" value={userInfo.addr} onChange={handleChange} />
                </div>
                <button onClick={setUser}>변경</button>
                <button onClick>취소</button>
            </form>
        )
}

export default UserEdit;