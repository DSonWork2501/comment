import { LiveGuard } from '@widgets/metadatas'

/**
 * @description định nghĩa các field cho form
 */
const model = {
  id: 0,
  itemID: 0,
  itemName: "itemName",
  unitID: 1,
  locationID: 1,
  resourceID: "resourceID",
  partnerID: 1,
  partnerOutFPL: "partnerOutFPL",
  categoryID: 1,
  implementID: 1,
  employPartner: "employPartner",
  cameraAmount: 1,
  loopTime: 1,
  fromDate: "2022-07-05T02:45:36.447Z",
  toDate: "2022-07-05T02:45:36.447Z",
  script: "script",
  note: "note",
  status: 0,
  reasonReject: "",
  reasonCancel: "",
}

/**
 * @description khởi tạo đối tượng model cho form nhập liệu
 * @param {*} model 
 * @returns object
 */
function form(entity = model) {
  return { ...model, ...entity }
}

/**
 * @description khởi tạo đối tượng form edit
 * @param {*} entity 
 * @returns object
 */

const initFormModel = (isCreate = true, entity = null, channelEntity) => {

}

const auth = {
  VIEW: 'ListBookingStudio',
  UPDATE: 'InsertUpdateBookingStudio',
  APPROVE: 'ApproveBookingStudio'
}
export default initFormModel;