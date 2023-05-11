import React from "react"
import { CmsFormikSelect } from "../cms-formik"
import { HomeSubscription } from "app/main/product/model/product/homeSubscription"
import CmsRadioGroup from "../CmsRadioGroup"

function CmsFormikProductType({ formik, }) {
    const productType = formik?.values?.ishs === parseInt(ProductType[0].id) ? parseInt(ProductType[0].id) : parseInt(ProductType[1].id)
    return (
        <div className="w-full flex flex-row space-x-8">
            <CmsRadioGroup
                data={Object.values(ProductType).map(x => ({ ...x, id: parseInt(x.id) }))}
                value={productType}
                label="Loại sản phẩm"
                name="ishs"
            />
            {productType === parseInt(ProductType[1].id) &&
                <CmsFormikSelect
                    data={Object.values(HomeSubscription).filter(x => x.id !== HomeSubscription[0].id)}
                    formik={formik}
                    name='ishs'
                />}
        </div>
    )
}
export default REact.memo(CmsFormikProductType)
