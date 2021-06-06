const dateToString = data_value => {
        let date = new Date(data_value);
        return date ?  `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}` : '날짜 정보 없음'
    }
export default  dateToString;