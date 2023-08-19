
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { get } from "lodash";
import { getListHS } from "app/main/product/store/productSlice"
import { useEffect } from "react";
import ProductSearch from "./ProductSearch";
import ProductSearchList from "./ProductSearchList";
import UniqueProductList from "./UniqueProductList";
import noImage from '@widgets/images/noImage.jpg';
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const View = {
    skuList: { id: '1', name: 'danh sách sku list' },
    uniqueIdList: { id: '2', name: 'danh sách uniqueId list' },
}

const initialSearch = {
    pageNumber: 1,
    rowsPage: 10,
    homeSubscription: 2
}

function ProductSlotItemComponent({ keyStore, formik, prefix, listCheckTemp, setListCheckTemp, ...otherProps }) {
    const dispatch = useDispatch()
    const [chosenSku, setChosenSku] = useState(null)
    const [view, setView] = useState(View.skuList.id)
    const [search, setSearch] = useState(initialSearch);


    useEffect(() => {
        dispatch(getListHS(search))
    }, [dispatch, search])

    const handleClickSku = (event, value) => {
        console.log('value', value)
        setView(View.uniqueIdList.id)
        setChosenSku({ ...get(formik.values, `${prefix}.item`), name: value?.name, img: value?.image, sku: value?.sku, uniqueid: null, price: JSON.parse(value?.price || 0) })
        // formik.setFieldValue(`${prefix}.item`, { ...get(formik.values, `${prefix}.item`), name: value?.name, img: value?.img, sku: value?.sku, uniqueid: null })
    }

    const handleChooseUniqueID = ({ uniqueid }) => {
        if (Object.keys(listCheckTemp)?.length) {
            Object.keys(listCheckTemp).forEach(element => {
                listCheckTemp[element]?.length && listCheckTemp[element].forEach(e => {
                    const string = `${element}.slots[${e}]`;
                    formik.setFieldValue(`${string}.item`, { ...get(formik.values, `${string}.item`), name: chosenSku?.name, img: chosenSku?.img, sku: chosenSku?.sku, uniqueid: uniqueid, temporaryprice: chosenSku.price, type: "wine" })
                });
            });

        } else {
            console.log(listCheckTemp);
            console.log(prefix);
            formik.setFieldValue(`${prefix}.item`, { ...get(formik.values, `${prefix}.item`), name: chosenSku?.name, img: chosenSku?.img, sku: chosenSku?.sku, uniqueid: uniqueid, temporaryprice: chosenSku.price, type: "wine" })
        }
        otherProps.onChosenView && otherProps.onChosenView()

    }

    // const setSearch = (value) => {

    // }

    const handleKeyPressSearch = (event) => {
        if (event.key === 'Enter')
            setSearch(prev => ({ ...prev, search: event.target.value }))
        // /dispatch(getListHS({ search: valueSearch, homeSubscription: 2 }))

        if (typeof event === 'string')
            setSearch(prev => ({ ...prev, search: event }))

    }

    const sku = chosenSku?.sku || null
    const img = chosenSku?.img ? `${baseurl}${chosenSku?.img}` : noImage
    const name = chosenSku?.name || null
    return (
        <div className="space-y-16 w-full">
            {view === View.skuList.id &&
                <>
                    <ProductSearch keyStore={keyStore} handleKeyPressSearch={handleKeyPressSearch} />
                    <ProductSearchList
                        keyStore={keyStore}
                        onClickSku={handleClickSku}
                        setSearch={(value) => setSearch((prev) => ({ ...prev, ...value }))}
                    />
                </>
            }
            {view === View.uniqueIdList.id &&
                <UniqueProductList
                    sku={sku}
                    onClickView={() => setView(View.skuList.id)}
                    skuItem={{ img, name }}
                    onClickChooseUniqueId={handleChooseUniqueID}
                />
            }
        </div>
    )
}

export default React.memo(ProductSlotItemComponent)