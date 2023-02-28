import { CmsBoxLine, CmsFormikTextField } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"

function RightSideContent({ data, type }) {
    const formik = useFormik({
        initialValues: data,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })
    return (
        <CmsBoxLine label={'Thông tin chi tiết'}>
            <div className="w-full space-y-8">
                <CmsFormikTextField size="small" name="name" label="Tên" formik={formik}/>
                <CmsFormikTextField isNumberFormat={true} size="small" name="capacity" label="capacity" formik={formik}/>
                <CmsFormikTextField isNumberFormat={true} size="small" name="heightlimit" label="height limit" formik={formik}/>
            </div>
        </CmsBoxLine>
    )
}
export default RightSideContent