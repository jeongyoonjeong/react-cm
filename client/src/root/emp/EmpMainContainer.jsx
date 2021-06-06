import React, { useState, useEffect, Fragment } from 'react'

import AddCareerForm from './register/AddCareerForm'
import EditCareerForm from './edit/EditCareerPresenter'
import EmpCareerTbl from './EmpCareersPresenter'
import Receipt from '../../web3/ModalReceiptPresenter'

const EmpMain = props => {

    const {address, name,token} = sessionStorage;

    //career table state
    let [ careers, setCareers ] = useState([]);
    
    //career edit form state
    let [ currentCareer, setCurrentCareer ] = useState()
    let [ editing, setEditing ] = useState(false)

    //receipt form state
    let [ receiptState, setReceiptState ] = useState(false);
    let [ receipt, setReceipt ] = useState({});



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
    
    
    // 경력 추가 
    // web3 통신
    // db Server 통신
     const addCareer =  async newCareer => {
            const nextId = await nextCarId();
            const code = `${nextId}${address}${newCareer.authAddr}`;
            console.log(nextId)
           
            const web3Result = await props.register(code);

            const url = `http://${process.env.REACT_APP_API_HOST}/v1/career`;
            const res =  await fetch(url,{
                method : 'POST',
                headers : {
                    'X-AUTH-TOKEN' : token,
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify({
                    id : nextId,
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
            });

            const result = await res.json();
            if(web3Result){
                setReceipt(web3Result);    
                setReceiptState(true);
            }
            if(result)  setCareers([...careers,result]);
    }


    const deleteCareer = career => {
        setEditing(false)
        const url = `http://${process.env.REACT_APP_API_HOST}/v1/career/${career.id}/emp/${career.emp.address}/auth/${career.auth.address}`
        window.fetch(url,{
            method : 'DELETE',
            headers: {
                'X-AUTH-TOKEN' : token,
            }
        }).then(_=>{     
                alert("😊 경력 삭제 완료")
                setCareers(careers.filter(c=>c.id !== career.id))
        }).catch(_=>alert("😥 경력 삭제 실패"))

    }

    const updateCareer = async () => {   
        const url = `http://${process.env.REACT_APP_API_HOST}/v1/career`;
        
        try{
            const res = await window.fetch(url,{
                method : 'PATCH',
                headers : {
                    'X-AUTH-TOKEN' : token,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    id : currentCareer.id,
                    title : currentCareer.title,
                    summary : currentCareer.summary,
                    start_date : currentCareer.start_date,
                    end_date : currentCareer.end_date,
                    deleteAt : currentCareer.deleteAt,  
                    emp : currentCareer.emp,
                    auth : currentCareer.auth
                })
            });
            const result = await res.json();           
            
            alert("😊 경력 수정 완료")
            setCareers(careers.map(career=>career.id===result.id ? result : career));
            setEditing(false);     

        }catch(err){
            alert("😥 경력 수정 실패")
        }
    }


    /* edit 함수 끌어올리기 */
    const setAuthAddress = authAddr => {
        setCurrentCareer({...currentCareer, authAddr : authAddr })
    }

    const handleEditingInputChange = event => {
            const { name, value } = event.target
            setCurrentCareer({...currentCareer, [name]: value })
        }

    const editRow = career => {
        setEditing(true)
        setCurrentCareer(career);
    }

    const handleReceiptModal = e => {
        //modal render 중지
        setReceiptState(false);
    }

    //todo. css 나누기
    return (
                <div className="empContainer">
                    {/* todo. css관련 클래스 수정하기, 경력정보 overflow 수정 */}
                {receiptState && (<Receipt receipt={receipt} handleReceiptModal={handleReceiptModal}/>)}
                <div className="flex-row">
                    <div className="flex-large one-thirds">
                        {editing ? (
                            <Fragment>
                                <h2>경력 수정</h2>
                                <EditCareerForm
                                    editing={editing}
                                    setEditing={setEditing}
                                    currentCareer={currentCareer}
                                    handleEditingInputChange={handleEditingInputChange}
                                    setAuthAddress={setAuthAddress}
                                    updateCareer={updateCareer}
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <h2>경력 추가</h2>
                                <AddCareerForm addCareer={addCareer} />
                            </Fragment>
                        )}
                    </div>
                    <div className="flex-large two-thirds">
                        <h2>등록된 경력 정보</h2>
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