import React from "react"
import { ProductType } from "app/main/product/model/product/homeSubscription"
import CmsRadioGroup from "../CmsRadioGroup"
import { useState } from "react"
import { useEffect } from "react"
import CmsSelect from "../CmsSelect"
import clsx from "clsx"

function CmsFormikProductType({ formik, onChangeProductType, onChangeSetHome, otherProps}) {
    const [type, setType] = useState(null)
    const [isHs, setIsHs] = useState(null)
    const value = formik.values.ishs

    useEffect(() => {
        if (value) {
            setType(Object.keys(ProductType[3]?.type).map(x => (parseInt(x))).includes(parseInt(value)) ? ProductType[3].id : ProductType[0].id)
            Object.keys(ProductType[3].type).map(x => (parseInt(x))).includes(parseInt(value)) && setIsHs(parseInt(value))
        }
    }, [value])

    const handleChangeProductType = (value) => {
        setType(value)
        if (value === ProductType[0].id) {
            formik.setFieldValue('ishs', parseInt(value))
        }else{
            formik.setFieldValue('ishs', parseInt(ProductType[3]?.type['2'].id))
        }
        onChangeProductType && onChangeProductType(value === ProductType[0].id ? parseInt(value) : parseInt(ProductType[3]?.type['2'].id))
    }
    const handleSetHome = (value) => {
        formik.setFieldValue('ishs', parseInt(value))
        onChangeSetHome && onChangeSetHome(parseInt(value))
    }

    return (
        <div className={clsx("flex flex-col", otherProps?.divClassName || '')}>
            <CmsRadioGroup
                {...otherProps?.RadioProps}
                onChange={(value) => handleChangeProductType(value)}
                value={type || ''}
                label='Loại sản phẩm'
                name="type"
                data={Object.values(ProductType).map(x => ({
                    ...x,
                    children: type === ProductType[3].id && parseInt(x.id) === parseInt(ProductType[3].id) &&
                        <CmsSelect
                            label=""
                            data={Object.values(ProductType[3].type).map(x => ({ ...x, id: parseInt(x.id) }))}
                            name="ishs"
                            value={isHs || ''}
                            onChange={(value) => handleSetHome(value.target.value)} />
                }))}
            />
        </div>
    )
}
export default React.memo(CmsFormikProductType)
