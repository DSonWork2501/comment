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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faHome, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@material-ui/core";

const columns = [
    new initColumn({ field: "sku", label: "SKU", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "catename", label: "Danh Mục", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "name", label: "Tên S/P", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "shortname", label: "Tên Ngắn", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "image", label: "Hình Ảnh", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "price", label: "Giá", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "hold", label: "Tồn", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({
        field: "run", label: <Tooltip title="Đang giao hàng">
            <FontAwesomeIcon icon={faTruck} style={{ color: '#03a9f4', fontSize: 17 }} />
        </Tooltip>, alignHeader: "center", alignValue: "center", sortable: false
    }),
    new initColumn({
        field: "home", label: <Tooltip title="Tồn trong kho">
            <FontAwesomeIcon icon={faHome} style={{ color: 'gray', fontSize: 17 }} />
        </Tooltip>, alignHeader: "center", alignValue: "center", sortable: false
    }),
    new initColumn({
        field: "box", label: <Tooltip title="Tồn trong kho">
            <FontAwesomeIcon icon={faArchive} style={{ color: 'orange', fontSize: 17 }} />
        </Tooltip>, alignHeader: "center", alignValue: "center", sortable: false
    }),
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
        image: (<img style={{ height: 100, margin: '0 auto' }} src={`${item.image ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item?.image}` : 'assets/images/etc/no-image-icon.png'}`} alt={item?.img} />),
        sku: item.sku,
        price: item.price ? parseInt(item.price).toLocaleString() : 0,
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
                    setSearch={(value) => dispatch(setSearch({ ...search, ...value }))}
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
                    pagination={entities?.pagination}
                />
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType)} />
                    </div>
                    <div className="flex items-center justify-end">
                        <CmsButton className="bg-orange-700 text-white hover:bg-orange-900" label="Thêm mới" startIcon="add" onClick={() => History.push(`/product/0`)} />
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