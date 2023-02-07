/**
 * @description Danh sách trạng thái link
 */
const states = {
    _less_1: {id: -1,progress: 0, name: "Chưa Phân Link",               className:"bg-blue-gray-800"},
    _0:      {id: 0, progress: 0, name: "Đã Phân Link",                 className:"bg-blue-gray-800"},
    _1:      {id: 1, progress: 1, name: "Đã Làm Link",                  className:"bg-blue-gray-800"},
    _21:     {id: 21,progress: 1, name: "Trả Làm Link Lại",             className:"bg-blue-gray-800"},
    _2:      {id: 2, progress: 2, name: "Chờ Duyệt Link",               className:"bg-blue-gray-800"},
    _32:     {id: 32,progress: 3, name: "Hoàn Thành Trả Về Duyệt Link", className:"bg-blue-gray-800"},
    _3:      {id: 3, progress: 3, name: "Link Đã Hoàn Thành",           className:"bg-green-500"},
    _42:     {id: 42,progress: 2, name: "Chờ Duyệt Link(Bị Hạ)",        className:"bg-blue-gray-800"}
}

export const getName = state => {
    let item = Object.values(states).find(item=>item.id === parseInt(state))
    return item ? item.name : ''
}

export default states