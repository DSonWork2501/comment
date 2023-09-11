/**
 * @author: vinhtq24
 * @description Kiểm tra 1 mảng giá trị có tồn tại trong 1 mảng theo rule
 * @param (*) ruleArray: mảng nguyên tắc
 * @param (*) valueArray: mảng giá trị cần check
 * @return 1 mảng giá trị không đúng rule trong ruleArray
 * @example: CheckDifferentArrayValue([1,2], [2,4]) => [4]
 */
const CheckDifferentArrayValue = (ruleArray, valueArray) => {
    return valueArray.filter(item=>!ruleArray.includes(item))
}
/**
 * @author: vinhtq24
 * @description Kiểm tra 1 mảng giá trị có tồn tại trong 1 mảng theo rule
 * @param (*) ruleArray: mảng nguyên tắc
 * @param (*) valueArray: mảng giá trị cần check
 * @return 1 mảng giá trị đúng rule trong ruleArray
 * @example: CheckSameArrayValue([1,2], [2,4]) => [2]
 */
const CheckSameArrayValue = (ruleArray, valueArray) => {
    return valueArray.filter(item=>ruleArray.includes(item))
}
/**
 * @author vinhtq24
 * @description kiểm tra 1 mảng trị có bị duplicate dữ liệu
 * @param {*} valueArray
 * @example: CheckDuplicate([1,2,3,2,3]) => [2,3]
 */
const CheckDuplicate = (valueArray) => {
    var result = valueArray.reduce(function (acc, obj) {
        var key = obj;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
    return Object.values(result).filter(item => item.length > 1).map(item => item[0])
}
const SortObjectArray = (array, name) => {
    // // console.log('ararry', array)
    return (!Array.isArray(array) || array.length === 0) ? [] : array.sort((a,b) => (a[name] > b[name]) ? 1 : ((b[name] > a[name]) ? -1 : 0))
}
export default {
    CheckDifferentArrayValue,
    CheckSameArrayValue,
    CheckDuplicate,
    SortObjectArray
}
