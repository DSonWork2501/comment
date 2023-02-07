import moment from 'moment/moment'

/**
 * @description Format Date & time value
 */
export function DateTimeFormat(value_string, format_string = null){
    return isNaN(Date.parse(value_string))
    ? moment(new Date()).format(format_string ? format_string : moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    : moment(Date.parse(value_string)).format(format_string ? format_string : moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
}

export function StringToArrayInt(str) {
    try {
        let arr = JSON.parse(str);
        if (arr && Array.isArray(arr)) {
            return arr.map(x => parseInt(x) || 0);
        } else {
            return [];
        }
    } catch (e) {
        return [];
    }
}