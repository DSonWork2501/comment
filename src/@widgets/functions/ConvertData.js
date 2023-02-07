/**
 * @description convert string to array of Int
 */
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
/**
 * @description convert array to string
 */
//type = 1 return [] example in=[123,3] => out='[123,3]';
//type = 2 return '' example in=[123,3] => out='123,3';
//  export function ArrayToString(arr, type = 1) {
//     try {
//         if (!arr || !Array.isArray(arr)) return "";
//         let str;
//         if (type === 1) {
//             str = "[" + arr.toString() + "]";
//             //check again when not array then error
//             JSON.parse(str)
//         } else {
//             str = arr.toString();
//             //check again when not array then error
//             JSON.parse("[" + str + "]")
//         }
//         return str;
//     } catch (e) {
//         return "";
//     }
// }