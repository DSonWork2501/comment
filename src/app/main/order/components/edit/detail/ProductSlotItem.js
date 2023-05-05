import { CmsAutocomplete, CmsLoadingOverlay, CmsSelect } from "@widgets/components"
import { getListHS, searchDetail } from "app/main/product/store/productSlice"
// import { get } from "lodash"
import React, { useMemo } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import noImage from '@widgets/images/noImage.jpg';
import LisProductContent from './ListProduct'
import { HomeSubscription } from "app/main/product/model/product/homeSubscription"
import { OrderContext } from "app/main/order/context/OrderContext"
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

export default function ProductSlotSKUItem({ formik_entity, formik, keyStore, HandleAddData }) {
    const { hs, setHs } = React.useContext(OrderContext) || null;
    const dispatch = useDispatch()
    const product_entities = useSelector(store => store[keyStore].product.hsEntities)?.data
    const loading = useSelector(store => store[keyStore].product.hsLoading)
    const detail_entities = useSelector(store => store[keyStore].product.searchDetailEntities)?.detail
    const detail_loading = useSelector(store => store[keyStore].product.searchDetailLoading)

    const item_product = formik.values || null
    const sku = item_product ? item_product?.sku : null

    useEffect(() => {
        dispatch(getListHS({ HomeSubscription: parseInt(hs) }))
    }, [dispatch, hs])

    useEffect(() => {
        dispatch(searchDetail({ sku: sku }))
    }, [dispatch, sku])

    const product_data = useMemo(() => product_entities?.map(x => ({ ...x, img: x.image, image: `${baseurl}${x?.image}` || noImage })) || [], [product_entities])
    const item = product_data?.find(x => x.sku === sku) || null

    const detail_data = useMemo(() => detail_entities || [], [detail_entities])

    const onChangeSku = (event, value) => {
        value?.ishs && setHs(value.ishs)

        if (value) {
            formik.setValues((prev) => ({
                ...prev,
                sku: value.sku,
                name: value.name,
                img: value.img,
                image: value.image,
                'uniqueid': '',
                'model': '',
                'price': 0
            }))
        } else {
            formik.setValues((prev) => ({
                ...prev,
                sku: '',
                name: '',
                img: '',
                image: '',
                'uniqueid': '',
                'model': '',
                'price': 0
            }))
        }
    }
    const handleChangeHs = (event) => {
        const value = event.target.value
        setHs(event.target.value)
        const private_description = formik_entity.values.privatedescription
        if ([HomeSubscription[1].id, HomeSubscription[1].id].includes(value)) {
            private_description !== 'home_subscription' && formik_entity.setFieldValue('privatedescription', 'home_subscription')
        } else{
            private_description && formik_entity.setFieldValue('privatedescription', '')
        }
    }

    console.log('formik prefix', formik.values)
    return (
        <div className="w-full space-y-16">
            <div className="w-full py-6 md:flex md:flex-row md:space-x-8 sm:space-y-16 md:space-y-0 sm:space-x-0">
                <CmsSelect
                    size="small"
                    className="w-3/12"
                    value={hs}
                    onChange={(event) => handleChangeHs(event)}
                    label="Loại"
                    data={Object.values(HomeSubscription)}
                />
                <CmsAutocomplete
                    loading={loading}
                    label="Danh sách Sản phẩm"
                    value={item}
                    multiple={false}
                    data={product_data}
                    onChange={onChangeSku}
                    required={true}
                    onKeyPress={(value) => { dispatch(getListHS({ search: value, homeSubscription: hs, PageNumber: 1, rowsPage: 100 })) }}
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
            </div>
            {(formik?.values?.sku && Array.isArray(detail_data)) &&
                (<>
                    <CmsLoadingOverlay loading={detail_loading} />
                    <LisProductContent
                        data={detail_data}
                        HandleAddData={HandleAddData}
                        img={formik?.values?.image || ''}
                        hs={hs}
                    />
                </>
                )
            }
        </div>
    )
}