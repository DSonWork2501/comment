/**
 * @description Danh sách trạng thái bài viết
 */
const searchAppType = {
    PhimTruyen: {id: '21', progress: 0,name: "Phim Tuyện", className:"bg-gray-800"},
    GiaiTri: {id: '23',  progress: 1,name: "Giải Trí", className:"bg-blue-gray-800"},
    ThieuNhi:{id: '24',  progress: 2,name: "Thiếu Nhi", className:"bg-blue-gray-800"},
    PT_GT: {id: '21,23',  progress: 3,name: "Phim Tuyện, Giải Trí", className:"bg-blue-gray-800"},
    PT_TN: {id: '21,24',  progress: 4,name: "Phim Tuyện, Thiếu Nhi", className:"bg-blue-gray-800"},
    GT_TN: {id: '23,24',  progress: 5,name: "Giải Trí, Thiếu Nhi", className:"bg-blue-gray-800"},
    PT_GT_TN: {id: '21,23,24',  progress: 6,name: "Phim Tuyện, Giải Trí, Thiếu Nhi", className:"bg-blue-gray-800"},
}

const searchIsSecondScreen = {
    Box: {id: 0, name: "Box"},
    AppBox: {id: 1, name: "App + Box"},
    App:{id: 2 ,name: "App"},
}

const searchOptionApp = {
    PhimTruyen: {id: "Phim Truyện", name: "Phim Truyện"},
    GiaiTri: {id: "Giải Trí", name: "Giải Trí"},
    ThieuNhi:{id: "Thiếu Nhi", name: "Thiếu Nhi"},
}

const searchStatus = {
    Bat: {id: 1, name: "Đang bật"},
    Tat: {id: 0, name: "Đang ẩn"}
}

const showStatusSeason = (value) => {
    let option = '';
    switch(value) {
        case 0:
            option='Không hiển thị';
            break;
        case 1:
            option='Hiển thị';
            break;
        default:
            break;
    }    
    return option
}

const showSystemOTT = (value) => {
    let option = '';
    switch(value) {
        case 0:
            option='Box';
            break;
        case 1:
            option='App + Box';
            break;
        default:
            option='App';
            break;
    }    
    return option
}

const searchShow = (value) => {
    let option = '';
    switch(value) {
        case 0:
            option='Đang ẩn';
            break;
        case 1:
            option='Đang bật';
            break;
        default:
            break;
    }    
    return option
}
/**
 * @description Danh sách loại chương trình
 */
const appTypeLocal = (value) => {
    let dataType = '';
    switch(value) {
        case '21':
            dataType='Phim Truyện';
            break;
        case '23':
            dataType='Giải Trí';
            break;
        case '24':
            dataType='Thiếu Nhi';
            break;
        case '21,23':
            dataType='Phim Truyện, Giải Trí';
            break;
        case '21,24':
            dataType='Phim Truyện, Thiếu Nhi';
            break;
        case '23,24':
            dataType='Giải Trí, Thiếu Nhi';
            break;
        case '21,23,24':
            dataType='Phim Truyện, Giải Trí, Thiếu Nhi';
            break;
        default:
            break;
        }
      
        return dataType
}

const checkNoiDung = (item1, item2, item3) => {
    if(item1 === 1 && item2 === 0 && item3 === 0) {
        return "21";
    }
    if(item1 === 1 && item2 === 1 && item3 === 0) {
        return "21,23";
    }
    if(item1 === 1 && item2 === 0 && item3 === 1) {
        return "21,24";
    }
    if(item1 === 1 && item2 === 1 && item3 === 1) {
        return "21,23,24";
    }
    if(item1 === 0 && item2 === 1 && item3 === 0) {
        return "23";
    }
    if(item1 === 0 && item2 === 1 && item3 === 1) {
        return "23,24";
    }
    if(item1 === 0 && item2 === 0 && item3 === 1) {
        return "24";
    }
}


export default {
    searchAppType,
    searchStatus,
    searchShow,
    appTypeLocal,
    checkNoiDung,
    showStatusSeason,
    showSystemOTT,
    searchIsSecondScreen,
    searchOptionApp
}