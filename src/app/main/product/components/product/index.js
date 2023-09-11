import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsCheckbox, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import FilterOptionView from "./filterOptionView";
import reducer from "../../store";
import { getList as getProduct, product, resetSearch, setSearch } from "../../store/productSlice";
import { getList as getCategory } from "../../store/categorySlice";
import History from "@history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faHome, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Chip, Tooltip } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { DropMenu } from "app/main/order/components/index";

function ProductView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].product.search)
    const loading = useSelector(store => store[keyStore].product.loading)
    const entities = useSelector(store => store[keyStore].product.entities)
    const [filterOptions, setFilterOptions] = useState(null);
    const [selects, setSelects] = useState([]);

    useEffect(() => {
        dispatch(getProduct(search))
    }, [dispatch, search])

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const columns = [
        new initColumn({
            field: 'select',
            label: '',
            onSelectAllClick: () => {
                if (selects?.length) {
                    setSelects([]);
                    return;
                }

                let values = entities?.data.filter(val => !Boolean(val.recommend)).map(value => value.sku);
                setSelects(values);
            },
            classCheckAll: 'w-full',
            classHeader: 'w-5',
            sortable: false,
            isSelectAllDisabled: false
        }),
        new initColumn({ field: "sku", label: "SKU", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "catename", label: "Danh Mục", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "name", label: "Tên S/P", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "shortname", label: "Tên Ngắn", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "recommend", label: "SP gợi ý", alignHeader: "center", alignValue: "center", sortable: false }),
        new initColumn({ field: "image", label: "Hình Ảnh", alignHeader: "center", alignValue: "center", sortable: false }),
        new initColumn({ field: "price", label: "Giá", alignHeader: "center", alignValue: "center", sortable: false }),
        new initColumn({ field: "inventory", label: "Tồn", alignHeader: "center", alignValue: "center", sortable: false }),
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
            field: "box", label: <Tooltip title="Tạm giữ">
                <FontAwesomeIcon icon={faArchive} style={{ color: 'orange', fontSize: 17 }} />
            </Tooltip>, alignHeader: "center", alignValue: "center", sortable: false
        }),
    ]

    const data = entities?.data?.map((item, index) => ({
        select: (
            <CmsCheckbox
                key={`${index}_select`}
                checked={selects?.length ? selects.includes(item.sku) : false}
                value={item.id}
                onChange={e => {
                    let check = selects.includes(item.sku);
                    check
                        ? setSelects(value => value.filter(e => e !== item.sku))
                        : setSelects(value => [...value, item.sku])
                }}
                name="select"
            />
        ),
        recommend: (item?.recommend ? <Chip label="Có" className="bg-green text-white" />:<Chip label="Không" className="bg-red text-white" />),
        id: item.id,
        name: item.name,
        catename: item.catename,
        shortname: item.shortname,
        image: (<img style={{ height: 100, margin: '0 auto' }} src={`${item.image ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item?.image}` : 'assets/images/etc/no-image-icon.png'}`} alt={item?.img} />),
        sku: item.sku,
        price: item.price ? parseInt(item.price).toLocaleString() : 0,
        inventory: item.inventory || '0',
        run: item.shipping || '0',
        box: item.holding || '0',
        home: item.remain || '0',
        action: (
            <div className="flex flex-row space-x-4">
                <CmsIconButton
                    tooltip={<CmsLabel content={"Cập nhật"} className="text-10" />}
                    icon="edit"
                    className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white"
                    onClick={() => History.push(`/product/${item.sku}`)}
                />
                <CmsIconButton
                    tooltip={<CmsLabel content={"Xóa"} className="text-10" />}
                    icon="delete"
                    className="bg-red-500 hover:bg-red-700 hover:shadow-2 text-white"
                    onClick={() => {
                        alertInformation({
                            text: `Xác nhận thao tác`,
                            data: {},
                            confirm: async () => {
                                try {
                                    const resultAction = await dispatch(product.delete({
                                        products: [
                                            {
                                                sku: item.sku,
                                                status: 0
                                            }
                                        ]
                                    }));
                                    unwrapResult(resultAction);
                                    dispatch(getProduct(search));
                                } catch (error) {
                                } finally {
                                }
                            },
                        });
                    }}
                />
            </div>
        ) || []
    }));

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };

    // // console.log('filterOptions', filterOptions)

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
                            setSearch={(value) => dispatch(setSearch({ ...value, pageNumber: 1 }))}
                        />
                    }
                    selectedList={selects}
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
                        {
                            Boolean(selects?.length)
                            &&
                            <DropMenu
                                crName={`Lựa chọn`}
                                handleClose={(value, setAnchorEl) => {
                                    if (value?.id === 1) {
                                        alertInformation({
                                            text: `Xác nhận thao tác`,
                                            data: {},
                                            confirm: async () => {
                                                try {
                                                    const resultAction = await dispatch(product.addRecommend(
                                                        selects.map(val => ({ sku: val, recommend: 1 }))
                                                    ));
                                                    unwrapResult(resultAction);
                                                    dispatch(getProduct(search));
                                                    setSelects([]);
                                                } catch (error) {
                                                } finally {
                                                }
                                            },
                                        });
                                    }

                                    if (value?.id === 2) {
                                        alertInformation({
                                            text: `Xác nhận thao tác`,
                                            data: {},
                                            confirm: async () => {
                                                try {
                                                    const resultAction = await dispatch(product.addRecommend(
                                                        selects.map(val => ({ sku: val, recommend: 0 }))
                                                    ));
                                                    unwrapResult(resultAction);
                                                    dispatch(getProduct(search));
                                                    setSelects([]);
                                                } catch (error) {
                                                } finally {
                                                }
                                            },
                                        });
                                    }

                                    setAnchorEl(null)
                                }}
                                pcBtn
                                className={`min-w-128 mr-8`}
                                data={
                                    [
                                        { id: 1, name: 'Thêm sản phẩm gợi ý' },
                                        { id: 2, name: 'Bỏ sản phẩm gợi ý' }
                                    ]
                                } />
                        }
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