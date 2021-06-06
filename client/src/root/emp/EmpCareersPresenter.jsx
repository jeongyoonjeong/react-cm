import React from 'react';
import VerifyResult from "../../web3/VerifyResultPresenter";
import dateToString from '../common/dateToString';

const EmpCareerTbl = props => {
    const {address} = sessionStorage;

    return (
    <table className="striped-table">
        <thead>
        <tr>
            <th>경력 제목</th>
            <th>경력 기술</th> 
            <th>경력 <br/>시작 일</th>
            <th>경력 <br/>마감 일</th>
            <th>인증처</th>
            <th>인증 <br/>상태</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody className="careerListBody">
        { props.careers.length > 0 ? (
            props.careers.map(career => (
                <tr key={career.id}>
                    <td className="title">{career.title}</td>
                    <td className="summary">{career.summary ? career.summary : '요약 정보 없음'}</td>
                    <td className="start_date">{dateToString(career.start_date)}</td>
                    <td className="end_date">{dateToString(career.end_date)}</td>
                    <td className="auth">{career.auth.name || 'error' }</td>
                    <td className="verified">
                    <VerifyResult
                        code={`${career.id}${address}${career.auth.address}`}
                        verify={props.verify}
                    />
                    </td>
                    <td>
                        <button
                            onClick={() => props.editRow(career)}
                            className="button"
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={()=> props.deleteCareer(career)}
                            className="button"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={5}>No career</td>
            </tr>
        )
    }
    </tbody>
    </table>
);
}

export default EmpCareerTbl;