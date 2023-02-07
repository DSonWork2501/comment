/**
 * @description Danh sách trạng thái bài viết
 */
const states = {
    _less_1: {id: -1, progress: 0,name: "Chưa Phân Bài",              className:"bg-gray-800"     , isEnableEdit: false},
    _0:     {id: 0,  progress: 0,name: "Đã Phân Bài",                 className:"bg-blue-gray-800", isEnableEdit: true},
    _1:     {id: 1,  progress: 1,name: "Đã Soạn Xong",                className:"bg-blue-gray-800", isEnableEdit: true},
    _21:    {id: 21, progress: 1,name: "Trả Soạn Lại",                className:"bg-blue-gray-800", isEnableEdit: true},
    _2:     {id: 2,  progress: 2,name: "Chờ Duyệt Bài",               className:"bg-blue-gray-800", isEnableEdit: false},
    _32:    {id: 32, progress: 2,name: "Hoàn Thành Trả Về Duyệt Bài", className:"bg-blue-gray-800", isEnableEdit: false},
    _3:     {id: 3,  progress: 3,name: "Đã Hoàn Thành",      className:"bg-blue-gray-800", isEnableEdit: false},
    _4:     {id: 4,  progress: 4,name: "Chờ Hiển Thị",                className:"bg-blue-gray-800", isEnableEdit: true},
    _5:     {id: 5,  progress: 5,name: "Hiển Thị",                    className:"bg-green-500"    , isEnableEdit: false},
    _40:    {id: 40, progress: 0,name: "Đã Xóa",             className:"bg-blue-gray-800", isEnableEdit: false},
    _41:    {id: 41, progress: 1,name: "Đã Soạn Xong(Bị Hạ)",      className:"bg-blue-gray-800", isEnableEdit: false},
    _42:    {id: 42, progress: 2,name: "Chờ Duyệt Bài(Bị Hạ)",   className:"bg-blue-gray-800", isEnableEdit: false}
}

export const getName = state => {
    let item = Object.values(states).find(item=>item.id === parseInt(state))
    return item ? item.name : ''
}

export default states