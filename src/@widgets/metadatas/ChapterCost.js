/**
 * @description Danh sách trang Chapter cost
 */
 const chapterCosts = [
    { id: 0,      name: '0 VNĐ'      },
    { id: 21000,  name: '21.000 VNĐ' , isPartner: true},
    { id: 22000,  name: '22.000 VNĐ' , isPartner: true},
    { id: 32000,  name: '32.000 VNĐ' , isPartner: true},
    { id: 45000,  name: '45.000 VNĐ' , isPartner: false},
    { id: 49000,  name: '49.000 VNĐ' , isPartner: false},
    { id: 55000,  name: '55.000 VNĐ' , isPartner: true},
    { id: 99000, name:  '99.000 VNĐ', isPartner: false},
    { id: 109000, name: '109.000 VNĐ', isPartner: false},
    { id: 129000, name: '129.000 VNĐ', isPartner: false}
]

// /**
//  * backup
//  * @description Danh sách trang Chapter cost
//  */
// const chapterCosts = [
//     { id: 0,      name: '0 VNĐ'},
//     { id: 9000,   name: '9.000 VNĐ'},
//     { id: 15000,  name: '15.000 VNĐ'},
//     { id: 19000,  name: '19.000 VNĐ'},
//     { id: 20000,  name: '20.000 VNĐ'},
//     { id: 25000,  name: '25.000 VNĐ'},
//     { id: 29000,  name: '29.000 VNĐ'},
//     { id: 30000,  name: '30.000 VNĐ'},
//     { id: 39000,  name: '39.000 VNĐ'},
//     { id: 39500,  name: '39.500 VNĐ'},
//     { id: 49000,  name: '49.000 VNĐ'},
//     { id: 50000,  name: '50.000 VNĐ'},
//     { id: 70000,  name: '70.000 VNĐ'},
//     { id: 100000,  name: '100.000 VNĐ'},
//     { id: 125000,  name: '125.000 VNĐ'}
// ]

/**
 * @description truyền vào giá tiền, xuất ra định dạng tương ứng trong mảng
 * @param {*} chapterCost 
 */
export const getName = chapterCost => {
    let item = Object.values(chapterCosts).find(item=>item.id === parseInt(chapterCost))
    return item ? item.name : ''
}

export default chapterCosts