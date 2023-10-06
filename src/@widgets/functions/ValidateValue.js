import dataType from './ValidateField'
import { initValidateExcel, storage, CheckArrays } from '@widgets/functions'
import { QualitySource, KeyStorage, CopyrightOptions, RegexPattern, TypeFilm, PropertiesOfContentPlanning, MPA } from '@widgets/metadatas'
const listCountry = storage.getStorage(KeyStorage.country)
const listCopyright = storage.getStorage(KeyStorage.copyright)
const listFolder = storage.getStorage(KeyStorage.folders)
const subTitleIndex = Object.values(PropertiesOfContentPlanning.subTitle)
const languageSubIndex = Object.values(PropertiesOfContentPlanning.subTitle.PhuDe.languageSub)
const subTypeIndex = Object.values(PropertiesOfContentPlanning.subTitle.ThuyetMinh.subType)

/**
 * index check validate value
 * @param {iSNull: boolean, value: any, dataType: string} item 
 */
const CheckValidate = (item, data) => {
    if (!item.isNull && !item.value)
        return "Giá trị rỗng !"
    switch (item.dataType) {
        case dataType.email:
            return RegexPattern.email.test(item.value) ? "" : `Vui lòng nhập đúng email`

        case dataType.includeList:
            return item.list.includes(item.value) > 0 ? "" : `Vui lòng nhập đúng một trong số định dạng (${item.list.join('|')})`
        /**
         * @description define number
         */
        case dataType.number:
            return (item.isNull && !item.value) || RegexPattern.number.test(item.value) ? "" : "Giá trị phải là số !"
        /**
         * @description define : yyyy/mm/dd HH:MM:ss
         */
        case dataType.datetime:
            return RegexPattern.dateTime.test(item.value) ? "" : "Sai định ngày giờ (format: yyyy/mm/dd HH:MM:ss) VD: 2021/12/31 23:59:59 !"
        /**
         * @description define : mm/dd/yyyy HH:MM
         */
        case dataType.datetimeMonth: {
            if (item.isNull && !item.value)
                return ""
            return RegexPattern.dateTimeMonth.test(item.value) ? "" : "Sai định ngày giờ (format: mm/dd/yyyy HH:MM) VD: 12/31/2021 23:59 !"
        }
        /**
        * @description define : dd/mm/yyyy
        */
        case dataType.dateMonthYear: {
            if (item.isNull && !item.value)
                return ""
            return RegexPattern.dateMonthYear.test(item.value) ? "" : "Sai định ngày giờ (format: dd/mm/yyyy) VD: 31/12/2021!"
        }
        /**
        * @description define : mm/dd/yyyy
        */
        case dataType.dateMonth: {
            if (item.isNull && !item.value)
                return ""
            return RegexPattern.dateMonth.test(item.value) ? "" : "Sai định ngày giờ (format: mm/dd/yyyy) VD: 12/31/2021!"
        }
        /**
         * @description define : yyyy-MM-dd HH:MM
         */
        case dataType.datetimeYoda: {
            if (item.isNull && !item.value)
                return ""
            return RegexPattern.dateTimeYoda.test(item.value) ? "" : "Sai định ngày giờ (format: yyyy-MM-dd HH:MM) VD: 2021-12-31 23:59 !"
        }

        /**
         * @description define : yyyy-MM-dd HH:MM:SS
         */
        case dataType.dateTimeOther: {
            if (item.isNull && !item.value)
                return ""
            return RegexPattern.dateTimeOther.test(item.value) ? "" : "Sai định ngày giờ (format: yyyy-MM-dd HH:MM:SS) VD: 2021-12-31 23:59:59 !"
        }

        /**
         * @description define : yyyy-MM-dd HH:MM:SS || yyyy-MM-dd
         */
        case dataType.dateTimeOrDate: {
            if (item.isNull && !item.value)
                return ""
            return (RegexPattern.dateTimeOther.test(item.value)
                || RegexPattern.dateYoda.test(item.value)
                || RegexPattern.date.test(item.value)) ? "" : "Sai định ngày giờ format: yyyy-MM-dd HH:MM:SS || yyyy-MM-dd"
        }

        /**
         * @description define : yyyy-MM-dd HH:MM
         */
        case dataType.dateYoda: {
            if (item.isNull && !item.value)
                return ""
            return RegexPattern.dateYoda.test(item.value) ? "" : "Sai định ngày giờ (format: yyyy-MM-dd) VD: 2021-12-31!"
        }
        /**
         * @description define : yyyy/mm/dd
         */
        case dataType.date:
            return RegexPattern.date.test(item.value) ? "" : "Sai định ngày (format: yyyy/mm/dd) VD: 2021/12/31!"
        /**
         * @description define year: {20xx, 19xx, 18xx}
         */
        case dataType.year:
            return RegexPattern.year.test(item.value) ? "" : "Năm Sản Xuất có 4 số {20xx, 19xx, 18xx}"
        /**
         * @description define number string: '1,2,3,4'
         */
        case dataType.strNumber:
            return RegexPattern.strNumber.test(item.value) ? "" : "Chuỗi số phải xen nhau có dấu phẩy VD: '1,2,3'"
        /**
         * @description kiểm tra publishCountry theo nameEN có tồn tại
         */
        case dataType.country: {
            let result = listCountry.find(i => i.nameEN.toLowerCase() === item.value.toLowerCase())
            return !result ? "Quốc Gia không tồn tại !" : ""
        }
        /**
         * @description kiểm tra publishCountryVN theo name có tồn tại
         */
        case dataType.countryVN: {
            let result = listCountry.find(i => i.name.toLowerCase() === item.value.toLowerCase())
            return !result ? "Quốc Gia không tồn tại !" : ""
        }
        /**
         * @description kiểm tra publishCountry theo nameEN có tồn tại
         */
        case dataType.areaCodeCountry: {
            let result = listCountry.find(i => i.code.toLowerCase() === item.value.toLowerCase())
            return !result ? "Area Code Quốc Gia không tồn tại !" : ""
        }
        /**
         * @description kiểm tra qualitySource có tồn tại 
         */
        case dataType.quality: {
            let result = Object.values(QualitySource).find(i => i.id.toString() === item.value)
            return !result ? "Giá Trị không tồn tại !" : ""
        }
        /**
         * @description kiểm tra app
         */
        case dataType.app: {
            let result = listFolder.find(i => i.id.toString() === item.value)
            return !result ? "Giá Trị Không Tồn Tại !" : ""
        }
        /**
         * @description kiểm tra thể loại chính theo id
         */
        case dataType.folder: {
            let app = listFolder.find(i => i.id.toString() === data[dataType.app].value)
            if (!app)
                return "Không tìm thấy danh sách thông tin Folder theo dataType.app !!!"
            let catergoryArr = app.items.map(item => { return item })
            let result = null
            catergoryArr.every(i => {
                result = i.items.find(is => (is.id).toString() === item.value)
                if (!result) {
                    return true
                }
                return false
            })
            return !result ? "Giá Trị Không Tồn Tại !" : ""
        }
        /**
         * @description kiểm tra thể loại chính theo tên
         */
        case dataType.folderName: {
            let app = listFolder.find(i => i.id.toString() === data[dataType.app].value.toString())

            if (!app)
                return "Không tìm thấy danh sách thông tin Folder theo dataType.app !!!"
            let catergoryArr = app.items.map(item => { return item })
            let result = null
            catergoryArr.every(i => {
                result = i.items.find(is => (is.toptitle).toString().toLowerCase() === item.value.toLowerCase().trim())
                if (!result) {
                    return true
                }
                return false
            })
            return !result ? "Giá Trị Không Tồn Tại !" : ""
        }
        /**
         * @description Kiểm tra bản quyền
         */
        case dataType.nameCopyRight: {
            return item.value && !listCopyright.find(i => (i.id).toString() === item.value) ? "Giá Trị Không Tồn Tại !" : ""
        }
        /**
         * @description Kiểm tra Mô hình khai thác
         */
        case dataType.exploitedModel: {
            if (!data[dataType.nameCopyRight].value)
                return ""
            if (!item.value)
                return "Giá Trị Không Để Trống"
            var mhktResult = Object.values(CopyrightOptions.MohinhKhaiThac)
                .find(mhktItem => (mhktItem.id).toString() === data[dataType.exploitedModel].value)
            return !mhktResult ? "Giá Trị Không Tồn Tại !" : ""
        }
        /**
         * @description Kiểm tra mô hình kinh doanh
         */
        case dataType.urlPartner: {
            if (!data[dataType.nameCopyRight].value)
                return ""
            if (!data[dataType.urlPartner].value)
                return "Giá Trị Không Để Trống"
            let mhkdResult = Object.values(CopyrightOptions.MoHinhKinhDoanh)
                .find(mhkdItem => (mhkdItem.id).toString() === data[dataType.urlPartner].value)
            return !mhkdResult ? "Giá Trị Không Tồn Tại !" : ""
        }
        /**
         * @description kiểm tra thời gian bản quyền
         */
        case dataType.timeCopyRight: {
            return !data[dataType.nameCopyRight].value ? "" :
                !item.value ? "Giá Trị Không Để Trống" :
                    !RegexPattern.dateTime.test(item.value) ? "Sai định ngày giờ (format: yyyy/mm/dd HH:MM:ss) VD: 2021/12/31 23:59:59 !" :
                        ""
        }
        /**
         * @description Kiểm tra bộ/lẻ
         */
        case dataType.listOnFolder: {
            let result = Object.values(TypeFilm).find(i => (i.id).toString() === item.value)
            return !result ? "Giá Trị Không Tồn Tại !" : ""
        }
        /**
         * @description Kiểm tra Âm thanh
         */
        case dataType.subTitle: {
            let subtitleArr = item.value.split(",")
            let duplicateArr = CheckArrays.CheckDuplicate(subtitleArr)
            let valueArr = subTitleIndex.filter(i => i.id !== 0).map(item => { return (item.id).toString() })
            valueArr = valueArr.concat(Object.values(PropertiesOfContentPlanning.typeOfSubTitle).map(i => i.id.toString()))
            let noneExistArr = CheckArrays.CheckDifferentArrayValue(valueArr, subtitleArr)
            return duplicateArr.length > 0 ? "Giá trị bị trùng lặp !" :
                noneExistArr.length > 0 ? `Giá trị không tồn tại ID: ${noneExistArr.join(',')}` : ""
        }
        /**
         * @description Kiểm tra ngôn ngữ của phụ đề
         */
        case dataType.subLanguage: {
            let subTitleArr = data[dataType.subTitle].value.split(',')
            let phudeIdArray = Object.values(PropertiesOfContentPlanning.typeOfSubTitle).map(i => i.id.toString())
            if (!item.value || CheckArrays.CheckSameArrayValue(phudeIdArray, subTitleArr).length === 0)
                return ""
            let subLanguageArr = item.value.split(",")
            let duplicateArr = CheckArrays.CheckDuplicate(subLanguageArr)
            let valueArr = languageSubIndex.map(item => { return (item.id).toString() })
            let noneExistArr = CheckArrays.CheckDifferentArrayValue(valueArr, subLanguageArr)
            return duplicateArr.length > 0 ? "Giá trị bị trùng lặp !" :
                noneExistArr.length > 0 ? `Giá trị không tồn tại ID: ${noneExistArr.join(',')}` : ""
        }
        /**
         * @description Kiểm tra dạng phụ đề/ dạng thuyết minh
         */
        case dataType.subType: {
            if (!data[dataType.subTitle].value)
                return ""
            if (!item.value)
                return ""
            let subTypeArr = item.value.split(',')
            let duplicateArr = CheckArrays.CheckDuplicate(subTypeArr)
            if (duplicateArr.length > 0)
                return 'Giá trị bị trùng lặp !'
            let subTitleArr = data[dataType.subTitle].value.split(',')
            let thuyetMinhID = PropertiesOfContentPlanning.subTitle['ThuyetMinh'].id

            if (subTitleArr.includes(thuyetMinhID.toString())) {
                let checkSubType = CheckArrays.CheckSameArrayValue(subTypeIndex.map(i => { return (i.id).toString() }), subTypeArr)
                if (checkSubType.length !== 1)
                    return (checkSubType.length === 0 && "Chưa Điền Loại Thuyết Minh !") ||
                        (checkSubType.length > 1 && "Chỉ Điền 1 Loại Thuyết Minh !")
            }
            return ""
        }
        case dataType.mpaa: {
            return Object.values(MPA).filter(x => x.id === item.value).length === 0 ? 'Giá trị không tồn tại' : ''
        }
        case dataType.time: {
            return !RegexPattern.time.test(item.value) ? "Sai định giờ (format: HH:MM:ss) VD: 23:59:59 !" : ""
        }
        case dataType.float: {
            return (item.isNull && !item.value) || RegexPattern.float.test(item.value) ? '' : "Giá trị không đúng "
        }
        default:
            break;
    }
}
/**
 * @description kiểm tra validate của từng trường khi import file excel
 * @param {import excel data} data 
 * @param {int: 1 = validateImportExcelData // 2 = CustomExcelModel} type 
 */
const CheckValidateImportExcel = (data, type) => {
    return data.map(item => {
        let keys = Object.keys(item)
        let row = {}
        keys.forEach((strKey, i) => {
            row = {
                ...row,
                [strKey]: new initValidateExcel({
                    ...item[strKey],
                    error: CheckValidate(item[strKey], item)
                }),
            }
        })
        return row
    })
}

export default CheckValidateImportExcel