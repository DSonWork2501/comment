export const RemoveSpecialChar = (str) => {
    var result = "";
    [...str].filter(item => (((item.charCodeAt() >= 48 && item.charCodeAt() <= 57) || (item.charCodeAt() >= 65 && item.charCodeAt() <= 90) || (item.charCodeAt() >= 97 && item.charCodeAt() <= 122)))).forEach(item => result += `${item}`);
    return result;
}