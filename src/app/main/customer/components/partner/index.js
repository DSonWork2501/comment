import { CmsButton, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
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
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddManyCusDialog from "./AddManyCusDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const columns = [
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

    const getListTable = useCallback((search) => {
        dispatch(partner.getList(search));
    }, [dispatch])

    useEffect(() => {
        getListTable(search);
    }, [search, getListTable, dispatch])

    useEffect(() => {
        dispatch(getCustomers())
    }, [dispatch])

    const data = useMemo(() => entities?.data?.map(item => ({
        ...item,
        id: item.id,
        name: (item?.default ? <div className="font-800">{item.name}</div> : <div></div>),
        phone: (item?.default ? <div>{item.phone}</div> : <div></div>),
        address: ((item?.address ? `${item?.address} ,` : '') + (item?.wardname ? `${item?.wardname} ,` : '') + (item?.districtname ? `${item?.districtname} ,` : '') + (item?.provincename ? `${item?.provincename}` : '')),
        status: (
            item?.status
                ? <Chip label="Hoạt động" className="bg-green-500 text-white" />
                : <Chip label="Đã ngừng" className="bg-red-500 text-white" />
        ),
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                {
                    Boolean(item.default)
                    &&
                    <>
                        <CmsIconButton
                            tooltip="Thêm thành viên"
                            delay={50}
                            icon="add"
                            className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
                            onClick={() => {
                                setDetail({ partnerid: item.id });
                                setOpenDialog('user');
                            }}
                        />
                        <CmsIconButton
                            tooltip="Thêm thành viên qua email"
                            delay={50}
                            icon={<FontAwesomeIcon icon={faUserPlus} fontSize={22} className="mb-4" />}
                            className="bg-blue-900 text-white shadow-3  hover:bg-blue-900"
                            onClick={() => {
                                setDetail({ partnerid: item.id });
                                setOpenDialog('users');
                            }}
                        />
                        <CmsIconButton
                            tooltip="Thêm thành viên qua excel"
                            delay={50}
                            icon={<FontAwesomeIcon icon={faUserPlus} fontSize={22} className="mb-4" />}
                            className="bg-pink-900 text-white shadow-3  hover:bg-pink-900"
                            onClick={() => {
                                window.open(`/partner/${item.id}/import`, '_blank')
                            }}
                        />
                        <CmsIconButton
                            tooltip="Danh dách thành viên"
                            delay={50}
                            icon="list"
                            className="bg-green-500 text-white shadow-3  hover:bg-green-900"
                            component={Link}
                            to={`/partner/${item.id}`}
                        />
                        <CmsIconButton
                            tooltip="Chỉnh sửa thông tin"
                            delay={50}
                            icon="edit"
                            className="bg-orange-900 text-white shadow-3  hover:bg-orange-900"
                            onClick={() => {
                                setDetail({ ...item, isEdit: 1 });
                                setOpenDialog('add');
                            }}
                        />
                        <CmsIconButton
                            tooltip="Thêm mới chi nhánh"
                            delay={50}
                            icon={<FontAwesomeIcon icon={faCodeBranch} fontSize={22} className="mb-4" />}
                            className="bg-orange-500 text-white shadow-3  hover:bg-orange-900"
                            onClick={() => {
                                setDetail({ ...item, isEdit: 2, isAddMore: 1, customercity: null, customerdistrict: null, customerward: null, customeraddress: '', recipient: '', recipientphone: '', recipientemail: '' });
                                setOpenDialog('add');
                            }}
                        />
                    </>
                }

                <CmsIconButton
                    tooltip="Chỉnh sửa địa chỉ"
                    delay={50}
                    icon="edit"
                    className="bg-orange-500 text-white shadow-3  hover:bg-orange-900"
                    onClick={() => {
                        setDetail({ ...item, isEdit: 2, customercity: item.province, customerdistrict: item.district, customerward: item.ward, customeraddress: item.address });
                        setOpenDialog('add');
                    }}
                />

            </div>
        ) || []
    })), [entities])

    const handleCloseDialog = () => {
        setOpenDialog('');
        setDetail(null);
    }

    const callApiAs = async (values, form, path) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(path);
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

    const handleComplete = (values, form) => {
        if (values.id) {
            callApiAs(values, form, partner.update(values));
        } else {
            callApiAs(values, form, partner.create(values));
        }
    }

    const handleSaveMember = (values, form) => {
        callApiAs(values, form, partner.member.update([values]));
    }

    const handleSentInvite = (values, form) => {
        let data = {
            value: values.email.map(val => ({
                email: val,
                phone: '',
                name: ''
            })),
            partnerid: values.partnerid
        };

        callApiAs(data, form, partner.member.invite(data));
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
                    onSave={handleSaveMember}
                    handleClose={handleCloseDialog}
                />}

            {openDialog === 'users'
                && <AddManyCusDialog
                    title={'Thêm người vào đối tác qua email'}
                    detail={detail}
                    open={openDialog === 'users'}
                    onSave={handleSentInvite}
                    handleClose={handleCloseDialog}
                />}

            <CmsCardedPage
                title={'Quản lý đối tác'}
                icon="whatshot"
                // leftBottomHeader={leftBottomHeader}
                rightHeaderButton={
                    <div>
                        <CmsButton
                            onClick={() => {
                                setOpenDialog('add');
                            }}
                            className="bg-orange-700 text-white hover:bg-orange-900"
                            label="Thêm mới"
                            startIcon="add" />
                    </div>
                }
                content={
                    <CmsTableBasic
                        className="w-full h-full"
                        isServerSide={true}
                        isPagination={false}
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