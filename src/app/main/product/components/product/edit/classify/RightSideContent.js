import { Box } from "@material-ui/core"
import { CmsAutocomplete, CmsBoxLine, CmsFormikTextField } from "@widgets/components"
import { keyStore } from "app/main/product/common"
import { getList } from "app/main/product/store/productSlice"
import { get } from "lodash"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function SearchProductSKUContent({ formik, prefix }) {
    const dispatch = useDispatch()
    const entities = useSelector(store => store[keyStore].product.entities)?.data
    const loading = useSelector(store => store[keyStore].product.loading)

    const [sku, setSku] = useState(null)

    const item_product = get(formik.values, prefix)?.item ? get(formik.values, prefix)?.item : null
    const item_sku = item_product ? item_product?.sku : null
    useEffect(() => {
        dispatch(getList({ homeSubscription: 2, PageNumber: 1, rowsPage: 30 }))
    }, [dispatch])

    useEffect(() => {
        if (item_sku) {
            setSku(entities?.find(x => x.sku === item_sku) || null)
        }
    }, [entities, item_sku])

    const onChangeProduct = (event, value) => {
        setSku(value)
    }

    console.log('item_product', item_product)

    return (
        <>
            <CmsAutocomplete
                loading={loading}
                label="Danh sách Sản phẩm"
                value={sku}
                multiple={false}
                data={entities || []}
                onChange={onChangeProduct}
                required={true}
                onKeyPress={(value) => { dispatch(getList({ search: value, homeSubscription: 2, PageNumber: 1, rowsPage: 30 })) }}
                autocompleteProps={{
                    // limitTags: 20,
                    getOptionLabel: (option) => option?.name,
                    // ChipProps: {
                    //     size: 'small'
                    // },
                    size: 'small',
                    disableCloseOnSelect: false,
                    filterSelectedOptions: false,

                }}
                renderOption={(option, props) =>
                    <Box className="w-full" component="div" style={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                        <div className="flex justify-between items-center space-x-4">
                            <div className="flex justify-start">
                                {option.name}
                            </div>
                            <div className="flex justify-end">
                                {option.image &&
                                    <img
                                        loading="lazy"
                                        width="200"
                                        src={`${option.image}`}
                                        srcSet={`${option.image} 2x`}
                                        alt=""
                                    />
                                }
                            </div>
                        </div>
                    </Box>
                }
            />
        </>
    )
}

function RightSideContent({ formik, prefix }) {

    return (
        <div className="w-full space-y-8">
            <CmsBoxLine label={'Thông tin chi tiết'} className="p-16">
                <div className="w-full space-y-16">
                    <CmsFormikTextField size="small" name={`${prefix}name`} label="Tên" formik={formik} />
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}capacity`} label="capacity" formik={formik} />
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}heightlimit`} label="height limit" formik={formik} />
                    <SearchProductSKUContent formik={formik} prefix={prefix} />
                </div>
            </CmsBoxLine>

        </div>
    )
}
export default RightSideContent