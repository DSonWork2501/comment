/**
 * @description Danh sách loại chương trình
 */
const appType = {
    PhimBo:     { id: 12, name: 'Phim Bộ',      localType: 1, isPartner: false, excelIndex: 27},
    PhimLe:     { id: 13, name: 'Phim Lẻ',      localType: 1, isPartner: false, excelIndex: 27},
    PhimTruyen: { id: 1, name: 'Phim truyện',   localType: 1, isPartner: false, excelIndex: 27},
    ThieuNhi:   { id: 2, name: 'Thiếu nhi',     localType: 9, isPartner: false, excelIndex: 27},
    GiaiTri:    { id: 3, name: 'Giải trí',      localType: 9, isPartner: false, excelIndex: 27},
    Anime:      { id: 14, name: 'Anime',        localType: 1, isPartner: false, excelIndex: 27},
    Danet:      { id: 4, name: 'Danet',         localType: { FREE: 19, SVOD: 20, TVOD: 21 }, isPartner: true, excelIndex: 24 },
    FilmPlus:   { id: 5, name: 'Film +',        localType: { SVOD: 22, TVOD: 23, AVOD: 24 }, isPartner: true, excelIndex: 30 },
    GoiDacSac:  { id: 16, name: 'Gói đặc sắc',  localType: 1, isPartner: false, excelIndex: 0 },
    HBO:        { id: 15, name: 'HBO',          localType: 1, isPartner: false, excelIndex: 0 },
    AmNhac:     { id: 17, name: 'Âm Nhạc',      localType: 1, isPartner: false, excelIndex: 0 },
}

export default appType;