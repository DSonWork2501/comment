import { CmsAutocomplete, CmsBoxLine, CmsButton, CmsFormikTextField } from "@widgets/components"
import { getList, getListHS, searchDetail } from "app/main/product/store/productSlice"
// import { get } from "lodash"
import React, { useMemo } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import noImage from '@widgets/images/noImage.jpg';
import { LabelInfo } from "@widgets/components/common/LabelInfo"
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

export default function ProductSlotSKUItem({ formik, keyStore, HandleAddData }) {

    const dispatch = useDispatch()
    const product_entities = useSelector(store => store[keyStore].product.hsEntities)?.data
    const loading = useSelector(store => store[keyStore].product.hsLoading)
    const detail_entities = useSelector(store => store[keyStore].product.searchDetailEntities)?.detail
    const detail_loading = useSelector(store => store[keyStore].product.searchDetailLoading)

    // const [item, setItem] = useState(null)
    // const [item_detail, setItem_detail] = useState(null)

    const item_product = formik.values || null
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
        console.log('sku', value)
        formik.setValues((prev) => ({
            ...prev,
            sku: value.sku,
            name: value.name,
            img: value.img,
            image: value.image
        }))
    }
    const onChangeProductDetail = (event, value) => {
        console.log('unquiID', value)
        formik.setValues((prev) => ({
            ...prev,
            'uniqueid': value?.uniqueid,
            'model': value?.model,
            'price': value?.price
        }))
    }

    const value = formik?.values
    console.log('formik prefix', formik.values)
    return (
        <div className="w-full space-y-16">
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
            {formik?.values?.sku &&
                <CmsBoxLine label={'Thông tin sản phẩm'}>
                    <div className="w-full flex flex-row">
                        <div className="w-1/6">
                            <img src={`${baseurl}${value?.img}`} alt="image_detail" className="h-128" />
                        </div>
                        <div className="w-3/6 self-center">
                            <LabelInfo label={{ content: 'tên' }} info={{ content: value?.name }} />
                            <LabelInfo label={{ content: 'uniqueid' }} info={{ content: value?.uniqueid }} />
                            <LabelInfo label={{ content: 'sku' }} info={{ content: value?.sku }} />
                            {value?.type && <LabelInfo label={{ content: 'loại' }} info={{ content: value?.type || '-' }} />}
                            {!isNaN(value?.price) && <LabelInfo label={{ content: 'giá' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />}
                        </div>
                        <div className="flex flex-row w-2/6 self-center space-x-16">
                            <CmsFormikTextField isNumber size="small" formik={formik} name="capacity" label="Sức chứa" />
                            <CmsFormikTextField isNumber size="small" formik={formik} name="quantity" label="Số lượng" />
                            <CmsButton size="small" label="thêm" onClick={() => HandleAddData()} />
                        </div>
                        {/* <div className="flex flex-row w-1/5 self-center space-x-8">
                        </div> */}
                    </div>
                </CmsBoxLine>
            }
        </div>
    )
}