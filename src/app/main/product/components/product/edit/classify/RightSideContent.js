import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsBoxLine, CmsFormikTextField, CmsTab } from "@widgets/components"
import { get } from "lodash"
import React, { useState } from "react"
import ProductSlotItemComponent from "./rightSide/ProductSlotItem"
import { keyStore } from "app/main/product/common"
import InfoProductDetail from "./rightSide/InfoProductDetail"

const TabType = {
    da_chon: { id: '1', name: 'Sản phẫm đã chọn' },
    danh_sach: { id: '2', name: 'Danh sách sản phẩm' },
}

function RightSideContent({ formik, prefix }) {
    const [tabValue, setTabValue] = useState(TabType.da_chon.id)
    const item = get(formik?.values, `[${prefix}].item`) || null
    // const sku = get(formik?.values, `[${prefix}].item.sku`) ? get(formik?.values, `[${prefix}].item.sku`) : null

    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    return (
        <div className="w-full space-y-16">
            {get(formik?.values, `${prefix}.type`) === 'slot' &&
                <>
                    <CmsTab className="bg-orange-200 border-solid border-1 rounded-6" data={Object.values(TabType)} value={tabValue} onChange={handleChangeTab} />
                    <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }} className="w-full">

                        {tabValue === TabType.da_chon.id && <InfoProductDetail data={item} handleViewList={() => setTabValue(TabType.danh_sach.id)}/>}
                        {tabValue === TabType.danh_sach.id &&
                            <CmsBoxLine label="Lựa chọn sản phẩm">
                                <ProductSlotItemComponent
                                    keyStore={keyStore}
                                    formik={formik}
                                    prefix={prefix}
                                    onChosenView={() => setTabValue(TabType.da_chon.id)}
                                />
                            </CmsBoxLine>
                        }

                    </FuseAnimateGroup>
                </>
            }
            <CmsBoxLine label={'Thông tin chi tiết'} className="p-16">
                <div className="w-full flex flex-row space-x-8">
                    <CmsFormikTextField size="small" name={`${prefix}.name`} label="Tên" formik={formik} />
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}.capacity`} label="dung tích" formik={formik}/>
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}.heightlimit`} label="giới hạn chiều cao" formik={formik} />
                </div>
            </CmsBoxLine>

        </div>
    )
}
export default RightSideContent