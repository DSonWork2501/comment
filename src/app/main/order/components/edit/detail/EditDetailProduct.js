import { CmsDialog, CmsFormikTextField } from "@widgets/components"
import ProductSlotSKUItem from "app/main/order/components/edit/detail/ProductSlotItem"
import { useFormik } from "formik"
import React from "react"
import * as Yup from 'yup'
import { keyStore } from 'app/main/order/common'

export default function EditDetailProductContent({ data, open, HandleClose, HandleSave, formik, editIndex }) {

    const handleSaveData = (values) => {
        
        const {productorder} = formik.values
        var arr = [...productorder]
        if(editIndex){// cập nhật
            arr.map((x, index)=>(editIndex === index ? { ...values }: x))
        }else{ // tạo mới
            arr = [...productorder, values]
        }
        formik.setFieldValue('productorder',  arr)
        
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

    return (
        <CmsDialog
            title={`Thêm mới sản phẩm`}
            open={open}
            handleClose={HandleClose}
            handleSave={formik_item.handleSubmit}
        >
            <div className="w-full space-y-16">
                {/* <CmsFormikTextField isNumber size="small" formik={formik_item} name="capacity" label="Sức chứa" />
                <CmsFormikTextField isNumber size="small" formik={formik_item} name="quantity" label="Số lượng" /> */}
                <ProductSlotSKUItem formik={formik_item} keyStore={keyStore} />
            </div>
        </CmsDialog>
    )
}