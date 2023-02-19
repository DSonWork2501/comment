export const initData = (data) => {
    if (data) {
        return data
    }
    return {
        product: {
            "sku": "",
            "barcode": "",
            "name": "",
            "shortname": "",
            "brand": "",
            "description": "",
            "unit": "",
            "classify": "",
            "certification": "",
            "suggest": "",
            "note": "",
            "image": "",
            "images": [],
            "isnew": 0,
            "ishot": 0,
            "ishome": 0,
            "isfastsale": 0,
            "isfreeship": 0,
            "status": 0
        }, details: [

        ]
    }
}
export const initProduct = (data) => {
    if (data) {
        return data
    }
    return {
        "sku": "",
        "barcode": "",
        "name": "",
        "shortname": "",
        "brand": "",
        "description": "",
        "unit": "",
        "classify": "",
        "certification": "",
        "suggest": "",
        "note": "",
        "image": "",
        "images": [],
        "isnew": 0,
        "ishot": 0,
        "ishome": 0,
        "isfastsale": 0,
        "isfreeship": 0,
        "status": 0
    }
}

export const initDetail = (data) => {
    if (data) {
        return data
    }
    return {
        "uniqueid": "string",
        "sku": "string",
        "lotid": "string",
        "colorid": 0,
        "sizeid": 0,
        "volume": 0,
        "weight": 0,
        "height": 0,
        "model": "string",
        "maketime": "2023-02-19T09:21:10.605Z",
        "expiretime": "2023-02-19T09:21:10.605Z",
        "status": 0
    }
}