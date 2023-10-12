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

export const initExcelModel = (array, position) => {
  array = array.map(item => item && item.trim())
  return {
    //stt: new initValidateExcel({ dataType: ValidateField.number, isNull: false, error: null, value: array[0], position: 1 }),
    name: new initValidateExcel({ dataType: ValidateField.string, isNull: false, error: null, value: array[position[0]], position: 1 }),
    phone: new initValidateExcel({ dataType: ValidateField.string, isNull: false, error: null, value: array[position[1]], position: 2 }),
    email: new initValidateExcel({ dataType: ValidateField.email, isNull: false, error: null, value: array[position[2]], position: 3 }),
  }
}

const cols = {
  error: { name: "", isVisible: true, hideOption: true },
  //stt: { name: "STT", isVisible: true, hideOption: false },
  name: { name: "Tên thành viên", isVisible: true, hideOption: false },
  phone: { name: "Số điện thoại", isVisible: true, hideOption: false },
  email: { name: "Email", isVisible: true, hideOption: false },
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
  name: "",
  phone: "",
  email: "",
}

export const initImportModel = (entity = model) => {
  return { ...model, ...entity }
}