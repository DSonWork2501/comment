/**
 * @description Định dạng properties file 
 * @author vinhtq24
 */
const FileProperties = {
    other: {id: '0', name: 'other', tag: '', accept: ''},
    excel: {id: '1', name: 'excel',tag: 'xlsx/xlsb/xls', accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'},
    zip: {id: '2', name: 'zip', tag: 'zip', accept: '.zip,.rar,.7zip'},
    image: {id: '3', name: 'image/jpeg', tag: 'jpg', accept: 'image/jpeg'},
    sublink: {id: '4', name: 'sublink', tag: 'srt', accept: '.srt'},
    text: {id: '5', name: 'text', tag: 'txt', accept: '.txt'},
}
export default FileProperties