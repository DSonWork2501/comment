import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsTextField } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"
import MutipleImagePathLink from "../../common.js/MultipleImagePathLink"

const initData = (data) => {
    if (data) {
        return data
    }
    return {
        "sku": "",
        "barcode": "",
        "name": "",
        "shortname": "",
        "brand": "",
        "description": "",
        "unit": "",
        "classify": "",
        "certification": "",
        "suggest": "",
        "note": "",
        "image": "",
        "images": "",
        "isnew": 0,
        "ishot": 0,
        "ishome": 0,
        "isfastsale": 0,
        "isfreeship": 0,
        "status": 0
    }
}

function BasicInfo({ data }) {

    const formik = useFormik({
        initialValues: initData(data),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        // onSubmit: handleSaveData
    })
    console.log('formik', formik)
    return (
        <FuseAnimateGroup className="flex flex-wrap p-20 overflow-hidden w-full h-full" enter={{ animation: 'transition.slideUpBigIn' }}>
            <div className="w-full space-y-16">
                <CmsTextField size="small" formik={formik} name="name" label="Tên sản phẩm" />
                <CmsTextField size="small" formik={formik} name="shortname" label="Tên ngắn" />
                <CmsTextField size="small" formik={formik} name="barcode" label="Barcode" />
                <CmsTextField size="small" formik={formik} name="sku" label="SKU" />
                <CmsTextField size="small" formik={formik} name="brand" label="brand" />
                <CmsTextField size="small" multiline={true} formik={formik} name="description" label="Mô tả" />
                <CmsTextField size="small" formik={formik} name="unit" label="đơn vị" />
                <CmsTextField size="small" formik={formik} name="classify" label="classify" />
                <CmsTextField size="small" formik={formik} name="certification" label="certification" />
                <CmsTextField size="small" formik={formik} name="suggest" label="Gợi ý" />
                <CmsTextField size="small" formik={formik} name="note" label="Ghi chú" />
                <MutipleImagePathLink />
            </div>
        </FuseAnimateGroup>
    )
}
export default BasicInfo