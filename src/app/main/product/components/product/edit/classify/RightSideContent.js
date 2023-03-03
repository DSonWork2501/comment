import { CmsBoxLine, CmsFormikTextField } from "@widgets/components"
import React from "react"

function RightSideContent({ formik, prefix }) {
    
    return (
        <CmsBoxLine label={'Thông tin chi tiết'}>
            <div className="w-full space-y-16">
                <CmsFormikTextField size="small" name={`${prefix}name`} label="Tên" formik={formik}/>
                <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}capacity`} label="capacity" formik={formik}/>
                <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}heightlimit`} label="height limit" formik={formik}/>
            </div>
        </CmsBoxLine>
    )
}
export default RightSideContent