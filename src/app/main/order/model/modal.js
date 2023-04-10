export const InitOrderModal = ({entity, customerid}) => {
    if (entity) {
        return {
            ...entity,
            "productorder": entity?.productorder?.map(x => (
                { ...InitProductOrder(x) }
            ))
        }
    }
    return {
        "id": 0,
        "depotid": 0,
        "type": "",
        "customerid": "",
        "customername": "",
        "customermoblie": "",
        "customeremail": "",
        "customeraddress": "",
        "customercity": "",
        "customerdistrict": "",
        "customerward": "",
        "moneytotal": null,
        "moneydiscount": 0,
        "moneytransfer": 0,
        "moneytransferaccount": null,
        "moneydeposit": 0,
        "moneydepositaccount": null,
        "paymentmethod": null,
        "paymentcode": null,
        "paymentgateway": null,
        "carrierid": 0,
        "carrierserviceid": 0,
        "customershipfee": 0,
        "deliverydate": null,
        "status": 0,
        "description": null,
        "privatedescription": "",
        "createdate": "",
        "couponcode": null,
        "allowtest": 0,
        "autosend": 0,
        "sendcarriertype": 0,
        "usedpoints": 0,
        "discount": 0,
        "ref": null,
        "bonus": 0,
        "combo": 0,
        "parentid": 0,
        "modifydate": "",
        "productorder": [
            // InitProductOrder()
        ]
    }
}
export const InitProductOrder = (entity) => {
    if (entity) {
        var model = ''
        if (entity?.model) {
            try {
                model = JSON.parse(entity?.model)
            } catch (error) {
                model = ""
            }
        }
        return {
            ...entity,
            model
        }
    } else {
        return {
            "id": 0,
            "uniqueid": "",
            "sku": "",
            "name": "",
            "imei_hs": null,
            "image": "",
            "quantity": 0,
            "price": 0,
            "capacity": 0,
            "model": ""
        }
    }
}