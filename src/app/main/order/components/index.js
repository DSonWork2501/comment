import { CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components";
import { ConvertDateTime, initColumn, NumberWithCommas } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../common";
import FilterOptionView from "./index/filterOptionView";
import reducer from "../store";
import { getList as getOrder, resetSearch, setSearch } from "../store/orderSlice";
import clsx from "clsx";
import { orderStatus } from "../model/status";
import OrderDetailContent from "./index/orderDetail";
import ChangeOderStatusContent from "./index/changeOrderStatus";

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "createdate", label: "Ngày tạo", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "moneydiscount", label: "Giảm giá", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "moneytotal", label: "Tổng tiền", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "detail", label: "Chi tiết", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "status", label: "Trạng thái", alignHeader: "left", alignValue: "left", sortable: false }),
]

function OrderView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].order.search)
    const loading = useSelector(store => store[keyStore].order.loading)
    const entities = useSelector(store => store[keyStore].order.entities)
    const [filterOptions, setFilterOptions] = useState(null);
    const [open, setOpen] = useState('');
    const [info, setInfo] = useState(null);

    useEffect(() => {
        dispatch(getOrder(search))
    }, [dispatch, search])

    const HandleClickDetail = (item) => {
        setInfo(item)
        setOpen('detail')
    }

    const HandleChangeStatus = (item) => {
        setOpen('changeStatus')
        setInfo(item)
    }

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        createdate: ConvertDateTime.DisplayDateTime(item.createdate),
        moneydiscount: item.moneydiscount,
        moneytotal: NumberWithCommas(item.moneytotal),
        detail: <CmsIconButton onClick={() => HandleClickDetail(item)} size="small" tooltip={'Thông tin chi tiết'} icon="info" className="text-16 hover:shadow-2 text-grey-500 hover:text-grey-700" />,
        status: <CmsLabel component={'span'} content={orderStatus[item.status].name} className={clsx('text-white p-6 rounded-12', orderStatus[item.status].className)} />,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                <CmsIconButton tooltip={'Edit Trạng thái'} icon="edit" className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white" onClick={()=>HandleChangeStatus()}/>
            </div>
        ) || []
    })), [entities])

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };
    return (
        <CmsCardedPage
            title={'Danh sách đơn hàng'}
            subTitle={'Quản lý thông tin đơn hàng'}
            icon="whatshot"
            // leftBottomHeader={leftBottomHeader}
            rightHeaderButton={
                <div>

                </div>
            }
            content={
                <>
                    <CmsTableBasic
                        className="w-full"
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
                        pagination={data?.pagination?.map(x => ({ page: x.pagenumber, limit: x.rowspage, totalPage: x.totalpage }))}
                    />
                    <OrderDetailContent
                        open={open === 'detail'}
                        entity={info}
                        handleClose={() => { setOpen(''); setInfo(null) }}
                    />
                    <ChangeOderStatusContent
                        open={open === 'changeStatus'}
                        entity={info}
                        handleClose={() => { setOpen(''); setInfo(null) }}
                    />
                </>
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType).filter(x => x.id === FilterOptions.FilterType.basic.id)} />
                    </div>
                    <div className="flex items-center justify-end">
                        {/* <CmsButton className="bg-orange-700 text-white hover:bg-orange-900" label="Thêm mới" startIcon="add" /> */}
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

export default withReducer(keyStore, reducer)(OrderView);