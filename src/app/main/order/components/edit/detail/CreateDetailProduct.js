import { useFormik } from "formik"
import React from "react"
import ProductSlotSKUItem from "./ProductSlotItem"
import { keyStore } from "app/main/order/common"
import { InitProductOrder } from "app/main/order/model/modal"
import CmsAccordion from "@widgets/components/CmsAccordion"
import { CmsAlert } from "@widgets/components"

export default function CreateDetailProduct({ formik }) {
    const formik_item = useFormik({
        initialValues: InitProductOrder(),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })

    const HandleAddData = ({quantity, item}) => {
        if (!quantity || quantity === 0) {
            CmsAlert.fire({ heightAuto: false, text: 'Vui lòng nhập số lượng sản phẩm !', icon: 'error' })
        } else {
            const { productorder } = formik.values
            const itemAdd = {...formik_item.values, quantity: quantity, uniqueid: item.uniqueid, price: item.price}
            formik.setFieldValue('productorder', [...productorder, itemAdd])
        }
    }
    console.log('formik_item', formik_item)
    return (
        <CmsAccordion title={"Click để sổ chọn"}>
            <ProductSlotSKUItem formik={formik_item} keyStore={keyStore} HandleAddData={HandleAddData} />
        </CmsAccordion>
    )
}