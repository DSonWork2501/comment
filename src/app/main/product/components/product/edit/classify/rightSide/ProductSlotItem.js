import { CmsAutocomplete } from "@widgets/components"
import { getList, getListHS, searchDetail } from "app/main/product/store/productSlice"
import { get } from "lodash"
import React, { useMemo } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import noImage from '@widgets/images/noImage.jpg';
import { LabelInfo } from "@widgets/components/common/LabelInfo"
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function InfoSKUProductContent({ data }) {
    const { img, name, sku, type, uniqueid } = data
    return (
        <div className="w-full flex flex-row space-x-16">
            <div>
                <img src={`${baseurl}${img}`} alt="image_detail" className="h-128" />
            </div>
            <div className="w-full self-center">
                <LabelInfo label={{ content: 'name' }} info={{ content: name }} />
                <LabelInfo label={{ content: 'uniqueid' }} info={{ content: uniqueid }} />
                <LabelInfo label={{ content: 'sku' }} info={{ content: sku }} />
                <LabelInfo label={{ content: 'type' }} info={{ content: type }} />
            </div>
        </div>
    )
}

export default function ProductSlotSKUItem({ formik, prefix, keyStore }) {

    const dispatch = useDispatch()
    const product_entities = useSelector(store => store[keyStore].product.hsEntities)?.data
    const loading = useSelector(store => store[keyStore].product.hsLoading)
    const detail_entities = useSelector(store => store[keyStore].product.searchDetailEntities)?.detail
    const detail_loading = useSelector(store => store[keyStore].product.searchDetailLoading)

    // const [item, setItem] = useState(null)
    // const [item_detail, setItem_detail] = useState(null)

    const item_product = get(formik.values, prefix)?.item ? get(formik.values, prefix)?.item : null
    const sku = item_product ? item_product?.sku : null

    useEffect(() => {
        dispatch(getListHS({ homeSubscription: 2, PageNumber: 1, rowsPage: 30 }))
    }, [dispatch])

    useEffect(() => {
        dispatch(searchDetail({ sku: sku }))
    }, [dispatch, sku])

    const product_data = useMemo(() => product_entities?.map(x => ({ ...x, img: x.image, image: `${baseurl}${x?.image}` || noImage })) || [], [product_entities])
    const item = product_data?.find(x => x.sku === sku) || null

    const uniqueId = item_product?.uniqueid || null

    const detail_data = useMemo(() => detail_entities?.map(x => ({ ...x, name: `uniqueid: ${x?.uniqueid} | color: ${x?.color} | height: ${x?.height} | price: ${x?.price}` })) || [], [detail_entities])
    const item_detail = detail_data?.find(x => x.uniqueid === uniqueId) || null

    const onChangeSku = (event, value) => {
        formik.setFieldValue(`${prefix}.item`, { ...get(formik.values, `${prefix}.item`), name: value?.name, img: value?.img, sku: value?.sku, uniqueid: null })
    }
    const onChangeProductDetail = (event, value) => {
        formik.setFieldValue(`${prefix}.item`, { ...get(formik.values, `${prefix}.item`), uniqueid: value?.uniqueid })
    }

    console.log('formik prefix', formik.values)
    return (
        <>
            <div className="w-full py-6 md:flex md:flex-row md:space-x-8 sm:space-y-16 md:space-y-0 sm:space-x-0">
                <CmsAutocomplete
                    loading={loading}
                    label="Danh sách Sản phẩm"
                    value={item}
                    multiple={false}
                    data={product_data}
                    onChange={onChangeSku}
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
                />
                {item?.sku &&
                    <CmsAutocomplete
                        loading={detail_loading}
                        label="Id Sản phẩm"
                        value={item_detail}
                        multiple={false}
                        data={detail_data}
                        onChange={onChangeProductDetail}
                        required={true}
                        onKeyPress={(value) => { dispatch(searchDetail({ sku: value })) }}
                        autocompleteProps={{
                            // limitTags: 20,
                            getOptionLabel: (option) => option?.name || "",
                            // ChipProps: {
                            //     size: 'small'
                            // },
                            size: 'small',
                            disableCloseOnSelect: false,
                            filterSelectedOptions: false,
                            getOptionSelected: (option, value) => parseFloat(option.uniqueid) === parseFloat(value.uniqueid),
                        }}
                    />}
            </div>
            {get(formik.values, `${prefix}.item`) && <InfoSKUProductContent data={get(formik.values, `${prefix}.item`) || null} />}
        </>
    )
}