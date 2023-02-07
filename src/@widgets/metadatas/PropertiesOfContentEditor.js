import languageSub from './languageSub'
/**
 * @description Danh sách loại phụ đề
 */
const typeOfSub = {
    Hardsub:      { id: 2, name: "Hardsub" },
    Softsub:      { id: 1, name: "Softsub" },
    KhongXacDinh: { id: 0, name: "Không Xác Định" }
}

/**
 * @description Danh sách giọng đọc
 */
const voiceOfSound = {
    KhongXacDinh: { id: 0, name: "T/M Không Xác Định" },
    MienBac:      { id: 1, name: "Miền Bắc" },
    MienNam:      { id: 2, name: "Miền Nam" },
    BacVaNam:     { id: 3, name: "Bắc và Nam" }
}

/**
 * @description Danh sách subAudio
 */
const subAudio = {
    ThuyetMinh: {
        id: 2,
        name: "Thuyết Minh",
        typeOfSub: null,
        languageSub: null,
        voiceOfSound: voiceOfSound
    },
    LongTieng: {
        id: 3,
        name: "Lồng Tiếng",
        typeOfSub: null,
        languageSub: null,
        voiceOfSound: null
    },
    PhuDe: {
        id: 5,
        name: "Phụ Đề",
        typeOfSub: typeOfSub,
        languageSub: languageSub,
        voiceOfSound: null
    },
    TiengGoc: {
        id: 9,
        name: "Tiếng Gốc",
        typeOfSub: null,
        languageSub: null,
        voiceOfSound: null
    }
}

const subTitle = [
    {
        id: "001",
        subAudio: { id: 2, data: [2] }
    },
    {
        id: "010",
        subAudio: { id: 3, data: [3] }
    },
    {
        id: "100",
        subAudio: { id: 5, data: [5] }
    },
    {
        id: "000",
        subAudio: { id: 9, data: [9] }
    },
    {
        id: "011",
        subAudio: { id: 4, data: [2, 3] }
    },
    {
        id: "101",
        subAudio: { id: 6, data: [2, 5] }
    },
    {
        id: "110",
        subAudio: { id: 7, data: [3, 5] }
    },
    {
        id: "000",
        subAudio: { id: 10, data: [2, 9] }
    },
    {
        id: "000",
        subAudio: { id: 11, data: [3, 9] }
    },
    {
        id: "000",
        subAudio: { id: 13, data: [5, 9] }
    },
    {
        id: "111",
        subAudio: { id: 8, data: [2, 3, 5] }
    },
    {
        id: "011",
        subAudio: { id: 12, data: [2, 3, 9] }
    },
    {
        id: "101",
        subAudio: { id: 14, data: [2, 5, 9] }
    },
    {
        id: "110",
        subAudio: { id: 15, data: [3, 5, 9] }
    },
    {
        id: "111",
        subAudio: { id: 16, data: [2, 3, 5, 9] }
    },
]
/**
 * @description get subTitle dựa vào mảng subAudio
 * @param {*} arrSubAudio 
 * @returns object
 */
export const getSubTitle = arrSubAudio => {
    return Array.isArray(arrSubAudio) ? subTitle.find(x=> x.subAudio.data.length === arrSubAudio.length && arrSubAudio.sort().every((value, index) => value === x.subAudio.data.sort()[index]) === true) : null
}

export default {
    typeOfSub,
    voiceOfSound,
    subAudio,
    subTitle,
    getSubTitle
}