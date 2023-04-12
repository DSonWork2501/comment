import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components";
import { ConvertDateTime, initColumn, NumberWithCommas } from "@widgets/functions";
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
import { getList as getOrder, resetSearch, setSearch, updateOrderStatus } from "../../store/orderSlice";
import clsx from "clsx";
import { orderStatus } from "../../model/status";
import OrderDetailContent from "./orderDetail";
import ChangeOderStatusContent from "./changeOrderStatus";
import History from "@history";

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "createdate", label: "Ngày tạo", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "cusname", label: "Tên khách hàng", alignHeader: "left", alignValue: "left", sortable: false }),
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

    const HandleSaveStatus = (value) => {
       dispatch(updateOrderStatus(value))
    }

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        createdate: ConvertDateTime.DisplayDateTime(item.createdate),
        moneydiscount: item.moneydiscount,
        cusname: item.cusname,
        moneytotal: NumberWithCommas(item.moneytotal),
        detail: <CmsIconButton onClick={() => HandleClickDetail(item)} size="small" tooltip={'Thông tin chi tiết'} icon="info" className="text-16 hover:shadow-2 text-grey-500 hover:text-grey-700" />,
        status: <CmsLabel component={'span'} content={orderStatus[item.status].name} className={clsx('text-white p-6 rounded-12', orderStatus[item.status].className)} />,
        action: (
            <div className="w-full flex flex-row">
                <CmsIconButton tooltip={'Edit Trạng thái'} icon="edit" className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white" onClick={()=>HandleChangeStatus(item)}/>
            </div>
        ) || []
    })), [entities])

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };
    const HandleRefresh = () => {
        dispatch(getOrder(search))
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
                        setSearch={(value)=> dispatch(setSearch({...search, value}))}
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
                        pagination={data?.pagination}
                    />
                    <OrderDetailContent
                        open={open === 'detail'}
                        entity={info}
                        handleClose={() => { setOpen('')}}
                    />
                    <ChangeOderStatusContent
                        open={open === 'changeStatus'}
                        handleSave={HandleSaveStatus}
                        entity={info}
                        handleClose={() => { setOpen(''); }}
                    />
                </>
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType).filter(x => x.id === FilterOptions.FilterType.basic.id)} />
                    </div>
                    <div className="flex items-center justify-end space-x-8">
                        <CmsButton color="primary" label="Tạo đơn hàng" startIcon="add" onClick={() => History.push(`/order/edit/0/0`)}/>
                        <CmsButton color="default" label="Refresh" startIcon="refresh" onClick={HandleRefresh}/>
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