const ListTab = {
    KhoTrancode: { id: 1, name: "Kho trancode", icon: "analytics" },
    SourceHoanThanh: { id: 2, name: "Source hoàn thành", icon: "amp_stories" },
    TienTrinh: { id: 3, name: "Tiến trình", icon: "apps" },
    Origin: { id: 4, name: "Origin", icon: "assignment" },
    Playlist: { id: 5, name: "Playlist", icon: "assessment" },
    Thumbnail: { id: 6, name: "Thumbnail", icon: "assistant" },
    History: { id: 7, name: "Lịch sử origin", icon: "archive" }
}

const DataTrueOrFalse = {
    True:   { id: 1, name: 'Có' },
    False:  { id: 0, name: 'Không' }
}

const ListTabMenuOnApp = [
    { id: 1, name: "Kho trancode", icon: "analytics" },
    { id: 2, name: "Source hoàn thành", icon: "amp_stories" },
    { id: 3, name: "Tiến trình", icon: "apps" },
    { id: 4, name: "Origin", icon: "assignment" },
    { id: 5, name: "Playlist", icon: "assessment" },
    { id: 6, name: "Thumbnail", icon: "assistant" },
    { id: 7, name: "Lịch sử origin", icon: "archive" }
]

const ListTabMenuOnBox = [
    { id: 1, name: "Kho trancode", icon: "analytics" },
    { id: 2, name: "Source hoàn thành", icon: "amp_stories" },
    { id: 3, name: "Tiến trình", icon: "apps" },
    { id: 5, name: "Playlist", icon: "assessment" },
    { id: 6, name: "Thumbnail", icon: "assistant" },
    { id: 7, name: "Lịch sử origin", icon: "archive" }
]

const ListProfile = [
    { id: 1, name: '240p' },
    { id: 2, name: '360p' },
    { id: 3, name: '480p' },
    { id: 4, name: '720p' },
    { id: 5, name: '1080p' },
    { id: 6, name: '1440p' },
    { id: 7, name: '2k' }
]

const TrancodeOnSystem = {
    App: { id: 0, name: "App" },
    Box: { id: 1, name: "Box" }
}

const ListServer = {
    Auto: { id: 0, name: "Auto" },
    Server1: { id: 1, name: "Server 1" },
    Server2: { id: 2, name: "Server 2" }
}

const ListCategory = {
    PhimTruyen: { name: "Phim truyện", id:'vod' },
    GiaiTri: {name: "Giải trí", id:'relax' },
    ThieuNhi: {  name: "Thiếu nhi", id:'child' },
    TheThao: {  name: "Thể thao", id:'sport' },
    AmNhac: { name: "Âm nhạc", id:'music' },
    Kara: { name: "Karativi", id:'kara' }
}

const ListCateProgress = {
    TatCa: { id: 0, name: "Tất cả" },
    AmNhac: { id: 4, name: "Âm nhạc" },
}

const ListProgramOrPerson = {
    NguoiTao: { id: 0, name: "Người Tạo" },
    NhapSource: { id: 1, name: "Nhập Source" },
}

const ListCateStatus= [
    { id: 0, name: 'Job đã vào queue' },
    { id: 1, name: 'Job bắt đầu xử lý trancode' },
    { id: 2, name: 'Job trancode thành công' },
    { id: 3, name: 'Job trancode thất bại' },
    { id: 4, name: 'Job tạo thumbnail thành công' },
    { id: 5, name: 'Job tạo thumbnail thất bại' },
]

const ListCreateBroadpeak = (str, title, drmInfo, APIStore, path) => {
    // phim lẻ
    // Thiếu Nhi - Giải Trí (DRM)
    if (str === 1)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><tags>ism</tags><ProfileName>MP4S</ProfileName><DRMEnable>true</DRMEnable><DRMType>castlabs</DRMType><DRMInfo>${title}${drmInfo}</DRMInfo><Source>${APIStore}/${path}/${title}</Source></Content>`;
    }
    // Phim Truyện - Thể Thao v...v (DRM)
    else if (str === 2)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><tags>ism</tags><ProfileName>MP4S</ProfileName><DRMEnable>true</DRMEnable><DRMType>castlabs</DRMType><DRMInfo>${title}${drmInfo}</DRMInfo><Source>${APIStore}/${path}/${title}</Source></Content>`;
    }
    // Thiếu Nhi - Giải Trí
    else if (str === 3)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><Tags>ism</Tags><ProfileName>MP4S</ProfileName><Source>${APIStore}/${path}/${title}</Source></Content>`;
    }
    // Phim Truyện - Thể Thao v...v
    else if (str === 4)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><Tags>ism</Tags><ProfileName>MP4S</ProfileName><Source>${APIStore}/${path}/${title}</Source></Content>`;
    }

    // phim bộ
    // drm - related
    if (str === 5)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><tags>ism</tags><ProfileName>MP4S</ProfileName><DRMEnable>true</DRMEnable><DRMType>castlabs</DRMType><DRMInfo>${title}${drmInfo}</DRMInfo><Source>${APIStore}/${path}/related/${title}</Source></Content>`;
    }
    // drm - not related
    else if (str === 6)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><tags>ism</tags><ProfileName>MP4S</ProfileName><DRMEnable>true</DRMEnable><DRMType>castlabs</DRMType><DRMInfo>${title}${drmInfo}</DRMInfo><Source>${APIStore}/${path}/${title}</Source></Content>`;
    }
    // not drm - related
    else if (str === 7)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><Tags>ism</Tags><ProfileName>MP4S</ProfileName><Source>${APIStore}/${path}/related/${title}</Source></Content>`;
    }
    // not drm - not related
    else if (str === 8)
    {
        return `<?xml version='1.0' encoding='utf-8' ?><Content xmlns='urn:broadpeak:1.0'><Tags>ism</Tags><ProfileName>MP4S</ProfileName><Source>${APIStore}/${path}/${title}</Source></Content>`;
    }
}

export default {
    ListTab,
    DataTrueOrFalse,
    ListTabMenuOnApp,
    ListTabMenuOnBox,
    ListProfile,
    TrancodeOnSystem,
    ListServer,
    ListCategory,
    ListCateProgress,
    ListCateStatus,
    ListCreateBroadpeak,
    ListProgramOrPerson
}