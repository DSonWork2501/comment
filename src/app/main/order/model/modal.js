export const InitOrderModal = ({ entity, customerid }) => {
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
        "status": 1,
        "description": null,
        "privatedescription": "",
        "createdate": "",
        "couponcode": null,
        "allowtest": 0,
        "autosend": 0,
        "sendcarriertype": 1,
        "usedpoints": 0,
        "discount": 0,
        "ref": '',
        "bonus": 0,
        "combo": 0,
        "parentid": 0,
        "modifydate": "",
        "productorder": [
            // InitProductOrder()
        ],
        "cusid": "",
        "orderid": 0,
        "contractid": 0,
        "expire": 0,
        "signature": ""
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
export const customModal = (item) => {
    return {
        "order": {
            "depotid": item.depotid,
            "type": item.type ? item.type + '' : '0',
            "customerid": item.customerid,
            "customername": item.customername,
            "customermoblie": item.customermoblie,
            "customeremail": item.customeremail,
            "customeraddress": item.customeraddress,
            "customercity": item.customercity?.name,
            "customerdistrict": item.customerdistrict?.name,
            "customerward": item.customerward?.name,
            "moneytotal": item.moneytotal,
            "moneydiscount": item.moneydiscount,
            "moneytransfer": item.moneytransfer,
            "moneytransferaccount": item.moneytransferaccount,
            "moneydeposit": item.moneydeposit,
            "moneydepositaccount": item.moneydepositaccount,
            "paymentmethod": item.paymentmethod,
            "paymentcode": item.paymentcode,
            "paymentgateway": item.paymentgateway,
            "carrierid": item.carrierid,
            "carrierserviceid": item.carrierserviceid,
            "customershipfee": item.customershipfee,
            "deliverydate": item.deliverydate,
            "status": item.status,
            "description": item.description,
            "privatedescription": item.privatedescription,
            "couponcode": item.couponcode,
            "allowtest": item.allowtest,
            "autosend": item.autosend,
            "sendcarriertype": item.sendcarriertype,
            "usedpoints": item.usedpoints,
            "discount": item.discount,
            "ref": item.ref,
            "bonus": item.bonus,
            "combo": item.combo,
            "parentid": item.parentid
          },
        "contract": {
            "cusid": item.customerid,
            "orderid": item.orderid,
            "contractid": item.contractid,
            "expire": item.expire,
            "signature": item.signature
          },
        "details": item.productorder || []
    }
}