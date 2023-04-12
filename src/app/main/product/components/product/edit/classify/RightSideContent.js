import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsBoxLine, CmsFormikTextField } from "@widgets/components"
import { get } from "lodash"
import React, { } from "react"
import ProductSlotSKUItem from "./rightSide/ProductSlotItem"
import { keyStore } from "app/main/product/common"

function RightSideContent({ formik, prefix }) {
    return (
        <div className="w-full space-y-8">
            <CmsBoxLine label={'Thông tin chi tiết'} className="p-16">
                <div className="w-full space-y-16">
                    <CmsFormikTextField size="small" name={`${prefix}.name`} label="Tên" formik={formik} />
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}.capacity`} label="capacity" formik={formik} />
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}.heightlimit`} label="height limit" formik={formik} />
                    {get(formik?.values, `${prefix}.type`) === 'slot' &&
                        <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }} className="w-full">
                            <CmsBoxLine label="Lựa chọn sản phẩm">
                                <ProductSlotSKUItem formik={formik} prefix={prefix} keyStore={keyStore} />
                            </CmsBoxLine>
                        </FuseAnimateGroup>}
                </div>
            </CmsBoxLine>

        </div>
    )
}
export default RightSideContent