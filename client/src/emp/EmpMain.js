import React, { useState, useEffect, Fragment } from 'react'

import AddCareerForm from './form/AddCareerForm'
import EditCareerForm from './form/EditCareerForm'
import EmpCareerTbl from './form/EmpCareerTbl'
import Receipt from '../web3/ReceiptModal'
import Logout from '../join/Logout';
import './emp.css';

// import './career.css'


const EmpMain = props => {

    const {address, name,token} = sessionStorage;
    // Setting state
    let [ careers, setCareers ] = useState([]);
    let [ currentCareer, setCurrentCareer ] = useState()
    let [ editing, setEditing ] = useState(false)


    useEffect(()=>{
        (async function getCareers(){
            const url = `http://${process.env.REACT_APP_API_HOST}/v1/careers/emp/${address}`;
            const res = await fetch(url, { headers : { 'X-AUTH-TOKEN' : token }});
            try{
                const data = await res.json();
                setCareers(data);
            }catch(e){
                console.log(e.message)
            }
        })();
    },[])

    // const nextCarId = () => Math.max(...careers.map(career=>career.id)) + 1;
    const nextCarId = () => {
        let nextId = fetch(`http://${process.env.REACT_APP_API_HOST}/v1/career/nextId`
        , { headers : { 'X-AUTH-TOKEN' : token }})
        .then(res=>res.json()).then();
        console.log(nextId);
        return nextId;
    }
    
    
    // 경력추가 Event
    // web3 통신
    // db 통신
     const addCareer =  async newCareer => {
            const code = `${nextCarId()}${address}${newCareer.authAddr}`;
            const web3Result = await props.register(code);
            const dbResult =  await dbAddCareer(newCareer);
            
            
            console.log(dbResult)
            setCareers([...careers,dbResult]);
    }

    const dbAddCareer = async newCareer => {
        const url = `http://${process.env.REACT_APP_API_HOST}/v1/career`;
        return await fetch(url,{
            method : 'POST',
            headers : {
                'X-AUTH-TOKEN' : token,
                'Content-Type' : "application/json"
            },
           body : JSON.stringify({
                id : careers.length+1,
                title : newCareer.title,
                summary : newCareer.summary,
                start_date : newCareer.start_date,
                end_date : newCareer.end_date,
                auth : {
                    address: newCareer.authAddr
                },
                emp : {
                    address : address
                },
                regist_date : Date.now()
            })
        }).then(res=>res.json());
    }

    const dbUpdateCareer = async career =>  {
        const url = `http://${process.env.REACT_APP_API_HOST}/v1/career/${career.id}`;
        const res = await window.fetch(url,{
            method : 'PATCH',
            headers : {
                'X-AUTH-TOKEN' : token,
                'Content-Type' : 'application/json'
            },
            body : career
        });
        const data = await res.json();
        return data;
    }

    const deleteCareer = career => {
        setEditing(false)
        const url = `http://${process.env.REACT_APP_API_HOST}/v1/career/${career.id}/emp/${career.emp.address}/auth/${career.auth.address}`
        window.fetch(url,{
            'X-AUTH-TOKEN' : token,
            method : 'DELETE'
        }).then(_=> setCareers(careers.filter(c=>c.id !== career.id))
        ).catch(_=>alert("delete failed"))

    }

    const updateCareer = career => {
         
        const code = `${career.id}${address}${career.authAddr}`;
        const dbResult = dbUpdateCareer(career);
            
        console.log(dbResult);
        setCareers([...careers,dbResult]);
        setEditing(false);     
    }


    function editRow(career) {
        setEditing(true)
        setCurrentCareer(career);
    }

    return (

        <div className="container">
            <div className="header">
            <h2>{name}님 안녕하세요.</h2>
            <p> MetamaskAddress ({address})</p>
            <Logout/>
            </div>
            <div className="flex-row">
                <div className="flex-large one-thirds">
                    {editing ? (
                        <Fragment>
                            <h2>Editing Career</h2>
                            <EditCareerForm
                                editing={editing}
                                setEditing={setEditing}
                                currentCareer={currentCareer}
                                updateCareer={updateCareer}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Add Career</h2>
                            <AddCareerForm addCareer={addCareer} />
                        </Fragment>
                    )}
                </div>
                <div className="flex-large two-thirds">
                    <h2>View career</h2>
                    <EmpCareerTbl
                        careers={careers}
                        editRow={editRow}
                        deleteCareer={deleteCareer}
                        verify={props.verify}
                        user={props.user}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmpMain;