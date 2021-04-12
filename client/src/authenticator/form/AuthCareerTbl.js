import React from 'react';

const AuthCareerTbl = props => {
    console.log(props);
    return (
    <table>
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
                let verified = props.verify(`${career.id}${career.emp.address}${props.user.address}`);
                console.log(verified)
                return (
                    <tr key={career.id}>
                        <td>{career.emp.name}</td>
                        <td>{career.title}</td>
                        <td>{career.summary ? career.summary : '요약 정보 없음'}</td>
                        <td>{career.start_date ? career.start_date : '시작일'}</td>
                        <td>{career.end_date ? career.end_date : '종료일'}</td>
                        <td>{  verified.then() ? '인증완료' : '인증 미완료' }</td>
                        <td>
                            <button
                                onClick={() => props.certify(`${career.id}${career.emp.address}${props.user.address}`)}
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
}

export default AuthCareerTbl;