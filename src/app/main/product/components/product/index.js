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
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "catename", label: "Danh Mục", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "name", label: "Tên S/P", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "shortname", label: "Tên Ngắn", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "image", label: "Hình Ảnh", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "sku", label: "SKU", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "price", label: "Giá", alignHeader: "left", alignValue: "left", sortable: false }),
]

function ProductView() {
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
        image: (<img src={item?.img} alt={item?.img} />),
        sku: item.sku,
        price: item.price,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                <CmsIconButton
                    tooltip={<CmsLabel content={"Cập nhật"} className="text-10" />}
                    icon="edit"
                    className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white"
                    onClick={() => History.push(`/product/${item.id}`)}
                />
            </div>
        ) || []
    })), [entities])

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };

    // console.log('filterOptions', filterOptions)

    return (
        <CmsCardedPage
            title={'Danh sách sản phẩm'}
            subTitle={'Quản lý thông tin sản phẩm'}
            icon="whatshot"
            // leftBottomHeader={leftBottomHeader}
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
                    filterOptions={
                        <FilterOptionView
                            filterOptions={filterOptions}
                            search={search}
                            setFilterOptions={setFilterOptions}
                            resetSearch={() => dispatch(resetSearch())}
                            setSearch={(value) => dispatch(setSearch(value))}
                        />
                    }
                    openFilterOptions={Boolean(filterOptions)}
                />
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType)} />
                    </div>
                    <div className="flex items-center justify-end">
                        <CmsButton className="bg-orange-700 text-white hover:bg-orange-900" label="Thêm mới" startIcon="add" onClick={() => History.push(`/product/0`)}/>
                        {/* <CmsMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} data={[
                            { id: 1, name: "Xuất Excel", icon: "upgrade", tooltip: "Chỉ hỗ trợ export 5000 chương trình", onClick: () => dispatch(exportExcel({ ...search, Limit: 5000 })) },
                            { id: 2, name: "Tải Lại", icon: "cached", onClick: () => dispatch(getEditors({ Page: 1, Limit: 10 })) },
                            { id: 2, name: "Trợ Giúp", icon: "help_outline" },
                        ]} /> */}
                    </div>
                </div>
            }
        />
    )
}

export default withReducer(keyStore, reducer)(ProductView);