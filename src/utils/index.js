

const getDate = (dateString)=>{
    const year = dateString.substr(0, 4);
    const month = dateString.substr(4, 2) - 1; // 月份从 0 开始，所以要减去 1
    const day = dateString.substr(6, 2);
    const hour = dateString.substr(8, 2);
    const minute = dateString.substr(10, 2);
    return new Date(year, month, day, hour, minute);
}

const setDate = (dateTimeString)=>{
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    
    return `${year}${month}${day}${hours}${minutes}`;
}

module.exports = {
    getDate,
    setDate
}