// import { ContactlessOutlined } from '@material-ui/icons'
import dateformat from 'dateformat'

/**
 * check data type and isNull
 * @returns  boolean
 */
export const IsValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
}

/**
 * @description hiển thị ngày giờ trên giao diện với format (dd/mm/yyyy HH:MM:ss)
 * @param (*) DateTimeStr 
 * @returns (*) DateTimeStr
 * @example displayDateTime('2021-01-22T15:12:30.375') => '22/01/2021 15:12:30'
 */
export const DisplayDateTime = (dateTimeStr, isOnlyDate = false) => {

    if (isNaN(Date.parse(dateTimeStr))) {
        return "-"
    } else {
        return isOnlyDate ? dateformat(new Date(dateTimeStr), "dd/mm/yyyy") : dateformat(new Date(dateTimeStr), "dd/mm/yyyy HH:MM")
    }
}
/**
 * @description Custom ngày giờ gửi đến API Format: yyyy-mm-dd HH:MM:ss
 * @param (*) DateTime
 * @returns (*) DateTimeStr
 * @example sendDateTime(22/01/2021 15:12:30) => '2021-01-22T15:12:30'
 */
const SendDateTime = dateTime => {
    return dateTime.toUTCString()
}
/**
 * 
 * @param {*} dateTime 
 * @returns (*) DateTimeStr (type = 1 -> "yyyy-mm-dd HH:MM:ss" type = 2 -> "yyyy-mm-ddTHH:MM:ss"/ )
 */
const ConvertDatetimeToString = (type, dateTime, format) => {
    switch (type) {
        case 1:
            return dateformat(dateTime, "dd/mm/yyyy HH:MM:ss")
        case 2:
            return dateformat(dateTime, "dd/mm/yyyyTHH:MM:ss")
        case 3:
            return dateformat(dateTime, "dd/mm/yyyy")
        case 4:
            return dateformat(dateTime, "mm/dd/yyyy HH:MM:ss")
        case 5:
            return dateformat(dateTime, "mm/dd/yyyy HH:MM:00")
        case 6:
            return dateformat(dateTime, "mm/dd/yyyy HH:MM:59")
        case 7:
            return dateformat(dateTime, "isoDateTime")
        case 8:
            return dateformat(dateTime, "yyyy-mm-dd 00:00").replace(/\s/g, 'T')
        case 9:
            return dateformat(dateTime, "yyyy-mm-dd HH:MM:ss").replace(/\s/g, 'T')
        case 10:
            return dateformat(dateTime, format ? format : "dd/mm/yyyy HH:MM:ss")
        default:
            return '-'
    }

}
/**
 * @description convert display datetime format to api datetime format
 * @param (*) DateTimeStr
 * @returns (*) DateTimeStr
 * @example ConvertToSendApiFormat('22/01/2021 15:12:30') => '2021-01-22T15:12:30'
 */
const ConvertToSendApiFormat = dateTimeStr => {
    let dateTimeArr = dateTimeStr.split(' ')
    let dateArr = dateTimeArr[0].split('/')
    let timeArr = dateTimeArr[1]
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${timeArr}`
}
/**
 * @description lấy chuoix dateime không dấu 
 * @returns string
 */
const GetDatetimeStr = () => {
    let date = new Date()
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getTime()}${date.getMinutes()}${date.getSeconds()}`
}

export const DisplayDate = dateTimeStr => {

    if (isNaN(Date.parse(dateTimeStr))) {
        return "-"
    } else {
        return dateformat(new Date(dateTimeStr), "dd/mm/yyyy")
    }
}

export const DisplayTime = dateTimeStr => {

    if (isNaN(Date.parse(dateTimeStr))) {
        return "-"
    } else {
        return dateformat(new Date(dateTimeStr), "HH:MM")
    }
}

export const ConvertStringToDatetime = dateTimeStr => {
    let darr = dateTimeStr.split("/");
    return new Date(parseInt(darr[2]), parseInt(darr[1]) - 1, parseInt(darr[0]));
}

export const AddDuration = (dateTimeStr, duration) => {
    let date = new Date(dateTimeStr)
    duration = Math.ceil(duration / 60) * 60

    let newDate = dateformat(new Date(date.getTime() + (duration * 1000)), "isoDateTime")
    return newDate.replace("+0700", "")
}

export const CompareTwoDate = (a, b) => {
    let d1 = new Date(a)
    let d2 = new Date(b)

    if (d1.getTime() - d2.getTime() > 0) return false

    return true
}

/**
 * Convert format Date (MM/dd/yyyy) => yyyy-mm-dd
 * VD: 12/31/2020 => 2020/12/31
 */
export const ConvertPartnerDateTimeToApi = (dateTimeStr) => {
    let dateArr = dateTimeStr.split('/')
    return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
}

/**
 * 
 * @param {*} str hh:mm:ss
 * @returns minute
 * VD: 1:30:00 => 90
 */
export const TimeMinuteToMinute = str => {
    if (!str && Array.isArray(str.split(':')) && str.split(':').length === 3)
        return 0
    let duration = str.split(':').map(x => (!isNaN(parseInt(x)) ? parseInt(x) : 0));
    return duration[2] >= 30
        ? ((duration[0]) * 60 + duration[1] + 1)
        : ((duration[0]) * 60 + duration[1]);
}
/**
 * Convert dd/mm/yyyy to yyyy-mm-dd
 * @param string
 * @return string 'yyyy'
 */
export const ConvertDMYToYMD = str => {
    if (!str)
        return ''
    let arr = str.split('/')
    return `${arr[2]}/${arr[1]}/${arr[0]}`
}

export const CompareLessThan = (a) => {
    let d1 = new Date(a)
    let d2 = new Date()

    let timeless = new Date(d2.getTime() + (2 * 60 * 60 * 1000))

    if (timeless.getTime() - d1.getTime() > 0) return false

    return true
}
/**
 * @description convert seconds -> TimeFormat HH:mm:ss
 * @param {*} seconds 
 * @returns 'HH:mm:ss'
 */
export const ConvertSecondToTimeFormat = (seconds) => {
    let d = new Date()
    if (!seconds) {
        d.setHours('00'); d.setMinutes('00'); d.setSeconds('00')
    }else{
        let math_hour = Math.floor((parseInt(seconds) || 0) / 3600)
        let math_min = Math.floor((parseInt(seconds) || 0) %3600 / 60)
        let math_sec = Math.floor((parseInt(seconds) || 0) % 60)
    
        let hours = math_hour > 10 ? math_hour : `0${math_hour}`
        let min = math_min > 10 ? math_min : `0${math_min}`
        let sec = math_sec > 10 ? math_sec : `0${math_sec}`
    
        d.setHours(hours); d.setMinutes(min); d.setSeconds(sec);
    }
    return d
}

/**
 * @description convert date time HH:mm:ss -> seconds
 * @param {*} input: date time
 * @returns 'HH:mm:ss'
 */
 export const ConvertTimeFormatDateToSecond = (date) => {
    if (!date) {
        return 0;
    }else{
        let d = new Date(date)
        return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()
    }
}

export const ConvertTimeFormatToSeconds = (timeString) => {
    if(!timeString) return 0
    const arr = timeString.split(":");
    const seconds = arr[0] * 3600 + arr[1] * 60 + (+arr[2]);
    console.log('seconds', seconds)
    return seconds;
}

/**
 * @description convert seconds -> TimeFormat string HH:mm:ss
 * @param {*} seconds 
 * @returns 'HH:mm:ss'
 */
 export const ConvertSecondToTimeFormatString = (seconds) => {
    if (!seconds) {
        return '00:00:00'
    }else{
        let math_hour = Math.floor((parseInt(seconds) || 0) / 3600)
        let math_min = Math.floor((parseInt(seconds) || 0) %3600 / 60)
        let math_sec = Math.floor((parseInt(seconds) || 0) % 60)
    
        let hours = math_hour > 10 ? math_hour : `0${math_hour}`
        let min = math_min > 10 ? math_min : `0${math_min}`
        let sec = math_sec > 10 ? math_sec : `0${math_sec}`
    
        return `${hours}:${min}:${sec}`
    }
}
/**
 * @description get first/end Day of month -> 01/12/2022 / 31/12/2022
 * @param {*} seconds 
 * @returns 'dd/MM/yyyy'
 */
export const GetFirtsEndDay = (input, first = true, format = null) => { // (DateTime input, boolean start, string format)
    try {
        let date = null;
        if (input instanceof Date) {
            date = input;
        }
        if (typeof input === 'string' || input instanceof String) {
            date = new Date(input);
        }
        if (date) {
            var year = date.getFullYear(), month = date.getMonth();
            var dateTemp = null;
            if (first === true) {
                dateTemp = new Date(year, month, 1); //first day of month
            } else {
                dateTemp = new Date(year, month + 1, 0); //end day of month
            }
            return format ? dateformat(dateTemp, format) : dateTemp;
        }
        return null;
    } catch(e) {
        return null;
    }
}

export default {
    TimeMinuteToMinute,
    ConvertPartnerDateTimeToApi,
    IsValidDate,
    DisplayDateTime,
    SendDateTime,
    ConvertToSendApiFormat,
    ConvertDatetimeToString,
    GetDatetimeStr,
    AddDuration,
    CompareTwoDate,
    DisplayDate,
    DisplayTime,
    ConvertStringToDatetime,
    ConvertDMYToYMD,
    CompareLessThan,
    ConvertSecondToTimeFormat,
    ConvertTimeFormatToSeconds,
    ConvertSecondToTimeFormatString,
    GetFirtsEndDay
}