import { useFormik } from "formik"
import React from "react"
import ProductSlotSKUItem from "./ProductSlotItem"
import { keyStore } from "app/main/order/common"
import { InitProductOrder } from "app/main/order/model/modal"

export default function CreateDetailProduct({formik}) {

    const formik_item = useFormik({
        initialValues: InitProductOrder(),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })

    const HandleAddData = () => {
        const {productorder} = formik.values
       
        formik.setFieldValue('productorder', [...productorder, formik_item.values])
    }

    return (
        <ProductSlotSKUItem formik={formik_item} keyStore={keyStore} HandleAddData={HandleAddData}/>
    )
}