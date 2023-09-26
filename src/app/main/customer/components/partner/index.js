import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { initColumn } from "@widgets/functions";
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

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "email", label: "Email", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "password", label: "Mật Khẩu", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "secret", label: "Secret", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "status", label: "Trạng Thái", alignHeader: "left", alignValue: "left", sortable: false }),
]

function ProductView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].account.search);
    const loading = useSelector(store => store[keyStore].account.loading);
    const entities = useSelector(store => store[keyStore].account.entities);
    const [detail, setDetail] = useState(null);
    const [openDialog, setOpenDialog] = useState("");

    const [filterOptions, setFilterOptions] = useState(null);

    useEffect(() => {
        dispatch(getAccount(search))
    }, [dispatch, search])

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        email: item.email,
        password: item.password,
        secret: item.secret,
        status: item.status,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                <CmsIconButton icon="edit" className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white" />
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
                    const resultAction = await dispatch(legal.ticket.complete(values));
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
                    title='Thêm mới đối tác'
                    detail={detail}
                    open={openDialog === 'add'}
                    onSave={handleComplete}
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
                        data={data}
                        search={search}
                        columns={columns}
                        loading={loading}
                    />
                }
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <div className="flex items-center justify-end">
                        </div>
                    </div>
                }
            />
        </>

    )
}

export default withReducer(keyStore, reducer)(ProductView);