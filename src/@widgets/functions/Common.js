export const CheckStringIsJson = (str) => {
    try {
        JSON.parse(str)
        return true
    }
    catch (ex) {
        return false
    }
}