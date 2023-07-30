import { groupBy, map } from "lodash";

export const returnListProductByOrderID = (entities, orderID) => {
    let data = [], table = [];
    if (entities?.data?.length) {
        entities.data.forEach(element => {
            element.productorder.forEach(e => {
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
                            price: 0,
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
                numberPR: products.length,
            })),
            ...map(groupedData, (products, sku) => ({
                ...products[0],
                numberPR: products.length,
            }))
        ];
    }

    return []
}

export const returnTotalAllProduct=(listProductTemp)=>{
    let total = 0, money = 0;
    if (listProductTemp?.length)
        listProductTemp.forEach(element => {
            total = total + element.numberPR;
            money = money + ((element.price || 0) * element.numberPR);
        });
    return { total, money }
}