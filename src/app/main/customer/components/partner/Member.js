import { CmsButton, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import reducer from "../../store";
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
    new initColumn({ field: "name", label: "Tên thành viên", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "phone", label: "Sđt", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "partnername", label: "Đối tác", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "totalorder", label: "Tổng đơn", alignHeader: "right", alignValue: "right", sortable: false }),
    new initColumn({ field: "totalvalue", label: "Tổng tiền", alignHeader: "right", alignValue: "right", sortable: false }),
    new initColumn({ field: "rolename", label: "Loại thành viên", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "description", label: "Ghi chú", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "status", label: "Trạng thái", alignHeader: "center", alignValue: "center", sortable: false }),
]

function ProductView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].partner.search);
    const loading = useSelector(store => store[keyStore].partner.loading);
    const entities = useSelector(store => store[keyStore].partner.members);
    const customers = useSelector(store => store[keyStore].customer.entities?.data) || [];
    const [detail, setDetail] = useState(null);
    const [openDialog, setOpenDialog] = useState("");
    const params = useParams(), id = params.id;


    const getListTable = useCallback((search) => {
        if (id) {
            dispatch(partner.member.getList({ ...search, partnerID: id }));
            dispatch(partner.getList({ partnerId: id }))
        }
    }, [dispatch, id])

    useEffect(() => {
        getListTable({ ...search });
    }, [search, getListTable, dispatch,])

    useEffect(() => {
        dispatch(getCustomers())
    }, [dispatch])

    const data = entities?.data?.map(item => ({
        ...item,
        id: item.id,
        totalorder: ((item?.totalorder) ? item.totalorder.toLocaleString('en-US') : '0'),
        totalvalue: ((item?.totalvalue) ? item.totalvalue.toLocaleString('en-US') : '0'),
        address: ((item?.address ? `${item?.address} ,` : '') + (item?.wardname ? `${item?.wardname} ,` : '') + (item?.districtname ? `${item?.districtname} ,` : '') + (item?.provincename ? `${item?.provincename}` : '')),
        status: (
            item?.status
                ? <Chip label="Hoạt động" className="bg-green-500 text-white" />
                : <Chip label="Đã ngừng" className="bg-red-500 text-white" />
        ),
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                <CmsIconButton
                    tooltip="Xóa"
                    delay={50}
                    icon="delete"
                    className="bg-red-500 text-white shadow-3  hover:bg-red-900"
                    onClick={() => {
                        alertInformation({
                            text: `Xác nhận thao tác`,
                            data: {},
                            confirm: async () => {
                                try {
                                    const resultAction = await dispatch(partner.member.update([{ id: item.id, partnerid: 0 }]));
                                    unwrapResult(resultAction);
                                    getListTable(search);
                                } catch (error) { }
                                finally {
                                }
                            },
                        })
                    }}
                />
            </div>
        ) || []
    }))

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