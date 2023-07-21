import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsCheckbox, CmsIconButton, CmsTab, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import { useMemo } from "react";
import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { btnStatus, keyStore, links } from "../../common";
import FilterOptionView from "./filterOptionView";
import reducer from "../../store";
import { getList as getOrder, order, resetSearch, setSearch, updateOrderStatus } from "../../store/orderSlice";
import clsx from "clsx";
import { orderStatus } from "../../model/status";
import OrderDetailContent from "./orderDetail";
import ChangeOderStatusContent from "./changeOrderStatus";
import History from "@history";
import { useParams } from "react-router";
import { Box, Button, Menu, MenuItem, Tooltip, makeStyles, styled } from "@material-ui/core";
import PackageDialog from "./PackageDialog";
import { getShelf, getWine } from "app/main/customer-shelf/store/customerShelfSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { product } from "app/main/product/store/productSlice";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faFilter, faMoneyBill, faPen, faTruck } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { ArrowDropDown } from "@material-ui/icons";
import ConfirmationDialog from "./ConfirmationDialog";
import FuseLoading from "@fuse/core/FuseLoading/FuseLoading";
import AddShipperDialog from "./AddShipperDialog";

const useStyles = makeStyles({
    hoverOpenBtn: {
        '&:hover .btn-fix': {
            opacity: 1
        },
    },
    menu: {
        '& ul': {
            padding: '0 !important'
        }
    }
});

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

export const DropMenu = ({ crName, data, handleClose, className }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <div>
            <Button aria-controls="dropdown-menu" className={className} size="small" style={{ textTransform: 'initial' }} color="primary" variant="contained" aria-haspopup="true" onClick={handleClick}>
                {crName}
                {
                    Boolean(data?.length)
                    &&
                    <ArrowDropDown />
                }
            </Button>
            {
                Boolean(data?.length)
                &&
                <Menu
                    id="dropdown-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => {
                        handleClose(null, setAnchorEl)
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    className={classes.menu}
                >
                    {
                        data.map((val, index) => {
                            return <MenuItem key={index} onClick={() => {
                                handleClose(val, setAnchorEl, 0)
                            }}>{val.name}</MenuItem>
                        })
                    }
                </Menu>
            }
        </div>
    );
}

function OrderView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].order.search)
    const loading = useSelector(store => store[keyStore].order.loading)
    const entities = useSelector(store => store[keyStore].order.entities)
    const classes = useStyles();
    const reEntities = useMemo(() => {
        let data = [];
        entities?.data?.length && entities.data.forEach((element, index) => {
            element?.productorders?.length ? element.productorders.forEach((e, keyRow) => {
                data.push({ ...element, detail: e, keyRow: (keyRow + 1) })
            }) : data.push({ ...element, keyRow: 1 })
        });
        return {
            ...entities,
            data
        }
    }, [entities])
    const summary = useSelector(store => store[keyStore].order?.summary?.data)
    const params = useParams(), status = parseInt(params.status);
    const [filterOptions, setFilterOptions] = useState(null);
    const [open, setOpen] = useState('');
    const [info, setInfo] = useState(null);
    const [openDialog, setOpenDialog] = useState("");
    const [detail, setDetail] = useState(null);
    const [item, setItem] = useState(null);
    const totalValues = {
        0: summary?.da_huy ? summary?.da_huy?.toLocaleString('en-US') : 0,
        6: summary?.da_dong_goi ? summary?.da_dong_goi?.toLocaleString('en-US') : 0,
        100: (summary?.da_huy + summary?.da_tao + summary?.da_xac_nhan + summary?.da_dong_goi + summary?.cho_thanh_toan + summary?.da_thanh_toan + summary?.hoan_tat)
            ? (summary?.da_huy + summary?.da_tao + summary?.da_xac_nhan + summary?.da_dong_goi + summary?.cho_thanh_toan + summary?.da_thanh_toan + summary?.hoan_tat)?.toLocaleString('en-US')
            : 0,
        //5: summary?.cho_thanh_toan ? summary?.cho_thanh_toan?.toLocaleString('en-US') : 0,
        // 4: summary?.hoan_tat ? summary?.hoan_tat?.toLocaleString('en-US') : 0,
        // 3: summary?.da_thanh_toan ? summary?.da_thanh_toan?.toLocaleString('en-US') : 0,
        2: summary?.da_xac_nhan ? summary?.da_xac_nhan?.toLocaleString('en-US') : 0,
        1: summary?.da_tao ? summary?.da_tao?.toLocaleString('en-US') : 0
    }
    const [selects, setSelects] = useState([]);

    const columns = [
        new initColumn({
            field: 'select',
            label: '',
            onSelectAllClick: () => {
                if (selects?.length) {
                    setSelects([]);
                    return;
                }

                let values = entities?.data.filter(val => val.shipped !== 1).map(value => value.id);
                setSelects(values);
            },
            classCheckAll: 'w-full',
            classHeader: 'w-5',
            sortable: false,
            isSelectAllDisabled: false
        }),
        new initColumn({ field: "id", label: "ID", classHeader: "w-128", alignValue: "left", sortable: false }),
        //new initColumn({ field: "createdate", label: "Ngày tạo", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "cusname", label: "Khách hàng", alignHeader: "center", alignValue: "left", sortable: false }),

        new initColumn({ field: "product", style: { width: 250 }, label: "Sản phẩm", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "unitPR", label: "Đơn vị", style: { width: 85 }, alignHeader: "center", alignValue: "center", sortable: false }),
        new initColumn({ field: "right", label: "Giá", alignHeader: "right", alignValue: "right", sortable: false }),
        new initColumn({ field: "numberPr", label: "SL", style: { width: 50 }, alignHeader: "center", alignValue: "center", sortable: false }),

        new initColumn({
            field: "moneydiscount", label: <Tooltip title="Đang vận chuyển">
                <FontAwesomeIcon icon={faTruck} style={{ color: '#03a9f4', fontSize: 17 }} />
            </Tooltip>
            , alignHeader: "center", alignValue: "center", sortable: false
        }),
        new initColumn({ field: "moneytotal", style: { width: 140 }, label: <Tooltip title="Tổng tiền"><FontAwesomeIcon icon={faMoneyBill} style={{ color: 'green', fontSize: 17 }} /></Tooltip>, alignHeader: "center", alignValue: "right", sortable: false }),
        new initColumn({ field: "staffdescription", style: { width: 250 }, label: <FontAwesomeIcon icon={faFilePen} style={{ color: 'pink', fontSize: 17 }} />, alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "status", style: { width: 150 }, label: <FontAwesomeIcon icon={faFilter} style={{ color: 'orange', fontSize: 17 }} />, alignHeader: "center", alignValue: "center", sortable: false }),
    ]

    const getListTable = useCallback((search, status) => {
        if (typeof status === 'number' && !isNaN(status)) {
            let filter = { ...search };
            if (status !== 100)
                filter.status = status;
            dispatch(getOrder(filter))
            dispatch(order.other.getSummary())
        }

    }, [dispatch,])

    useEffect(() => {
        getListTable(search, status);
    }, [dispatch, search, status, getListTable])

    const HandleClickDetail = (item) => {
        setInfo(item)
        setOpen('detail')
    }

    const HandleSaveStatus = (value) => {
        dispatch(updateOrderStatus(value))
    }

    // const returnName = (status) => {
    //     if (status === 1)
    //         return 'Xác Nhận';
    //     if (status === 2)
    //         return 'Chuyển Qua Đóng Gói';
    //     if (status === 6)
    //         return 'Đóng Gói';
    //     if (status === 5)
    //         return 'Xác Nhận Thanh Toán';
    //     if (status === 3)
    //         return 'Hoàn Thành';
    //     return '';
    // }

    const handleStatus = (item) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { item },
            confirm: async () => {
                let form = {
                    id: item.id,
                    cusID: item.cusId
                }
                if (status === 1)
                    form.status = 2
                if (status === 2)
                    form.status = 6
                if (status === 6)
                    form.status = 5
                if (status === 5)
                    form.status = 3
                if (status === 3)
                    form.status = 4
                const resultAction = await dispatch(updateOrderStatus(form))
                unwrapResult(resultAction);
                getListTable(search, status);
            },
        })
    }

    // const HandleChangeStatus = (item) => {
    //     setOpen('changeStatus')
    //     setInfo(item)
    // }

    const data = reEntities?.data?.map((item, index) => ({
        id: <div className="text-12">
            <div className="text-blue-500">
                {item.id}
            </div>
            <div>
                {item.createdate ? format(new Date(item.createdate), 'HH:mm dd/MM/yyyy') : ''}
            </div>
        </div>,
        select: (
            <CmsCheckbox
                key={`${index}_select`}
                checked={selects?.length ? selects.includes(item.id) : false}
                value={item.id}
                onChange={e => {
                    let check = selects.includes(item.id);
                    check
                        ? setSelects(value => value.filter(e => e !== item.id))
                        : setSelects(value => [...value, item.id])
                }}
                disabled={Boolean(item?.shipped)}
                name="select"
            />
        ),
        staffdescription: (
            <div className={clsx("text-12  h-full w-full absolute top-8 right-8 bottom-8 left-8", classes.hoverOpenBtn)}>
                <div
                    onClick={() => {
                        setOpenDialog('note');
                        setItem(item);
                    }}
                    className="w-32 h-32 rounded-full cursor-pointer hover:bg-grey-300 flex items-center justify-center btn-fix absolute top-8 right-8 opacity-0">
                    <FontAwesomeIcon icon={faPen} />
                </div>
                {item?.staffdescription}
                {
                    item.description
                    &&
                    <div style={{ borderBottom: '1px dashed black', width: '100%' }}></div>
                }
                {item?.description}
            </div>
        ),
        numberPr: (
            <div className="text-12">
                1
            </div>
        ),
        keyRow: item.keyRow,
        cusname: <div className="text-12">
            <div className="text-blue-500">
                {
                    item.phone
                }
            </div>
            <div>
                {
                    item.cusname
                }
            </div>
            <div>
                {
                    item.email
                }
            </div>
            <div>
                <i>
                    {
                        item.address + ',' + item.ward + ',' + item.district + ',' + item.city
                    }
                </i>
            </div>
        </div>,
        moneytotal: (
            <div>
                <div className="text-10 text-orange-500">
                    {(item?.moneydiscount) ? item.moneydiscount.toLocaleString('en-US') : ''}
                </div>
                <div className="text-12 text-green-500">
                    {(item?.moneytotal) ? item.moneytotal.toLocaleString('en-US') : 0}
                </div>
            </div>
        ),
        detail: <CmsIconButton onClick={() => HandleClickDetail(item)} size="small" tooltip={'Thông tin chi tiết'} icon="info" className="text-16 hover:shadow-2 text-grey-500 hover:text-grey-700" />,
        status: <div>
            <DropMenu
                crName={orderStatus[item.status].name}
                className={clsx('text-white px-4 py-2  text-12'
                    , `hover:${orderStatus[item.status].className}`
                    , orderStatus[item.status].className
                    , (item.status === 4 || item.status === 0) ? 'pointer-events-none' : '')}
                data={btnStatus.map(val => {
                    let hide = true;

                    if (item.status === 1 && (val.status === 2 || val.status === 0))
                        hide = false;

                    if (item.status === 2 && val.status === 6)
                        hide = false;

                    if (item.status === 6 && val.status === 5)
                        hide = false;

                    if (item.status === 5 && val.status === 3)
                        hide = false;

                    if (item.status === 3 && val.status === 4)
                        hide = false;

                    return { ...val, hide }
                }).filter(val => !val.hide)}

                handleClose={(value, setAnchorEl) => {
                    if (value) {
                        if (value.status === 6) {
                            History.push(`/package/${item.id}`)
                        } else {
                            alertInformation({
                                text: `Xác nhận thao tác`,
                                data: { value },
                                confirm: async () => {
                                    let form = {
                                        id: item.id,
                                        cusID: item.cusId,
                                        status: value.status
                                    }
                                    const resultAction = await dispatch(updateOrderStatus(form))
                                    unwrapResult(resultAction);
                                    getListTable(search, status);
                                },
                            })
                        }
                    }
                    setAnchorEl(null)
                }} />
            {/* <CmsLabel component={'span'} content={orderStatus[item.status].name} className={clsx('text-white p-6 rounded-12', orderStatus[item.status].className)} /> */}
        </div>,
        product: (
            <div className="text-12">
                {item?.detail?.name}
            </div>
        ),
        unitPR: (
            <div className="text-12">
                {item?.hhid ? 'Tủ' : 'Chai'}
            </div>
        ),
        right: (
            <div className="text-12">
                {(item?.detail?.price) ? item?.detail?.price.toLocaleString('en-US') : '-'}
            </div>
        ),
        rowSpan: {
            id: item?.productorders?.length || 1,
            createdate: item?.productorders?.length || 1,
            moneydiscount: item?.productorders?.length || 1,
            cusname: item?.productorders?.length || 1,
            moneytotal: item?.productorders?.length || 1,
            detail: item?.productorders?.length || 1,
            status: item?.productorders?.length || 1,
            select: item?.productorders?.length || 1,
            staffdescription: item?.productorders?.length || 1,
        },
        // action: (
        //     <div className="w-full flex flex-row space-x-4">
        //         {
        //             (item.status !== 2 && item.status !== 0 && item.status !== 4)
        //             &&
        //             <CmsIconButton
        //                 tooltip={returnName(item.status)}
        //                 icon="navigate_next"
        //                 className={clsx("hover:shadow-2 text-white"
        //                     , status === 1 ? "bg-orange-500 hover:bg-orange-700" : ''
        //                     , status === 2 ? "bg-pink-500 hover:bg-pink-500" : ''
        //                     , status === 6 ? "bg-purple-500 hover:bg-purple-500" : ''
        //                     , status === 5 ? "bg-green-500 hover:bg-green-500" : ''
        //                     , status === 3 ? "bg-blue-500 hover:bg-blue-500" : ''
        //                 )}
        //                 onClick={() => handleStatus(item)} />
        //         }

        //         <CmsIconButton
        //             tooltip={'Edit Trạng thái'}
        //             icon="edit"
        //             className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white"
        //             onClick={() => HandleChangeStatus(item)} />

        //         {
        //             item.status === 2
        //             &&
        //             <CmsIconButton
        //                 tooltip={'Đóng gói'}
        //                 icon="wrap_text"
        //                 className="bg-blue-500 hover:bg-blue-700 hover:shadow-2 text-white"
        //                 onClick={() => {
        //                     setDetail(item);
        //                     setOpenDialog('package');
        //                     if (item.parentid === 1) {
        //                         dispatch(getShelf({ cusID: item.cusId, type: 'wine', orderID: item.id }))
        //                     } else {
        //                         dispatch(getWine({ cusId: item.cusId, parentId: item.hhid, cms: 1 }))
        //                     }
        //                 }} />
        //         }

        //     </div>
        // ) || []
    }))
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

    const handleCheck = async (check, id) => {
        const resultAction = await dispatch(product.other.wineArrange([{
            id,
            ispacked: check ? 1 : 0
        }]))
        unwrapResult(resultAction);

        detail.parentid === 1
            ? dispatch(getShelf({ cusID: detail.cusId, type: 'wine', orderID: detail.id }))
            : dispatch(getWine({ cusId: detail.cusId, parentId: detail.hhid, cms: 1 }))
    }

    const handleSubmit = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(order.other.updateNote(values));
                    unwrapResult(resultAction);
                    form.resetForm();
                    setOpenDialog('');
                    getListTable(search, status);
                } catch (error) {
                } finally {
                    form.setSubmitting(false)
                }
            },
            close: () => form.setSubmitting(false)
        });
    }

    if (!data) {
        return <FuseLoading />
    }

    const handleSaveShipper = (value, formik) => {
        const values = value.orders.map(val => ({
            ...value, orderid: val
        }))

        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, formik },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(order.shipper.insert(values));
                    unwrapResult(resultAction);
                    formik.resetForm();
                    setOpenDialog('');
                    getListTable(search, status);
                    setSelects([]);
                } catch (error) {
                } finally {
                    formik.setSubmitting(false)
                }
            },
            close: () => formik.setSubmitting(false)
        });
    }

    return (
        <LayoutCustom>
            {openDialog === 'package' &&
                <PackageDialog
                    detail={detail}
                    open={openDialog === 'package'}
                    handleCheck={handleCheck}
                    handleClose={() => handleCloseDialog()}
                    handlePackage={() => {
                        handleStatus(detail)
                    }}
                />}

            {
                openDialog === 'note'
                &&
                <ConfirmationDialog
                    title='Sửa ghi chú'
                    detail={item}
                    onSave={handleSubmit}
                    open={true}
                    handleClose={handleCloseDialog} />
            }

            {openDialog === 'shipper' && <AddShipperDialog
                title='Thêm biên bản bàn giao'
                detail={{ orders: selects }}
                open={openDialog === 'shipper'}
                onSave={handleSaveShipper}
                handleClose={handleCloseDialog} />}

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
                            className="w-full h-full"
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
                            showBorder
                            openFilterOptions={Boolean(filterOptions)}
                            pagination={reEntities?.pagination}
                            isClearHoverBg
                            removeSelect
                            selectedList={selects}
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
                                History.push(links(totalValues).find(e => e.id === value)?.link);
                                setSelects([]);
                            }} />
                            {/* <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType).filter(x => x.id === FilterOptions.FilterType.basic.id)} /> */}
                        </div>
                        <div className="flex items-center justify-end space-x-8">
                            {
                                Boolean(selects?.length)
                                &&
                                <DropMenu
                                    crName={`Lựa chọn`}
                                    handleClose={(value, setAnchorEl) => {
                                        if (value?.id === 1)
                                            setOpenDialog('shipper')
                                        setAnchorEl(null)
                                    }}
                                    className={`min-w-128`}
                                    data={
                                        [
                                            { id: 1, name: 'Thêm vào biên bản bàn giao', hide: status === 6 }
                                        ].filter(val => val.hide)
                                    } />
                            }

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