import React from "react";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { keyStore } from "../common";
import { CmsButton, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { useDispatch, useSelector } from "react-redux";
import GenFilterOption from "./index/GenFilterOption";
import { alertInformation, initColumn } from "@widgets/functions";
import { useEffect } from "react";
import { editContract, getList, setSearch, statusContract } from 'app/main/contract/store/contractSlice'
import { useState } from "react";
import EditDialog from "./edit/EditDialog"
import { DisplayDateTime } from "@widgets/functions/ConvertDateTime";
import StatusDialog from "./edit/StatusDialog";
import { unwrapResult } from "@reduxjs/toolkit";
import { Chip } from "@material-ui/core";

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "title", label: "Tiêu đề", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "datecreate", label: "Ngày tạo", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "status", label: "Trạng thái", alignHeader: "center", alignValue: "center", sortable: false }),
    //new initColumn({ field: "approve", label: "Thông tin duyệt", alignHeader: "left", alignValue: "left", sortable: false }),
]

function ContractComponent() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].contract.search)
    const entities = useSelector(store => store[keyStore].contract.entities)
    const loading = useSelector(store => store[keyStore].contract.loading)
    const [open, setOpen] = useState('')
    const [item, setItem] = useState(null)

    useEffect(() => {
        dispatch(getList({ ...search, status: parseInt(search.status) }))
    }, [dispatch, search])

    const handleRefresh = () => {

    }
    const handleCreateDialog = () => {
        setOpen('edit')
        setItem(null)
    }

    const handleUpdateDialog = (value) => {
        setOpen('edit')
        setItem(value)
    }

    const handleStatusDialog = (value) => {
        setOpen('status')
        setItem(value)
    }

    const handleCloseDialog = () => {
        setOpen('')
        setItem(null)
    }

    const handleSave = (value, formik) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: value,
            confirm: async (value) => {
                formik.setSubmitting(true);
                try {
                    const resultAction = await dispatch(editContract(value));
                    unwrapResult(resultAction);
                    handleCloseDialog();
                    dispatch(getList({ ...search, status: parseInt(search.status) }))
                } catch (error) { }
                finally {
                    formik.setSubmitting(false);
                }
            },
            close: () => formik.setSubmitting(false)
        })
    }

    const data = React.useMemo(() => entities?.map(x => ({
        ...x,
        datecreate: DisplayDateTime(x.datecreate),
        status: (
            <React.Fragment>
                {
                    x.status === 0
                    &&
                    <Chip label="Đã xóa" className="bg-red-500 text-white" />
                }

                {
                    x.status === 1
                    &&
                    <Chip label="Đã tạo" className="bg-blue-500 text-white" />
                }

                {
                    x.status === 2
                    &&
                    <Chip label="Đang sử dụng" className="bg-green-500 text-white" />
                }
            </React.Fragment>
        ),
        action: <div className="w-full flex flex-row space-x-8">
            <CmsIconButton
                icon="edit"
                tooltip={'Cập nhật'}
                className="text-white bg-green-500 hover:bg-green-700"
                onClick={() => handleUpdateDialog(x)}
            />
            <CmsIconButton
                icon="sync"
                tooltip={'Chuyển trạng thái'}
                className="text-white bg-blue-500 hover:bg-blue-700"
                onClick={() => handleStatusDialog(x)}
            />
            {
                x.status !== 0
                &&
                <CmsIconButton
                    icon="delete"
                    tooltip={'Xóa'}
                    className="text-white bg-red-500 hover:bg-red-700"
                    onClick={() => {
                        alertInformation({
                            text: `Xác nhận thao tác`,
                            data: {},
                            confirm: async () => {
                                try {
                                    const resultAction = await dispatch(statusContract([
                                        {
                                            id: x.id,
                                            status: 0
                                        }
                                    ]));
                                    unwrapResult(resultAction);
                                    handleCloseDialog();
                                    dispatch(getList({ ...search, status: parseInt(search.status) }))
                                } catch (error) { }
                                finally {
                                }
                            },
                        })
                    }}
                />
            }
        </div>
    })) || [], [entities])

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
                <>
                    <CmsTableBasic
                        className="w-full h-full"
                        isServerSide={false}
                        data={data}
                        search={search}
                        columns={columns}
                        loading={loading}
                    />
                    {open === 'edit' &&
                        <EditDialog
                            open={open === 'edit'}
                            item={item}
                            handleSave={handleSave}
                            handleClose={handleCloseDialog}
                        />}
                    {open === 'status' &&
                        <StatusDialog
                            open={open === 'status'}
                            item={item}
                            handleClose={() => setOpen('')}
                        />}
                </>
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        {/* <GenFilterOption
                            search={search}
                            setSearch={(value) => dispatch(setSearch(value))}
                        /> */}
                    </div>
                    <div className="flex items-center justify-end space-x-8">
                        <CmsButton size="small" label="Tạo mới" startIcon="add" onClick={() => handleCreateDialog()} className="bg-orange-500 hover:bg-orange-700" />
                        <CmsButton size="small" label="Refresh" startIcon="refresh" onClick={() => handleRefresh()} className="bg-grey-500 hover:bg-grey-700" />
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
export default withReducer(keyStore, reducer)(ContractComponent);