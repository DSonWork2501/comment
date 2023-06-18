import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components";
import { initColumn } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import FilterOptionView from "./filterOptionView";
import reducer from "../../store";
import { getList as getProduct, resetSearch, setSearch } from "../../store/productSlice";
import { getList as getCategory } from "../../store/categorySlice";
import History from "@history";

const columns = [
    new initColumn({ field: "sku", label: "SKU", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "catename", label: "Danh Mục", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "name", label: "Tên S/P", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "shortname", label: "Tên Ngắn", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "image", label: "Hình Ảnh", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "price", label: "Giá", alignHeader: "center", alignValue: "center", sortable: false }),
]

function ProductList() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].product.search)
    const loading = useSelector(store => store[keyStore].product.loading)
    const entities = useSelector(store => store[keyStore].product.entities)
    const [filterOptions, setFilterOptions] = useState(null);

    const JsonParseString = (str) => {
        try {
            return JSON.parse(str)
        } catch (error) {
            return null
        }
    }

    useEffect(() => {
        dispatch(getProduct(search))
    }, [dispatch, search])

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        name: item.name,
        catename: JsonParseString(item.catename) ? JsonParseString(item.catename).join(', ') : <div></div>,
        shortname: item.shortname,
        image: (<img style={{ height: 100, margin: '0 auto' }} src={`${item.image ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item?.image}` : 'assets/images/etc/no-image-icon.png'}`} alt={item?.img} />),
        sku: item.sku,
        price: item.price,
        action: (
            <div className="flex flex-row">
                <CmsIconButton
                    tooltip={<CmsLabel content={"Cập nhật"} className="text-10" />}
                    icon="edit"
                    className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white"
                    onClick={() => History.push(`/product/${item.sku}`)}
                />
            </div>
        ) || []
    })), [entities])

    return (
        <CmsCardedPage
            title={'Danh sách sản phẩm'}
            subTitle={'Quản lý thông tin sản phẩm'}
            icon="whatshot"
            rightHeaderButton={
                <div>
                </div>
            }
            content={
                <CmsTableBasic
                    className="w-full h-full"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                    setSearch={(value) => dispatch(setSearch({ ...search, ...value }))}
                    pagination={entities?.pagination}
                />
            }
        />
    )
}

export default withReducer(keyStore, reducer)(ProductList);