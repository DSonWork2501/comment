/**
 * Get data from file txt
 * @param {file} e 
 * @returns array data 
 */
export const GetDataFromFile = (files) => {
    /* Parse data */
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString
        reader.onload = (e) => {
            const bstr = e.target.result
            resolve(bstr)
        }
        if (rABS) {
            reader.readAsBinaryString(files[0])
        } else {
            reader.readAsArrayBuffer(files[0])
        }
    });
}