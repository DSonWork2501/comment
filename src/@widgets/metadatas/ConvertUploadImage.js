// author: viettq20
export const convertTypeImage = TypeImage => {
    if (TypeImage !== "image/jpeg" && TypeImage !== "image/png" && TypeImage !== "image/jpg") {
        return "Error";
    }
}
//add type channel - format .png
export const convertTypeImageChannel = (TypeImage, option = "") => {
    if (option === "Logo Kênh" && TypeImage !== "image/png") {
        return "Error";
    }
    if (option === "Poster Kênh" && TypeImage !== "image/jpeg" && TypeImage !== "image/jpg") {
        return "Error";
    }
}

export const convertTypeImageEventSport = TypeImage => {
    if (TypeImage !== "image/jpeg" && TypeImage !== "image/jpg") {
        return "Error";
    }
}

export const convertSizeImage = (SizeImage, limitSize) => {
    // kích thước tối đa 1 MB = 1048576 Byte
    if (SizeImage === 0) {
        return "Error";
    }
    else if (SizeImage > limitSize) {
        return "Error";
    }
}

export const convertWidthHeightImage = (option, type, width, height) => {
    switch (option) {
        // Upload VOD
        case 'Poster Nhỏ' || 'Poster Nhỏ 4K':
            if (type === 'VOD' || type === 'TVOD' || type === 'SVOD') {
                if (width !== 140 && height !== 200) {
                    return "Error";
                }
            }
            else if (type === 'BHD_TVOD' || type === 'BHD_SVOD' || type === 'BHD_VOD' || type === 'BHD') {
                if (width !== 174 && height !== 259) {
                    return "Error";
                }
            }
            else {
                if (width !== 134 && height !== 192) {
                    return "Error";
                }
            }
            break;

        case 'Poster Lớn' || 'Poster Lớn 4K':
            if (width !== 915 && height !== 1335) {
                return "Error";
            }
            break;

        case 'Banner':
            if (type === 'VOD' || type === 'TVOD' || type === 'SVOD') {
                if (width !== 1280 && height !== 720) {
                    return "Error";
                }
            }
            else if (type === 'BHD_TVOD' || type === 'BHD_SVOD' || type === 'BHD_VOD' || type === 'BHD') {
                if (width !== 1024 && height !== 352) {
                    return "Error";
                }
            }
            break;

        case 'Slider':
            if (width !== 1440 && height !== 1728) {
                return "Error";
            }
            break;

        case 'Slider Landscape OTT & IPTV': case 'Background Header IPTV': case 'Background hightlight':
            if (width !== 1920 && height !== 1080) {
                return "Error";
            }
            break;

        case 'Title Header OTT & IPTV':
            if (width !== 514 && height !== 80) {
                return "Error";
            }
            break;

        case 'Poster Đứng OTT & IPTV': case 'Poster Đứng Mobile OTT': case 'Poster đứng mobile':
            if (width !== 1200 && height !== 1800) {
                return "Error";
            }
            break;

        // Upload phim gói
        case 'Phim có phí': case 'Slider Remote': case 'Poster Trailer':
            if (width !== 1920 && height !== 1080) {
                return "Error";
            }
            break;
        case 'Phim Gói':
            if ((type === 'BHD_TVOD' || type === 'BHD_SVOD' || type === 'BHD_VOD' || type === 'BHD') && width !== 300 && height !== 450) {
                return "Error";
            }
            break;
        case 'Phim Có Phí':
            if ((type === 'BHD_TVOD' || type === 'BHD_SVOD' || type === 'BHD_VOD' || type === 'BHD') && width !== 300 && height !== 450) {
                return "Error";
            }
            break;
        case 'Phim Miễn Phí':
            if ((type === 'BHD_TVOD' || type === 'BHD_SVOD' || type === 'BHD_VOD' || type === 'BHD') && width !== 300 && height !== 450) {
                return "Error";
            }
            break;

        // Event
        case 'Poster': case 'Header Box': case 'Slider Event':
            if (width !== 1920 && height !== 1080) {
                return "Error";
            }
            break;
        case 'Banner Event':
            if (width !== 1024 && height !== 340) {
                return "Error";
            }
            break;
        // Sport
        case 'Image Header': case 'Image Background': case 'Slider Sport OTT & IPTV': case 'Poster Ngang Không Title':
            if (width !== 1920 && height !== 1080) {
                return "Error";
            }
            break;
        case 'Header Foxy': case 'Header LandScape Foxy':
            if (width !== 1280 && height !== 720) {
                return "Error";
            }
            break;
        case 'Foxy':
            if (width !== 1080 && height !== 1296) {
                return "Error";
            }
            break;
        case 'Hình diễn viên':
            if (width !== height) {
                return "Error";
            }
            break;
        case 'Poster Ngang':
            if (width / height !== 16 / 9) {
                return "Error";
            }
            break;
        //Channel
        case 'Logo Kênh':
            if (width !== 270 && height !== 159){
                return "Error";
            }
            break;
        case 'Poster Kênh':
            if (width !== 410 && height !== 230){
                return "Error";
            }
            break;
        default:
            break;
    }
}