import React from 'react'
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
    { id: 1, name: "Công nợ khách hàng", link: "/product-meta/meta/1", icon: "star_rate" },
    {
        id: 2, name: "Hạn thanh toán", link: "/product-meta/meta/2", icon: "star_rate", otherComp: <div  style={{
            position: 'relative',
            top: 8,
            padding: '0 5px',
            borderRadius: 5,
            color: 'white',
            background:'gray'
        }}>10</div>
    },
    {
        id: 3, name: "Quá hạn", link: "/product-meta/meta/3", icon: "star_rate", otherComp: <div  style={{
            position: 'relative',
            top: 8,
            padding: '0 5px',
            borderRadius: 5,
            color: 'white',
            background:'gray'
        }}>10</div>
    },
    {
        id: 4, name: "Hạn hôm nay", link: "/product-meta/meta/4", icon: "star_rate", otherComp: <div  style={{
            position: 'relative',
            top: 8,
            padding: '0 5px',
            borderRadius: 5,
            color: 'white',
            background:'gray'
        }}>10</div>
    },
    {
        id: 5, name: "Hạn 7 ngày tới", link: "/product-meta/meta/5", icon: "star_rate", otherComp: <div  style={{
            position: 'relative',
            top: 8,
            padding: '0 5px',
            borderRadius: 5,
            color: 'white',
            background:'gray'
        }}>10</div>
    },
    {
        id: 6, name: "Hạn trên 7 ngày", link: "/product-meta/meta/5", icon: "star_rate", otherComp: <div  style={{
            position: 'relative',
            top: 8,
            padding: '0 5px',
            borderRadius: 5,
            color: 'white',
            background:'gray'
        }}>10</div>
    },
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