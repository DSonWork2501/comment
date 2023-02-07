import XLSX from 'xlsx'
/**
 * Get duwx lieeu tuwf file excel
 * @param {file} e 
 * @returns array excel data 
 */
export const GetExcelDataFromFile = (files, dateNFFormat = null, numberHeadRow) => {
    /* Parse data */
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString
        reader.onload = (e) => {
            const bstr = e.target.result
            let optionRead = { type: 'binary', cellDates: true, raw: false, cellText: true, cellNF: false }
            if (dateNFFormat) optionRead = { ...optionRead, dateNF: dateNFFormat }
            const wb = XLSX.read(bstr, optionRead)
            /* Get first worksheet */
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            let options = { raw: false, defval: null, header: 1 }
            if (dateNFFormat) options = { ...options, dateNF: dateNFFormat }
            /* Convert array of arrays */

            const data = XLSX.utils.sheet_to_json(ws, options)
            let header = Array.isArray(data) && data.length > 0 ? data.filter((item, index) => item.filter(i => i).length > 0)[0].filter(i => i).length : 0
            /* Update state */
            let arrayLength = numberHeadRow || header;
            resolve(data.filter(item => item[0] !== null).filter((item, index) => index !== 0).map(x => {
                let result = []
                for (let index = 0; index < arrayLength; index++) {
                    result.push(x[index])
                }
                return result
            }))
        }
        if (rABS) {
            reader.readAsBinaryString(files[0])
        } else {
            reader.readAsArrayBuffer(files[0])
        }
    });
}/**
 * Get duwx lieeu tuwf file excel tat ca cac sheet
 * @param {file} e 
 * @returns array excel data all sheet
 */
export const GetExcelDataFromFileAllSheet = (files, dateNFFormat = null, numberHeadRow) => {
    /* Parse data */
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString
        reader.onload = (e) => {
            const bstr = e.target.result
            let optionRead = { type: 'binary', cellDates: true, raw: false, cellText: true, cellNF: false }
            if (dateNFFormat) optionRead = { ...optionRead, dateNF: dateNFFormat }
            const wb = XLSX.read(bstr, optionRead)
            /* Get first worksheet */
            const sheet = wb.SheetNames.length
            let options = { raw: false, defval: null, header: 1 }
            if (dateNFFormat) options = { ...options, dateNF: dateNFFormat }
            let dataFinal = []
            let arrayLength = 0
            if (sheet > 0) {
                wb.SheetNames.forEach(sheetDetail => {
                    const wsname = sheetDetail
                    const ws = wb.Sheets[wsname]
                    /* Convert array of arrays */
        
                    const data = XLSX.utils.sheet_to_json(ws, options)
                    let header = Array.isArray(data) && data.length > 0 ? data.filter((item, index) => item.filter(i => i).length > 0)[0].filter(i => i).length : 0
                    /* Update state */
                    arrayLength = numberHeadRow || header;
                    data.filter(item => item[0] !== null).filter((item, index) => index !== 0).forEach(x => {
                        let result = []
                        for (let index = 0; index < arrayLength; index++) {
                            result.push(x[index])
                        }
                        dataFinal = [...dataFinal, {...result}]
                    })
                })
                resolve(dataFinal.filter(item => item[0] !== null).map(x => {
                    let result = []
                    for (let index = 0; index < arrayLength; index++) {
                        result.push(x[index])
                    }
                    return result
                }))
            }
        }
        if (rABS) {
            reader.readAsBinaryString(files[0])
        } else {
            reader.readAsArrayBuffer(files[0])
        }
    });
}