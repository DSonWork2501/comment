import { CmsAutocomplete, CmsLabel, CmsLoadingOverlay, CmsRadioGroup } from "@widgets/components"
import { getListHS, searchDetail } from "app/main/product/store/productSlice"
// import { get } from "lodash"
import React, { useMemo } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import noImage from '@widgets/images/noImage.jpg';
import LisProductContent from './ListProduct'
import { ProductType } from "app/main/product/model/product/homeSubscription"
import { OrderContext } from "app/main/order/context/OrderContext"
import { useState } from "react"
import { Tooltip } from "@material-ui/core"
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function FilterHS({ hs, handleChangeHs, setHs, disabledHs, setPrivate }) {
    const [type, setType] = useState(0)
    // const [isHs, setIsHs] = useState(null)
    useEffect(() => {
        setType(Object.keys(ProductType[3]?.type).map(x => (parseInt(x))).includes(parseInt(hs)) ? ProductType[3].id : ProductType[0].id)
        Object.keys(ProductType[3].type).map(x => (parseInt(x))).includes(parseInt(hs))
        // && setIsHs(parseInt(hs))
    }, [hs])

    const handleChangeProductType = (value) => {
        setType(value)
        if (value === ProductType[0].id) {
            setHs(parseInt(value))
            setPrivate('')
        } else {
            setHs(parseInt(ProductType[3]?.type['1'].id))
            setPrivate('home_subscription')
        }
    }

    return (
        <>
            <Tooltip title={disabledHs ? <CmsLabel content={'Đơn hàng chỉ có thể chọn 1 loạt sản phẩm cùng loại'} className="text-14" /> : ''}>
                <div className="w-full space-y-16">
                    <CmsRadioGroup
                        vertical={false}
                        size="small"
                        className="w-full m-0"
                        value={type}
                        onChange={(event) => handleChangeProductType(event)}
                        label="Loại"
                        name="type"
                        data={Object.values(ProductType).map(x => ({ ...x, disabled: disabledHs }))}
                    />
                    {/* {type === ProductType[3].id &&
                        <CmsSelect
                            label="Loại home subscription"
                            data={Object.values(ProductType[3].type).map(x => ({ ...x, id: parseInt(x.id) }))}
                            name="ishs"
                            value={isHs || ''}
                            onChange={handleChangeHs}
                        />
                    } */}
                </div>
            </Tooltip>
        </>
    )
}

export default function ProductSlotSKUItem({ formik_entity, formik, keyStore, HandleAddData, handleSelectItem }) {
    const key = window.location.pathname.split('/')[1] === 'order' ? 'orders' : keyStore;
    const { hs, setHs } = React.useContext(OrderContext) || null
    const dispatch = useDispatch()
    const product_entities = useSelector(store => store[key].product.hsEntities)?.data
    const loading = useSelector(store => store[key].product.hsLoading)
    const detail_entities = useSelector(store => store[key].product.searchDetailEntities)?.detail
    const detail_loading = useSelector(store => store[key].product.searchDetailLoading)
    const item_product = formik.values || null
    const sku = item_product ? item_product?.sku : null
    const [timer, setTimer] = useState()

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
        handleSelectItem(value);

        if (value) {
            formik.setValues((prev) => ({
                ...prev,
                sku: value.sku,
                name: value.name,
                img: value.img,
                image: value.image,
                'uniqueid': '',
                'model': '',
                'price': 0,
                ishs: value.ishs
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
                'price': 0,
                ishs: 0
            }))
        }
    }
    const handleChangeHs = (event) => {
        const value = event.target.value
        setHs(value)
        if (parseInt(value) === parseInt(ProductType[3].type['1'].id)) {
            formik_entity.setFieldValue('privatedescription', 'home_subscription')
        } else {
            formik_entity.setFieldValue('privatedescription', '')
        }
    }

    const onInputChange = (event, value, name) => {
        if (event) {
            clearTimeout(timer);  //clear any running timeout on key up
            setTimer(setTimeout(function () { //then give it a second to see if the user is finished
                //do .post ajax request //then do the ajax call
                dispatch(getListHS({ search: event.target.value, homeSubscription: hs, PageNumber: 1, rowsPage: 100 }))
            }, 700))
        }
    }

    const values = formik_entity?.values
    console.log('item_product', item_product)
    console.log('product_data', product_data)
    const disabledHs = useMemo(() => values?.productorder?.length > 0 ? true : false, [values])
    return (
        <div className="w-full space-y-16">
            <FilterHS
                hs={hs}
                handleChangeHs={handleChangeHs}
                setHs={setHs}
                disabledHs={disabledHs}
                setPrivate={(value) => formik_entity.setFieldValue('privatedescription', value)}
            />
            <div className="w-full md:flex md:flex-row md:space-x-8 sm:space-y-16 md:space-y-0 sm:space-x-0">
                <CmsAutocomplete
                    loading={loading}
                    label="Tìm kiếm..."
                    value={item}
                    multiple={false}
                    data={product_data}
                    onChange={onChangeSku}
                    required={true}
                    autocompleteProps={{
                        onInputChange,
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

            {(formik?.values?.sku && Array.isArray(detail_data) && formik?.values?.ishs !== 1)
                &&
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