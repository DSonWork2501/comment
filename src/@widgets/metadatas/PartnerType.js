/**
 * @description Danh sách loại Partner
 */
const partnerType = {
    'BHD_SVOD': {id: 6, partnerId: 4, isFee: false},
    'BHD_TVOD': {id: 7, partnerId: 4, isFee: true},
    'Phim miễn phí': {id: 8, partnerId: 4, isFee: false},
    'FimPlus_SVOD': {id: 9, partnerId: 5, isFee: false},
    'FimPlus_TVOD': {id: 10, partnerId: 5, isFee: true},
    'FimPlus_AVOD': {id: 11, partnerId: 5, isFee: false}
}
export default partnerType;