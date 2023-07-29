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
        "ishs": 0,
        "properties": []
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
            "images": data.images ? JSON.stringify(data.images) : "[]",
            "isnew": data.isnew,
            "ishot": data.ishot,
            "ishome": data.ishome,
            "isfastsale": data.isfastsale,
            "isfreeship": data.isfreeship,
            "status": data.status,
            "ishs": data.ishs || 0,
            unitid: data.unitid || null,
            classifyid: data.classifyid || null,
            brandid: data.brandid || null,
            madeinid: data.madeinid || null,
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
        unitid: null,
        brandid: null,
        "classify": "",
        classifyid: null,
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
        "ishs": 0,
        madeinid: null
    }
}

export const initDetail = (data) => {
    if (data) {
        return data
    }
    return {
        "uniqueid": null,
        "subname": null,
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
        "capacity": 0
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
        let ob = {
            "parentid": data.parentid || null,
            "name": data.name || '',
            "type": data.type || 'slot',
            "active": data.active || 1,
            "capacity": data.capacity || 1,
            "heightlimit": data.heightlimit || 0,
        }
        if (data?.item)
            ob.item = {
                "uniqueid": data?.item?.uniqueid || "",
                "name": data?.item?.name || "",
                "img": data?.item?.img || "",
                "type": "wine",
                "sku": data?.item?.sku || "",
                "temporaryprice": data?.item?.price || 0
            }
        return ob
    }
    return {
        "parentid": null,
        "name": "",
        "type": "slot",
        "active": 1,
        "capacity": 1,
        "heightlimit": 0,
    }
}