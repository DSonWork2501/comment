
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

function ProductSlotItemComponent({ keyStore, formik, prefix, ...otherProps }) {
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
        setChosenSku({ ...get(formik.values, `${prefix}.item`), name: value?.name, img: value?.image, sku: value?.sku, uniqueid: null })
        // formik.setFieldValue(`${prefix}.item`, { ...get(formik.values, `${prefix}.item`), name: value?.name, img: value?.img, sku: value?.sku, uniqueid: null })
    }

    const handleChooseUniqueID = ({ uniqueid }) => {
        formik.setFieldValue(`${prefix}.item`, { ...get(formik.values, `${prefix}.item`), name: chosenSku?.name, img: chosenSku?.img, sku: chosenSku?.sku, uniqueid: uniqueid, type: "wine" })
        otherProps.onChosenView && otherProps.onChosenView()
    }

    // const setSearch = (value) => {

    // }

    const handleKeyPressSearch = (event) => {
        if (event.key === 'Enter') {
            setSearch(prev => ({ ...prev, search: event.target.value }))
            // /dispatch(getListHS({ search: valueSearch, homeSubscription: 2 }))
        }
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