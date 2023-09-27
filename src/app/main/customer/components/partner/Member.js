import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import reducer from "../../store";
import { getList as getAccount, resetSearch, setSearch } from "../../store/accountSlice";
import AddDialog from "./AddDialog";
import { unwrapResult } from "@reduxjs/toolkit";
import { partner } from "../../store/partnerSlice";
import { useCallback } from "react";
import { Chip } from "@material-ui/core";
import AddCusDialog from "./AddCusDialog";
import { getList as getCustomers } from "app/main/customer/store/customerSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "name", label: "Tên đối tác", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "phone", label: "Sđt", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "recipient", label: "Người đại diện", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "recipientphone", label: "Sđt(Người đại diện)", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "address", label: "Địa chỉ", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "orders", label: "Tổng đơn", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "total", label: "Tổng tiền", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "status", label: "Trạng thái", alignHeader: "center", alignValue: "center", sortable: false }),
]

function ProductView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].partner.search);
    const loading = useSelector(store => store[keyStore].partner.loading);
    const entities = useSelector(store => store[keyStore].partner.entities);
    const customers = useSelector(store => store[keyStore].customer.entities?.data) || [];
    const [detail, setDetail] = useState(null);
    const [openDialog, setOpenDialog] = useState("");
    const params = useParams(), id = params.id;

    const [filterOptions, setFilterOptions] = useState(null);

    const getListTable = useCallback((search) => {
        dispatch(partner.member.getList(search));
    }, [dispatch])

    useEffect(() => {
        if (id)
            getListTable({ ...search, partnerID: id });
    }, [search, getListTable, dispatch, id])

    useEffect(() => {
        dispatch(getCustomers())
    }, [])

    const data = useMemo(() => entities?.data?.map(item => ({
        ...item,
        id: item.id,
        address: ((item?.address ? `${item?.address} ,` : '') + (item?.wardname ? `${item?.wardname} ,` : '') + (item?.districtname ? `${item?.districtname} ,` : '') + (item?.provincename ? `${item?.provincename}` : '')),
        status: (
            item?.status
                ? <Chip label="Hoạt động" className="bg-green-500 text-white" />
                : <Chip label="Đã ngừng" className="bg-red-500 text-white" />
        ),
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                <CmsIconButton
                    tooltip="Thêm người vào"
                    delay={50}
                    icon="add"
                    className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
                    onClick={() => {
                        setDetail({ partnerid: item.id });
                        setOpenDialog('user');
                    }}
                />
                <CmsIconButton
                    tooltip="Danh dách khách hàng"
                    delay={50}
                    icon="list"
                    className="bg-green-500 text-white shadow-3  hover:bg-green-900"
                    onClick={() => {
                        setDetail({ partnerid: item.id });
                        setOpenDialog('user');
                    }}
                />
                <CmsIconButton
                    tooltip="Chỉnh sửa thông tin"
                    delay={50}
                    icon="edit"
                    className="bg-orange-900 text-white shadow-3  hover:bg-blue-900"
                    onClick={() => {
                        setDetail({ ...item, isEdit: 1 });
                        setOpenDialog('add');
                    }}
                />
                <CmsIconButton
                    tooltip="Chỉnh sửa địa chỉ"
                    delay={50}
                    icon="edit"
                    className="bg-orange-500 text-white shadow-3  hover:bg-orange-900"
                    onClick={() => {
                        setDetail({ ...item, isEdit: 2 });
                        setOpenDialog('add');
                    }}
                />
            </div>
        ) || []
    })), [entities])

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };

    const handleCloseDialog = () => {
        setOpenDialog('');
        setDetail(null);
    }


    const handleComplete = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(partner.create(values));
                    unwrapResult(resultAction);
                    if (!values?.id) {
                        form.resetForm();
                    }
                    setOpenDialog('');
                    getListTable(search);
                } catch (error) {
                } finally {
                    form.setSubmitting(false)
                }
            },
            close: () => form.setSubmitting(false)
        });
    }
    // console.log('filterOptions', filterOptions)

    return (
        <>
            {openDialog === 'add'
                && <AddDialog
                    title={detail ? 'Chỉnh sửa đối tác' : 'Thêm mới đối tác'}
                    detail={detail}
                    open={openDialog === 'add'}
                    onSave={handleComplete}
                    handleClose={handleCloseDialog}
                />}

            {openDialog === 'user'
                && <AddCusDialog
                    title={'Thêm người vào đối tác'}
                    detail={detail}
                    options={{ customers }}
                    open={openDialog === 'user'}
                    onSave={handleComplete}
                    handleClose={handleCloseDialog}
                />}


            <CmsCardedPage
                title={'Quản lý thành viên đối tác'}
                icon="whatshot"
                // leftBottomHeader={leftBottomHeader}
                rightHeaderButton={
                    <CmsButton label={`Trở về`}
                        variant="text"
                        color="default"
                        component={Link}
                        to={'/partner'}
                        className="mx-2"
                        startIcon="arrow_back" />
                }
                content={
                    <CmsTableBasic
                        className="w-full h-full"
                        isServerSide={true}
                        data={data}
                        search={search}
                        columns={columns}
                        loading={loading}
                    />
                }
            // toolbar={
            //     <div className="w-full flex items-center justify-between px-12">
            //         <div className="flex items-center justify-end">
            //         </div>
            //     </div>
            // }
            />
        </>

    )
}

export default withReducer(keyStore, reducer)(ProductView);