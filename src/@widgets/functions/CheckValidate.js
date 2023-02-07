/**
 * @description check json string
 * @param {*} str: string
 * @returns boolean
 */
const checkJsonString = (str) => {
    try {
        JSON.parse(str)
    } catch (error) {
        return false
    }
    return true
}
export default {
    checkJsonString
}