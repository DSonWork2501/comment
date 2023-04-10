import { CmsDialog, CmsFormikTextField } from "@widgets/components"
import ProductSlotSKUItem from "app/main/product/components/product/edit/classify/rightSide/ProductSlotItem"
import { useFormik } from "formik"
import React from "react"
import * as Yup from 'yup'
import {keyStore} from 'app/main/order/common'
 
 export default function EditDetailProductContent({data, open, HandleClose, HandleSave, prefix, formik}) {
    
    const handleSaveData = (values) => {
        // formik.setFieldValue(formik_item)
        console.log('values', values)
    }

    const formik_item = useFormik({
        initialValues: data,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        // validate: () => { Object.values(formik.errors)?.length > 0 && setTabValue(TabType.co_ban.id) },
        validationSchema: Yup.object({
            // name: Yup.string().typeError("Tên sản phẩm không được bỏ trống !").required("Tên sản phẩm không được bỏ trống !"),
            // sku: Yup.string().typeError("SKU không được bỏ trống !").required("SKU không được bỏ trống !"),
        })
    })
    console.log()
    return (
        <CmsDialog 
            title={`Thêm mới sản phẩm`}
            open={open}
            handleClose={HandleClose}
            HandleSave={formik_item.handleSubmit}
        >
        <div className="w-full space-y-16">
            <CmsFormikTextField size="small" formik={formik_item} name="capacity" label="Sức chứa"/>
            <CmsFormikTextField size="small" formik={formik_item} name="quantity" label="Số lượng"/>
            <ProductSlotSKUItem formik={formik_item} prefix={prefix} keyStore={keyStore}/>
        </div>
        </CmsDialog>
    )
 }