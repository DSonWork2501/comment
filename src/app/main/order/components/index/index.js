import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsLabel, CmsTab, CmsTableBasic } from "@widgets/components";
import { ConvertDateTime, initColumn, NumberWithCommas } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore, links } from "../../common";
import FilterOptionView from "./filterOptionView";
import reducer from "../../store";
import { getList as getOrder, order, resetSearch, setSearch, updateOrderStatus } from "../../store/orderSlice";
import clsx from "clsx";
import { orderStatus } from "../../model/status";
import OrderDetailContent from "./orderDetail";
import ChangeOderStatusContent from "./changeOrderStatus";
import History from "@history";
import { useParams } from "react-router";
import { Box, styled } from "@material-ui/core";
import PackageDialog from "./PackageDialog";
import { getWine } from "app/main/customer-shelf/store/customerShelfSlice";

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .Mui-selected": {
        background: 'rgb(215 247 250)'
    },
    "& .inner-scroll >div:first-child": {
        height: 90,
        minHeight: 'initial'
    }
});

const columns = [
    new initColumn({ field: "id", label: "IMEI", classHeader: "w-128", sortable: false }),
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
    const summary = useSelector(store => store[keyStore].order?.summary?.data)
    const params = useParams(), status = parseInt(params.status);
    const [filterOptions, setFilterOptions] = useState(null);
    const [open, setOpen] = useState('');
    const [info, setInfo] = useState(null);
    const [openDialog, setOpenDialog] = useState("");
    const [detail, setDetail] = useState(null);
    const totalValues = {
        0: summary?.da_huy ? summary?.da_huy?.toLocaleString('en-US') : 0,
        6: (summary?.da_huy + summary?.da_tao + summary?.da_xac_nhan + summary?.da_dong_goi + summary?.cho_thanh_toan + summary?.da_thanh_toan + summary?.hoan_tat)
            ? (summary?.da_huy + summary?.da_tao + summary?.da_xac_nhan + summary?.da_dong_goi + summary?.cho_thanh_toan + summary?.da_thanh_toan + summary?.hoan_tat)?.toLocaleString('en-US')
            : 0,
        5: summary?.cho_thanh_toan ? summary?.cho_thanh_toan?.toLocaleString('en-US') : 0,
        4: summary?.hoan_tat ? summary?.hoan_tat?.toLocaleString('en-US') : 0,
        3: summary?.da_thanh_toan ? summary?.da_thanh_toan?.toLocaleString('en-US') : 0,
        2: summary?.da_xac_nhan ? summary?.da_xac_nhan?.toLocaleString('en-US') : 0,
        1: summary?.da_tao ? summary?.da_tao?.toLocaleString('en-US') : 0
    }

    useEffect(() => {
        if (typeof status === 'number' && !isNaN(status)) {
            let filter = { ...search };
            if (status !== 6)
                filter.status = status;
            dispatch(getOrder(filter))
            dispatch(order.other.getSummary())
        }
    }, [dispatch, search, status])


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
                <CmsIconButton
                    tooltip={'Edit Trạng thái'}
                    icon="edit"
                    className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white"
                    onClick={() => HandleChangeStatus(item)} />
                <CmsIconButton
                    tooltip={'Đóng gói'}
                    icon="wrap_text"
                    className="bg-blue-500 hover:bg-blue-700 hover:shadow-2 text-white"
                    onClick={() => {
                        setOpenDialog('package');
                        setDetail(item);
                        dispatch(getWine({ cusId: item.cusId, parentId: item.hhid, cms: 1 }))
                    }} />
            </div>
        ) || []
    })), [entities])

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };

    const HandleRefresh = () => {
        dispatch(getOrder(search))
    };

    const handleCloseDialog = () => {
        setOpenDialog('');
        setDetail(null);
    }

    return (
        <LayoutCustom>
            {openDialog === 'package' &&
                <PackageDialog
                    detail={detail}
                    open={openDialog === 'package'}
                    handleClose={() => handleCloseDialog()}
                />}
            <CmsCardedPage
                title={'Danh sách đơn hàng'}
                subTitle={'Quản lý thông tin đơn hàng'}
                icon="whatshot"
                // leftBottomHeader={leftBottomHeader}
                rightHeaderButton={
                    <div>
                        <CmsButton color="default" className="mx-8" label="Refresh" startIcon="refresh" onClick={HandleRefresh} />
                        <CmsButton color="primary" label="Tạo đơn hàng" startIcon="add" onClick={() => History.push(`/order/edit/0/0`)} />
                    </div>
                }
                content={
                    <>
                        <CmsTableBasic
                            className="w-full"
                            isServerSide={true}
                            data={data}
                            search={search}
                            setSearch={(value) => dispatch(setSearch({ ...search, ...value }))}
                            columns={columns}
                            loading={loading}
                            filterOptions={
                                <FilterOptionView
                                    filterOptions={1}
                                    search={search}
                                    setFilterOptions={setFilterOptions}
                                    resetSearch={() => dispatch(resetSearch())}
                                    setSearch={(value) => dispatch(setSearch(value))}
                                />
                            }
                            openFilterOptions={Boolean(filterOptions)}
                            pagination={entities?.pagination}
                        />
                        <OrderDetailContent
                            open={open === 'detail'}
                            entity={info}
                            handleClose={() => { setOpen('') }}
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
                            <CmsTab data={links(totalValues)} value={0} isLink={true} onChange={(e, value) => {
                                History.push(links(totalValues).find(e => e.id === value)?.link)
                            }} />
                            {/* <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType).filter(x => x.id === FilterOptions.FilterType.basic.id)} /> */}
                        </div>
                        <div className="flex items-center justify-end space-x-8">
                            <CmsButtonGroup
                                size="small"
                                value={filterOptions}
                                onChange={handleFilterType}
                                data={Object.values(FilterOptions.FilterType).filter(item => item.id === FilterOptions.FilterType.advance.id)}
                            />
                            {/* <CmsMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} data={[
                            { id: 1, name: "Xuất Excel", icon: "upgrade", tooltip: "Chỉ hỗ trợ export 5000 chương trình", onClick: () => dispatch(exportExcel({ ...search, Limit: 5000 })) },
                            { id: 2, name: "Tải Lại", icon: "cached", onClick: () => dispatch(getEditors({ Page: 1, Limit: 10 })) },
                            { id: 2, name: "Trợ Giúp", icon: "help_outline" },
                        ]} /> */}
                        </div>
                    </div>
                }
            />
        </LayoutCustom>
    )
}

export default withReducer(keyStore, reducer)(OrderView);