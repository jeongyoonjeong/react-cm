import React from 'react';
import VerifyResult from "./VerifyResult";

const EmpCareerTbl = props => {
    console.log(props.careers ? props.careers.length : 0);
    return (
    <table>
        <thead>
        <tr>
            <th>title</th>
            <th>summary</th>
            <th>authority</th>
            <th>resultCert</th>
        </tr>
        </thead>
        <tbody>
        { props.careers.length > 0 ? (
            props.careers.map(career => (
                <tr key={career.id}>
                    <td>{career.title}</td>
                    <td>{career.summary ? career.summary : '요약 정보 없음'}</td>
                    <td>{career.authority}</td>
                    <td>
                    <VerifyResult
                        career={career}
                        userAddr={props.user.addr}
                        verify={props.verify}
                    />
                    </td>
                    <td>
                        <button
                            onClick={() => props.editRow(career)}
                            className="button muted-button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={()=> props.deleteCareer(career)}
                            className="button muted-button"
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