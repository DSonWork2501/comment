
/**
 * 
 * @description Định nghĩa giá trị mặc định
 */

const initAtribute = {
    value: null,
    dataType: null,
    isNull: true,
    error: null
}

 /**
 * @description Khởi tạo đối tượng list item
 * @returns Object
 * @param any rsubTitle2 default null 
 */
function InitValidateExcel(atribute = initAtribute) {
    return {...initAtribute, ...atribute}
}

export default InitValidateExcel