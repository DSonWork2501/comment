
/**
 * 
 * @description Định nghĩa giá trị mặc định
 */

const initAtribute = {
    field: "", 
    label: "", 
    classHeader :  "" ,
    classValue :  "" ,
    alignHeader: "center", 
    alignValue: "center", 
    sortable :  true, 
    isDate: false, 
    formatDate: "dd/mm/yyyy HH:MM:ss", 
    order: "asc", 
    disablePaddingHeader: false,
    visible: true,
    selectAllValue: null,
    classCheckAll: '', 
    onSelectAllClick: null,
    hideOption: false,
    isSelectAllDisabled: false,
    style:{}
}

 /**
 * @description Khởi tạo column cho table
 * @returns Object
 * @param string field default "" 
 * @param string label default ""
 * @param string className default ""
 * @param string alignHeader default "center"
 * @param string alignValue default "center"
 * @param bool sortable default true
 * @param bool isDate default false
 * @param string formatDate default "dd/mm/yyyy HH:MM:ss"
 * @param string order ("asc" | "desc") default "asc"
 * @param bool disablePaddingHeader default false
 * @param bool hideOption default false
 */
function initColumn(atribute = initAtribute) {
    return {...initAtribute, ...atribute}
}

export default initColumn