/**
 * @description dateTime: 'yyyy/mm/dd HH:MM:ss'
 * @description dateTimeT: 'yyyy/mm/ddTHH:MM:ss'
 * @description dateTimeMonth: 'MM/dd/yyyy HH:MM'
 * @description dateTimeYoda: 'yyyy-MM-dd HH:MM'
 * @description dateMonth: 'MM/dd/yyyy'
 * @description date: 'dd/MM/yyyy'
 * @description year : {20xx, 19xx, 18xx}
 * @description number string: '1,2,3,4'
 * @description time : 'h:mm:ss'
 * @description float: '1.5'
 */
export default {
    dateTime: /^\d\d\d\d\/([0]{0,1}[1-9]|1[012])\/([1-9]|([012][0-9])|(3[01])) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/,
    dateTimeT: /^\d\d\d\d\/([0]{0,1}[1-9]|1[012])\/([1-9]|([012][0-9])|(3[01]))|T|(20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/,
    dateTimeMonth: /^([1-9]|0[1-9]|1[012])\/([0-9]|0[1-9]|[12][0-9]|3[01])\/\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d$/,
    dateMonth: /^([1-9]|0[1-9]|1[012])\/([0-9]|0[1-9]|[12][0-9]|3[01])\/\d\d\d\d$/,
    dateTimeYoda: /^\d\d\d\d-([1-9]|0[1-9]|1[012])-([0-9]|0[1-9]|[12][0-9]|3[01]) (20|21|22|23|[0-1]?\d):[0-5]?\d$/,
    dateYoda: /^\d\d\d\d-([1-9]|0[1-9]|1[012])-([0-9]|0[1-9]|[12][0-9]|3[01])$/,
    date: /^\d\d\d\d\/([0]{0,1}[1-9]|1[012])\/([1-9]|([012][0-9])|(3[01]))$/,
    year: /^(1[8-9]|20)\d{2}$/,
    strNumber: /^(\d{1,2}(,)?)*\d$/,
    number: /^-?\d+$/,
    time: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    dateMonthYear: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
    float: /[+-]?([0-9]*[.])?[0-9]+/,
    dateTimeOther: /^\d\d\d\d-([1-9]|0[1-9]|1[012])-([0-9]|0[1-9]|[12][0-9]|3[01]) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/,
}