/**
 * @description key store in redux
 */
export const keyStore = "legal"

/**
 * @description key for translate
 */
export const keyI18n = "i18nLegal"

/**
 * @description model update default
 */
const initModel = {
    type: 0,
    menuID: 0,
    movieID: 0,
    movieIDOld: 0,
    topicOld: 0,
    topicNew: 0
}

export const keyStorageColumnsImportExcel = "columns_importexcel_table_event_planning"

/**
 * @description initialize model update
 */
export const modelUpdate = (field = initModel) => {
    return { ...initModel, ...field }
}

export const links = [
    { id: 1, name: "Quản lý thương hiệu", link: "/product-meta/meta/1", icon: "star_rate" },
    { id: 2, name: "Quản lý chứng nhận", link: "/product-meta/meta/2", icon: "star_rate" },
    { id: 3, name: "Quản lý classify", link: "/product-meta/meta/3", icon: "star_rate" },
    { id: 4, name: "Quản lý xuất sứ", link: "/product-meta/meta/4", icon: "star_rate" },
    { id: 5, name: "Quản lý unit", link: "/product-meta/meta/5", icon: "star_rate" },
];

export const metaStatus = [
    {
        id: 0,
        name: 'Ngừng hoạt động'
    },
    {
        id: 1,
        name: "Hoạt động"
    }
];