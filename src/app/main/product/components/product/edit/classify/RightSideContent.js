import { CmsBoxLine, CmsFormikTextField } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"

function RightSideContent({ data }) {
    const formik = useFormik({
        initialValues: data,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })
    return (
        <CmsBoxLine label={'Thông tin chi tiết'}>
            <div className="w-full space-y-8">
                <CmsFormikTextField name="name" label="Tên" formik={formik}/>
            </div>
        </CmsBoxLine>
    )
}
export default RightSideContent