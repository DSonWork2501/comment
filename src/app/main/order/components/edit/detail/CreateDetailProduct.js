import { useFormik } from "formik"
import React from "react"
import ProductSlotSKUItem from "./ProductSlotItem"
import { keyStore } from "app/main/order/common"
import { InitProductOrder } from "app/main/order/model/modal"
import CmsAccordion from "@widgets/components/CmsAccordion"
import { CmsAlert } from "@widgets/components"

export default function CreateDetailProduct({formik}) {
    const formik_item = useFormik({
        initialValues: InitProductOrder(),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })

    const HandleAddData = () => {
        if(!formik_item?.values?.uniqueid || !formik_item?.values?.sku){
            CmsAlert.fire({heightAuto: false, text: 'Sản phẩm, id sản phẩm không được để trống !', icon: 'error'})
        }
        else if(!formik_item?.values?.quantity || formik_item?.values?.quantity ===0){
            CmsAlert.fire({heightAuto: false, text: 'Vui lòng nhập số lượng sản phẩm !', icon: 'error'})
        }else{
            const {productorder} = formik.values
            formik.setFieldValue('productorder', [...productorder, formik_item.values])
        }
    }

    return (
        <CmsAccordion title={"Click để sổ chọn"}>
            <ProductSlotSKUItem formik={formik_item} keyStore={keyStore} HandleAddData={HandleAddData}/>
        </CmsAccordion>
    )
}