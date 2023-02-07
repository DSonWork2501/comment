/**
 * @description Loại Filter
 */
 const FilterType = {
    basic: { id: 1, name: "Lọc cơ bản", icon: "filter_list" },
    advance: { id: 2, name: "Lọc nâng cao", icon: "filter_alt" }
}

const FilterBasicType = {
    FilterId: { id: 1, name: "Tìm Theo Id", icon: "subdirectory_arrow_right" },
    FilterName: { id: 2, name: "Tìm Theo Tên Chương Trình", icon: "subdirectory_arrow_right" },
}

const FilterBasicSeason = {
    FilterId: { id: 1, name: "Tìm Theo Id", icon: "subdirectory_arrow_right" },
    FilterName: { id: 2, name: "Tìm Theo Tên Chủ Đề", icon: "subdirectory_arrow_right" },
}

const FilterBasicCustomer = {
    FilterContract: { id: 1, name: "Số hợp đồng", icon: "subdirectory_arrow_right" },
    FilterMAC: { id: 2, name: "MAC", icon: "subdirectory_arrow_right" },
    FilterName: { id: 3, name: "Tên", icon: "subdirectory_arrow_right" },
    FilterAddress: { id: 4, name: "Địa chỉ", icon: "subdirectory_arrow_right" },
    FilterPhone: { id: 5, name: "Số điện thoại", icon: "subdirectory_arrow_right" },
    FilterEmail: { id: 6, name: "Email", icon: "subdirectory_arrow_right" },
    FilterUserID: { id: 7, name: "UserID", icon: "subdirectory_arrow_right" },
}

const FilterBasicSeasonDetail = {
    FilterSeason: { id: 1, name: "Tìm Theo Tên Chủ Đề", icon: "subdirectory_arrow_right" },
    FilterId: { id: 2, name: "Tìm Theo Id", icon: "subdirectory_arrow_right" },
    FilterName: { id: 3, name: "Tìm Theo Tên Chương Trình", icon: "subdirectory_arrow_right" },
}

const FilterBasicManagePerson = {
    FilterId: { id: 1, name: "Tìm Theo Id", icon: "subdirectory_arrow_right" },
    FilterName: { id: 2, name: "Tìm Theo Tên Đạo Diễn - Diễn Viên", icon: "subdirectory_arrow_right" },
}

const FilterBasicChannel = {
    FilterId: { id: 1, name: "Tìm Theo Id", icon: "subdirectory_arrow_right" },
    FilterName: { id: 2, name: "Tìm Theo Kênh", icon: "subdirectory_arrow_right" },
}

const FilterBasicLicense = {
    FilterContract: { id: 1, name: "Tìm Theo Hợp Đồng", icon: "subdirectory_arrow_right" },
}

export default {
    FilterType,
    FilterBasicType,
    FilterBasicSeason,
    FilterBasicCustomer,
    FilterBasicSeasonDetail,
    FilterBasicManagePerson,
    FilterBasicChannel,
    FilterBasicLicense
}
