import React from 'react';
import VerifyResult from "./VerifyResult";

const EmpCareerTbl = props => {
    const {address} = sessionStorage;
    const dateToString = data_value => {
        let date = new Date(data_value);
        return date ?  `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}` : '날짜 정보 없음'
    } 

    return (
    <table>
        <thead>
        <tr>
            <th>title</th>
            <th>summary</th> 
            <th>start</th>
            <th>end</th>
            <th>authority</th>
            <th>resultCert</th>
        </tr>
        </thead>
        <tbody>
        { props.careers.length > 0 ? (
            props.careers.map(career => (
                <tr key={career.id}>
                    <td className="title">{career.title}</td>
                    <td className="summary">{career.summary ? career.summary : '요약 정보 없음'}</td>
                    <td className="start_date">{dateToString(career.start_date)}</td>
                    <td className="end_date">{dateToString(career.end_date)}</td>
                    <td className="auth">{career.auth.name}</td>
                    <td className="verified">
                    <VerifyResult
                        career={career}
                        userAddr={address}
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