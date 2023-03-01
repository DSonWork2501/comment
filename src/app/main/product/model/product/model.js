export const initData = (data) => {
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
        "status": 0,
        "detail": []
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
        "uniqueid": "17012023.1",
        "lotid": null,
        "colorid": 1,
        "sizeid": 1,
        "volume": 1,
        "weight": 100000,
        "height": 150,
        "model": "",
        "maketime": null,
        "expiretime": null,
        "status": 0,
        "code": "",
        "color": "N/A",
        "sizename": "N/A",
        "price": 0,
        "retailprice": 0,
        "wholesaleprice": 0
    }
}

export const initDetailModel = (data) => {
    if (data) {
        return {
            "parentid": data.parentid || null,
            "name": data.name || "",
            "type": data.type || "stack",
            "active": data.active || 1,
            "capacity": data.capacity || 0,
            "heightlimit": data.heightlimit || 0,
            "slots": data.slots || []
        }
    }
    return {
        "parentid": null,
        "name": "",
        "type": "stack",
        "active": 1,
        "capacity": 0,
        "heightlimit": 0,
        "slots": []
    }
}
export const initDetailModelSlot = (data) => {
    if (data) {
        return {
            "parentid": data.parentid || null,
            "name": data.name || '',
            "type": data.type || 'slot',
            "active": data.active || 1,
            "capacity": data.capacity || 0,
            "heightlimit": data.heightlimit || 0
        }
    }
    return {
        "parentid": null,
        "name": "",
        "type": "slot",
        "active": 1,
        "capacity": 0,
        "heightlimit": 0
    }
}