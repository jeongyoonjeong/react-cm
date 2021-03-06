
import React from 'react';
import VerifyResult from '../../web3/VerifyResultPresenter';
import dateToString from '../common/dateToString';

const AuthCareerTbl = props =>
(
    <table className="striped-table">
        <thead>
        <tr>
            <th>employee name</th>
            <th>title</th>
            <th>summary</th>
            <th>start date</th>
            <th>end date</th>
            <th>certification</th>
            <th> </th>
        </tr>
        </thead>
        <tbody>
        { props.careers ? (
            props.careers.map(career => {
                return (
                    <tr key={career.id}>
                        <td  onClick={()=>props.handleEmpModal(career.emp)}>{career.emp.name}</td>
                        <td>{career.title}</td>
                        <td>{career.summary ? career.summary : '요약 정보 없음'}</td>
                        <td>{career.start_date ? dateToString(career.start_date) : '시작일'}</td>
                        <td>{career.end_date ? dateToString(career.end_date) : '종료일'}</td>
                        <td>
                        <VerifyResult 
                            code={`${career.id}${career.emp.address}${career.auth.address}`}
                            verify={props.verify}
                        />
                        </td>
                        <td>
                            <button
                                onClick={() => props.certify(`${career.id}${career.emp.address}${sessionStorage.getItem("address")}`)}
                                className="button muted-button"
                            >
                                인증
                            </button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan={7}>No career</td>
            </tr>
        )
    }
    </tbody>
    </table>
);


export default AuthCareerTbl;