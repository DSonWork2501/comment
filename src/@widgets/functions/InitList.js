
/**
 * 
 * @description Định nghĩa giá trị mặc định
 */

const initAtribute = {
    id: null, 
    title: null, 
    rtitle :  null,
    subTitle :  null ,
    rsubTitle: null,
    subTitle2: null,
    rsubTitle2: null,
    original: null
}

 /**
 * @description Khởi tạo đối tượng list item
 * @returns Object
 * @param any id default null 
 * @param any title default null 
 * @param any rtitle default null 
 * @param any subTitle default null 
 * @param any rsubTitle default null 
 * @param any subTitle2 default null 
 * @param any rsubTitle2 default null 
 */
function initList(atribute = initAtribute) {
    return {...initAtribute, ...atribute}
}

export default initList