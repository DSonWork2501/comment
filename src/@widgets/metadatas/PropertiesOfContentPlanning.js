import languageSub from './languageSub'
/**
 * @description Danh sách loại phụ đề
 */
const typeOfSubTitle = {
    Hardsub:      { id: 1, name: "Hardsub" },
    Softsub:      { id: 2, name: "Softsub" },
    KhongXacDinh: { id: 3, name: "Không xác định" }
}

/**
 * @description Danh sách giọng đọc
 */
const subType = {
    KhongXacDinh: { id: 5, name: "T/M không xác định" },
    MienBac:      { id: 6, name: "Miền bắc" },
    MienNam:      { id: 7, name: "Miền nam" },
    BacVaNam:     { id: 8, name: "Bắc và nam" }
}

/**
 * @description Danh sách SubTitle
 * @param typeOfSubTitle chỉ chọn một
 * @param languageSub có thể chọn nhiều
 * @param subType chỉ chọn một
 */
const subTitle = {
    PhuDe: {
        id: 0,
        name: "Phụ đề",
        typeOfSubTitle: typeOfSubTitle,
        languageSub: languageSub,
        subType: null
    },
    ThuyetMinh: {
        id: 4,
        name: "Thuyết minh",
        typeOfSubTitle: null,
        languageSub: null,
        subType: subType
    },
    LongTieng: {
        id: 5,
        name: "Lồng tiếng",
        typeOfSubTitle: null,
        languageSub: null,
        subType: null
    },
    TiengGoc: {
        id: 11,
        name: "Tiếng gốc",
        typeOfSubTitle: null,
        languageSub: null,
        subType: null
    }
}

export default {
    typeOfSubTitle,
    subType,
    subTitle
}