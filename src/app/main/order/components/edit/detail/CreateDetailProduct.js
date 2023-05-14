import { useFormik } from "formik"
import React from "react"
import ProductSlotSKUItem from "./ProductSlotItem"
import { keyStore } from "app/main/order/common"
import { InitProductOrder } from "app/main/order/model/modal"
import { CmsAlert } from "@widgets/components"

export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

export default function CreateDetailProduct({ formik }) {
    const formik_item = useFormik({
        initialValues: InitProductOrder(),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })

    const HandleAddData = ({ quantity, item }) => {
        if (!quantity || quantity === 0) {
            CmsAlert.fire({ heightAuto: false, text: 'Vui lòng nhập số lượng sản phẩm !', icon: 'error' })
        } else {
            const { productorder } = formik.values
            var itemAdd = {
                ...formik_item.values,
                quantity: quantity,
                uniqueid: item.uniqueid,
                sku: item.sku
            }
            if (item.price) itemAdd = { ...itemAdd, price: item.price }
            if (item.name) itemAdd = { ...itemAdd, name: item.name }
            if (item.img) itemAdd = { ...itemAdd, image: `${baseurl}${item.img}`, img: item.img }
            console.log('itemAdd', itemAdd)
            var array = null
            if (productorder.filter(x => x.uniqueid === itemAdd.uniqueid).length > 0) {
                array = [...productorder].map(x => ({ ...x, quantity: x.uniqueid === itemAdd.uniqueid ? x.quantity + itemAdd.quantity : x.quantity }))
            } else {
                array = [...productorder, itemAdd]
            }
            formik.setFieldValue('productorder', array)
        }
    }
    // console.log('formik_item', formik_item)
    return (
        <ProductSlotSKUItem formik_entity={formik} formik={formik_item} keyStore={keyStore} HandleAddData={HandleAddData} />
    )
}