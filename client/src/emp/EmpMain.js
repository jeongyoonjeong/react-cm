import React, { useState, useEffect, Fragment } from 'react'

import AddCareerForm from './form/AddCareerForm'
import EditCareerForm from './form/EditCareerForm'
import EmpCareerTbl from './form/EmpCareerTbl'

import './career.css'


const EmpMain = props => {

    const initCareer = {
        id: null,
        title: '',
        authority: '',
        summary: '',
        resultCert: false
    };

    // Setting state
    let [ careers, setCareers ] = useState([]);
    let [ currentCareer, setCurrentCareer ] = useState(initCareer)
    let [ editing, setEditing ] = useState(false)


    useEffect(()=>{
        (async function getCareers(){
            const url = 'http://localhost:8090/v1/careers/emp/' + props.user.address + '/auth';
            const res = await fetch(url);
            try{
                const data = await res.json();
                setCareers(data);
            }catch(e){
                console.log(e.message)
            }
        })();
    },[])

    const nextCarId = () => Math.max(...careers.map(career=>career.id)) + 1;

    // 경력추가 Event
    // web3 통신
    // db 통신
     const addCareer =  async newCareer => {
            const code = `${nextCarId()}${props.user.address}${newCareer.authAddr}`;
            const web3Result = await props.register(code);
            const dbResult =  await dbAddCareer(newCareer);
            console.log(dbResult)
            setCareers([...careers,dbResult]);

    }

    const dbAddCareer = async newCareer => {
        const url = `http://localhost:8090/v1/career/emp/${props.user.address}`;
        return await fetch(url,{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
           body : JSON.stringify({
                id : careers.length+1,
                title : newCareer.title,
                summary : newCareer.summary,
                start_date : newCareer.start_date,
                end_date : newCareer.end_date,
                auth : {
                    address : newCareer.authAddr
                },
                emp : {
                    address : props.user.address
                },
                regist_date : Date.now()
            })
        }).then(res=>res.json());
    }

    const deleteCareer = career => {
        setEditing(false)
        const url = `http://localhost:8090/v1/career/${career.id}/emp/${career.emp.address}/auth/${career.auth.address}`
        window.fetch(url,{
            method : 'DELETE'
        }).then(_=> setCareers(careers.filter(c=>c.id !== career.id))
        ).catch(_=>alert("delete failed"))

    }

    const updateCareer = (updatedCareer)  => {
        setEditing(false)
            //
            // const code = `${nextCarId()}${props.user.address}${newCareer.authAddr}`;
            // console.log(code);
            // const web3Result = await props.register(code);
            // const dbResult =  await dbAddCareer(newCareer);
            //
            // console.log(web3Result);
            // console.log(dbResult);
    }


    function editRow(career) {

        setEditing(true)

        setCurrentCareer({
            id: career.id,
            title: career.title,
            summary: career.summary,
            authority: career.authority,
            resultCert: career.resultCert
        });
    }

    return (

        <div className="container">
            <h2>{props.user.name}님 안녕하세요.</h2>
            <p> MetamaskAddress ({props.user.address})</p>
            <div className="flex-row">
                <div className="flex-large">
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
                <div className="flex-large">
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