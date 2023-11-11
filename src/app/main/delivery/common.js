import { groupBy, map } from "lodash";

export const groupProduct = (productorders) => {
    return map(groupBy(productorders, 'sku'), (products, sku) => ({
        ...products[0],
        //price: products.reduce((sum, currentItem) => sum + currentItem.price, 0),
        numberPR: products.length,
    }))
}

export const returnListProductByOrderID = (entities, orderID, name = 'productorder') => {
    let data = [], table = [];
    if (entities?.data?.length) {
        entities.data.forEach(element => {
            element[name].forEach(e => {
                if (parseInt(orderID) === element.id)
                    if (Boolean(element.parentid)) {
                        data.push({
                            sku: e.sku,
                            img: e.image,
                            name: e.name,
                            price: e.price,
                        });
                    } else {
                        JSON.parse(e.model).forEach(el => {
                            el?.slots?.length && el.slots.forEach(elm => {
                                data.push(elm.item);
                            })
                        })
                        table.push({
                            sku: e.sku,
                            img: e.image,
                            name: e.name,
                            price: e?.price || 0,
                            type: 'table'
                        })
                    }
            })
        });
        const groupedData = groupBy(data, 'sku');
        const groupedTable = groupBy(table, 'sku');

        return [
            ...map(groupedTable, (products, sku) => ({
                ...products[0],
                price: products.reduce((sum, currentItem) => sum + currentItem.price, 0),
                numberPR: products.length,
            })),
            ...map(groupedData, (products, sku) => ({
                ...products[0],
                price: products.reduce((sum, currentItem) => sum + currentItem.price, 0),
                numberPR: products.length,
            }))
        ];
    }

    return []
}

export const returnListProductInCabinet = (dataList, orderID, name = 'productorder') => {
    let data = [];

    if (dataList?.length) {
        dataList.forEach(element => {
            element[name] && JSON.parse(element[name])?.length && JSON.parse(element[name]).forEach(e => {
                e?.slots?.length && e.slots.forEach(elm => {
                    data.push(elm.item);
                })

            })
        });
        const groupedData = groupBy(data, 'sku');

        return [
            ...map(groupedData, (products, sku) => ({
                ...products[0],
                price: products.reduce((sum, currentItem) => sum + currentItem.temporaryprice, 0),
                numberPR: products.length,
            }))
        ];
    }

    return []
}

export const returnTotalAllProduct = (listProductTemp) => {
    let total = 0, money = 0;
    if (listProductTemp?.length)
        listProductTemp.forEach(element => {
            total = total + element.numberPR;
            money = money + ((element.price || 0));
        });
    return { total, money }
}