import React from 'react';
import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import FilterOptionView from "./filterOptionView";
import reducer from "../../store";
import { getList as getAccount, resetSearch, setSearch } from "../../store/accountSlice";
import { Chip } from "@material-ui/core";
import { insertUser, updateUser } from "../../store/customerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import AddUserDialog from "./AddUserDialog";
import Connect from '@connect';
import ResetPasswordDialog from './ResetPasswordDialog';
import { showMessage } from 'app/store/fuse/messageSlice';
import ChangePasswordDialog from './ChangePasswordDialog';

const columns = [
    new initColumn({ field: "email", label: "Email", alignHeader: "center", alignValue: "left", sortable: false }),
    // new initColumn({ field: "password", label: "Mật Khẩu", alignHeader: "center", alignValue: "center", sortable: false }),
    // new initColumn({ field: "secret", label: "Secret", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "status", label: "Trạng Thái", alignHeader: "center", alignValue: "center", sortable: false }),
]

function ProductView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].account.search)
    const loading = useSelector(store => store[keyStore].account.loading)
    const entities = useSelector(store => store[keyStore].account.entities)
    console.log("CHECK ACCOUNT LIST HERE >>> ", entities)
    const user = useSelector(store => store.auth.user.user)

    const [filterOptions, setFilterOptions] = useState(null);
    const [openDialog, setOpenDialog] = useState("");
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        dispatch(getAccount(search))
    }, [dispatch, search])

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        email: item.email,
        password: item.password,
        secret: item.secret,
        status: item.status ? <Chip size="small" label={'Hoạt động'} color="primary" /> : <Chip size="small" label={'Đã ngừng'} color="default" />,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                {/* <CmsIconButton icon="edit" className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white" onClick={() => {
                    setOpenDialog('user');
                    setDetail(item);
                }} /> */}
                <CmsIconButton
                    icon="vpn_key"
                    tooltip={'Quên mật khẩu'}
                    className="bg-blue-500 hover:bg-blue-700 hover:shadow-2 text-white" onClick={(e) => {
                        setOpenDialog('password');
                        setDetail({ ...item });
                    }} />

                {
                    user === item?.email
                    &&
                    <CmsIconButton
                        icon="vpn_key"
                        tooltip={'Đổi mật khẩu'}
                        className="bg-orange-500 hover:bg-orange-700 hover:shadow-2 text-white" onClick={(e) => {
                            setOpenDialog('changePassword');
                            setDetail({ ...item });
                        }} />
                }

            </div>
        ) || []
    })), [entities, user])

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };

    const handleCloseDialog = () => {
        setOpenDialog("");
        setDetail(null);
    }

    const handleSubmit = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = values?.secret
                        ? await dispatch(updateUser(values))
                        : await dispatch(insertUser(values))
                    unwrapResult(resultAction);
                    if (!values?.secret) {
                        form.resetForm();
                    }
                    setOpenDialog('');
                    dispatch(getAccount(search))
                } catch (error) {
                } finally {
                    form.setSubmitting(false)
                }
            },
            close: () => form.setSubmitting(false)
        });
    }

    return (
        <>
            {
                openDialog === 'user'
                &&
                <AddUserDialog
                    open={openDialog === 'user'}
                    handleClose={handleCloseDialog}
                    handleSubmit={handleSubmit}
                    detail={detail}
                    title={`${detail ? 'Chỉnh sửa tài khoản' : 'Thêm mới tài khoản'}`}
                />
            }

            {
                openDialog === "password"
                &&
                <ResetPasswordDialog
                    open={openDialog === 'password'}
                    handleClose={handleCloseDialog}
                    handleSubmit={async (values, form) => {
                        alertInformation({
                            text: `Xác nhận thao tác`,
                            data: { values, form },
                            confirm: async () => {
                                try {
                                    await Connect.live.identity.confirmForgotPass(values);
                                    await Connect.live.identity.updateForgotPass(values);
                                    setTimeout(() => {
                                        dispatch(showMessage({ variant: "success", message: 'Thành công' }))
                                    }, 100);
                                    setOpenDialog('');
                                    dispatch(getAccount(search))
                                } catch (error) {
                                } finally {
                                    form.setSubmitting(false)
                                }
                            },
                            close: () => form.setSubmitting(false)
                        });
                    }}
                    detail={detail}
                    title={`Quên mật khẩu`}
                />
            }

            {
                openDialog === "changePassword"
                &&
                <ChangePasswordDialog
                    open={openDialog === 'changePassword'}
                    handleClose={handleCloseDialog}
                    handleSubmit={async (values, form) => {
                        alertInformation({
                            text: `Xác nhận thao tác`,
                            data: { values, form },
                            confirm: async () => {
                                try {
                                    await Connect.live.identity.changePass(values);
                                    setTimeout(() => {
                                        dispatch(showMessage({ variant: "success", message: 'Thành công' }))
                                    }, 100);
                                    setOpenDialog('');
                                    dispatch(getAccount(search))
                                } catch (error) {
                                } finally {
                                    form.setSubmitting(false)
                                }
                            },
                            close: () => form.setSubmitting(false)
                        });
                    }}
                    detail={detail}
                    title={`Đổi mật khẩu`}
                />
            }

            <CmsCardedPage
                title={'Quản lý tài khoản'}
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
                        setSearch={(value) => dispatch(setSearch(value))}
                        isPagination={false}
                        filterOptions={
                            <FilterOptionView
                                filterOptions={filterOptions}
                                search={search}
                                setFilterOptions={setFilterOptions}
                                resetSearch={() => dispatch(resetSearch())}
                                setSearch={(value) => dispatch(setSearch({ ...value, pageNumber: 1 }))}
                            />
                        }
                        openFilterOptions={Boolean(filterOptions)}
                    />
                }
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <div className="flex items-center justify-items-start">
                            <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType).filter(x => x.id === FilterOptions.FilterType.basic.id)} />
                        </div>
                        <div className="flex items-center justify-end">
                            <CmsButton className="bg-orange-700 text-white hover:bg-orange-900" label="Thêm mới" startIcon="add" onClick={() => setOpenDialog('user')} />
                            {/* <CmsMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} data={[
                            { id: 1, name: "Xuất Excel", icon: "upgrade", tooltip: "Chỉ hỗ trợ export 5000 chương trình", onClick: () => dispatch(exportExcel({ ...search, Limit: 5000 })) },
                            { id: 2, name: "Tải Lại", icon: "cached", onClick: () => dispatch(getEditors({ Page: 1, Limit: 10 })) },
                            { id: 2, name: "Trợ Giúp", icon: "help_outline" },
                        ]} /> */}
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default withReducer(keyStore, reducer)(ProductView);