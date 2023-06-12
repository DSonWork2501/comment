import { initValidateExcel, ValidateField } from '@widgets/functions'
import { initColumn } from '@widgets/functions'

// eslint-disable-next-line
/**
 * @description remove space in char
 * @param {*} arrStr 
 * @param {*} separateChar 
 * @example  RemoveSpaceInStr('1,2, 3, 4', ',') => '1,2,3,4'
 * @returns str
 */
// const RemoveSpaceInStr = (arrStr, separateChar) => {
//   console.log('arrStr.split(separateChar).map(i => i.trim()).join(separateChar)', arrStr.split(separateChar).map(i => i.trim()).join(separateChar))
//   return arrStr.split(separateChar).map(i => i.trim()).join(separateChar)
// }

export const initExcelModel = array => {
  array = array.map(item => item && item.trim())
  return {
    stt: new initValidateExcel({ dataType: ValidateField.number, isNull: false, error: null, value: array[0], position: 1 }),
    channel: new initValidateExcel({ dataType: ValidateField.string, isNull: false, error: null, value: array[1], position: 2 }),
    platform: new initValidateExcel({ dataType: ValidateField.string, isNull: false, error: null, value: array[2], position: 3 }),
    link: new initValidateExcel({ dataType: ValidateField.string, string: false, error: null, value: array[3], position: 4 }),
    contract: new initValidateExcel({ dataType: ValidateField.string, isNull: false, error: null, value: array[4], position: 5 }),
    contractDate: new initValidateExcel({ dataType: ValidateField.dateMonthYear, isNull: false, error: null, value: array[5], position: 6 }),
    partner: new initValidateExcel({ dataType: ValidateField.string, isNull: false, error: null, value: array[6], position: 7 }),
    percent: new initValidateExcel({ dataType: ValidateField.number, isNull: false, error: null, value: array[7], position: 8 }),
    openDate: new initValidateExcel({ dataType: ValidateField.dateMonthYear, isNull: false, error: null, value: array[8], position: 9 }),
  }
}

const cols = {
  error: { name: "", isVisible: true, hideOption: true },
  stt: { name: "STT", isVisible: true, hideOption: false },
  channel: { name: "Tên kênh", isVisible: true, hideOption: false },
  platform: { name: "Nền tảng", isVisible: true, hideOption: false },
  link: { name: "Link", isVisible: true, hideOption: false },
  contract: { name: "Số hợp đồng", isVisible: true, hideOption: false },
  contractDate: { name: "Ngày hợp đồng", isVisible: true, hideOption: false },
  partner: { name: "Đối tác MCN", isVisible: true, hideOption: false },
  percent: { name: "Tỷ lệ hưởng doanh thu", isVisible: true, hideOption: false },
  openDate: { name: "Ngày bật kiếm tiền", isVisible: true, hideOption: false },
}

export const initHeaderModel = () => {
  var arrCols = Object.keys(cols)
  var headerArray = arrCols.map(item => (
    new initColumn({
      field: item,
      label: cols[item].name,
      visible: cols[item].isVisible,
      isDate: cols[item].isDate,
      sortable: false,
      hideOption: cols[item].hideOption,
      disablePaddingHeader: true,
      classHeader: 'min-w-200'
    })
  ))
  return headerArray
}

const model = {
  id: 0,
  stt: 0,
  channel: "",
  platform: "",
  link: "",
  contract: "",
  contractDate: "",
  partner: "",
  percent: 0,
  openDate: "",
}

export const initImportModel = (entity = model) => {
  return { ...model, ...entity }
}