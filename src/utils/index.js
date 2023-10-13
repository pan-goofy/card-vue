

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

const getMsg = (status)=>{
    const msg={
        0:"操作成功",                 
        1:"读写错误/数据错误",
        2:"卡已损坏",
        3:"无卡",
        4:"串口错误",
        5:"卡被更换",
        6:"不是新卡",
        7:"卡是新卡",
        8:"非本系统卡",
        9:"不是客人卡",
        10:"不是会员卡",
        11:"密码错误",
        12:"无开门记录",
        13:"卡型不正确",
        14:"参数错误",
        15:"用户取消操作(按下<ESC>键)",
        16:"等待超时",
        17:"插卡错误",
        18:"卡是空白卡或插卡错误",
        19:"保留",
        20:"没有调用Init函数",
        21:"不支持该版本的门锁软件",
        22:"连接(门锁系统数据库)错误",
        23:"门锁系统参数不存在",
        24:"初始化失败",
        25:"没有客人在住/指定客人不存在",
        26:"客房已满",
        27:"没有此卡记录",
        28:"没有调用SetPort函数",
        29:"无效的客房房号",
        30:"错误的时间范围",
        31:"卡号已存在，无法登记（Lock9200）",
        32:"不支持调用",
        33:"无效的授权码，授权码错误或过期",
        60:"软件版本错误",
        81:"通讯错误",
        82:"通讯超时",
        84:"卡上无指纹",
        90:"每间房仅支持一枚指纹",
        91:"每间房仅支持三枚指纹",
        93:"持卡人的指纹还可以开门，请使用注销卡注销",
        94:"请先用E70软件采集指纹"
    }
    return msg[status]
}

module.exports = {
    getDate,
    setDate,
    getMsg
}