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
        "detail": [],
        "ishs": 0
    }
}
export const initProduct = (data) => {
    if (data) {
        return {
            "sku": data.sku,
            "barcode": data.barcode,
            "name": data.name,
            "shortname": data.shortname,
            "brand": data.brand,
            "description": data.description,
            "unit": data.unit,
            "classify": data.classify,
            "certification": data.certification,
            "suggest": data.suggest,
            "note": data.note,
            "image": data.image,
            "images": JSON.stringify(data.images),
            "isnew": data.isnew,
            "ishot": data.ishot,
            "ishome": data.ishome,
            "isfastsale": data.isfastsale,
            "isfreeship": data.isfreeship,
            "status": data.status,
            "ishs": data.ishs || 0
        }
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
        "ishs": 0
    }
}

export const initDetail = (data) => {
    if (data) {
        return data
    }
    return {
        "uniqueid": null,
        "lotid": null,
        "colorid": 1,
        "sizeid": 1,
        "volume": 1,
        "weight": 0,
        "height": 0,
        "model": "",
        "maketime": null,
        "expiretime": null,
        "status": 0,
        "code": "",
        "color": "N/A",
        "sizename": "N/A",
        "price": 0,
        "retailprice": 0,
        "wholesaleprice": 0,
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
            "heightlimit": data.heightlimit || 0,
            item: {
                "uniqueid": "",
                "name": "",
                "img": "",
                "type": "wine"
            }
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