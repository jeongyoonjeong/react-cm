import React, {useState, useEffect } from 'react';
import SerachAuth from "../AuthsAutoComplete";

const EditCareerForm = props => (
            <form
                onSubmit={event => {
                    event.preventDefault()
                    console.log("submit target : ", {...event.target})
                    // if(vaildateCareer())
                     props.updateCareer();
                }}
            >
                <label>경력 제목</label>
                <input type="text" name="title" value={props.currentCareer.title} onChange={props.handleEditingInputChange} />
                {/* <br/><span style={{ color : 'red'}}>{error["title"]} </span> */}
                <label>내용 기술</label>
                <input type="text" name="summary" value={props.currentCareer.summary} onChange={props.handleEditingInputChange}  />
                {/* <br/><span style={{ color : 'red'}}>{error["summary"]} </span> */}
                <label>인증처 address</label>
                <SerachAuth
                    setAuthAddress = {props.setAuthAddress}
                    authAddr={props.currentCareer.auth.address}
                    key={props.currentCareer.auth.address}
                />
                {/* <br/><span style={{ color : 'red'}}>{error["authAddr"]} </span> */}
                <label>근무 기간</label>
                <label>시작일</label>
                <input type="date" name="start_date" value={props.currentCareer.start_date} onChange={props.handleEditingInputChange}  />
                <label>종료일</label>
                <input type="date" name="end_date" value={props.currentCareer.end_date} onChange={props.handleEditingInputChange}  />
                <button>Update</button>
                <button onClick={() => props.setEditing(false)} className="button muted-button">
                    Cancel
                </button>
            </form>
);


export default EditCareerForm;