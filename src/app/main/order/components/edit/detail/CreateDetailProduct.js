import { useFormik } from "formik"
import React from "react"
import ProductSlotSKUItem from "./ProductSlotItem"
import { keyStore } from "app/main/order/common"
import { InitProductOrder } from "app/main/order/model/modal"
import CmsAccordion from "@widgets/components/CmsAccordion"

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
        <CmsAccordion title={"Click để sổ chọn"}>
            <ProductSlotSKUItem formik={formik_item} keyStore={keyStore} HandleAddData={HandleAddData}/>
        </CmsAccordion>
    )
}