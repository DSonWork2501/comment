const cycleBroadCast = {
    Thu2:    { id: '2', name: 'Thứ 2' },
    Thu3:    { id: '3', name: 'Thứ 3' },
    Thu4:    { id: '4', name: 'Thứ 4' },
    Thu5:    { id: '5', name: 'Thứ 5' },
    Thu6:    { id: '6', name: 'Thứ 6' },
    Thu7:    { id: '7', name: 'Thứ 7' },
    ChuNhat: { id: 'CN', name: 'Chủ nhật' }
}

/**
 * @description Danh sách loại phim bộ
 */
const typeOfSeriesMovie = {
    PhimBoUpdate: {
        id: 1,
        name: "Phim bộ update",
        cycleBroadCast: cycleBroadCast

    },
    PhimBoDuTap: {
        id: 0,
        name: "Phim bộ đủ tập",
        cycleBroadCast: null
    },
}

/**
 * @description Loại phim
 */
const typeFilm = {
    PhimLe: {
        id: -1,
        name: "Phim lẻ",
        typeOfSeriesMovie: null
    },
    PhimBoVOD: {
        id: 19,
        name: "Phim bộ",
        typeOfSeriesMovie: typeOfSeriesMovie
    },
    PhimBoTVOD: {
        id: 91,
        name: "Phim bộ",
        typeOfSeriesMovie: typeOfSeriesMovie
    },
    PhimSeriesVOD: {
        id: 80,
        name: "Phim series",
        typeOfSeriesMovie: null
    },
    PhimSeriesTVOD: {
        id: 180,
        name: "Phim series",
        typeOfSeriesMovie: null
    }
}

export default typeFilm