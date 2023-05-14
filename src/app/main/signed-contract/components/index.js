import React from "react";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { keyStore } from "../common";
import { CmsButton, CmsCardedPage, CmsTableBasic } from "@widgets/components";
import { useDispatch, useSelector } from "react-redux";
import GenFilterOption from "./index/GenFilterOption";
import { initColumn } from "@widgets/functions";
import { useEffect } from "react";
import { getList as getCusContract } from 'app/main/signed-contract/store/signedContractSlice'
import { useState } from "react";
import EdiDialog from "./edit/EdiDialog"
import { DisplayDateTime } from "@widgets/functions/ConvertDateTime";

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "orderid", label: "id đơn hàng", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "cusname", label: "tên khách hàng", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "datesign", label: "ngày kí", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "expire", label: "số ngày hết hạn", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "reason", label: "lý do", alignHeader: "left", alignValue: "left", sortable: false }),
]

function ContractComponent() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].signedContract.search)
    const entities = useSelector(store => store[keyStore].signedContract.entities)
    const loading = useSelector(store => store[keyStore].signedContract.loading)
    const [open, setOpen] = useState('')
    const [id, setId] = useState(0)

    useEffect(() => {
        dispatch(getCusContract(search))
    }, [dispatch, search])

    const handleRefresh = () => {

    }
    const handleCreateDialog = () => {
        setOpen('edit')
        setId(0)
    }

    const data = React.useMemo(() => entities?.map(x=>({...x, datesign: DisplayDateTime(x?.datesign)})) || [], [entities])

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
                        <EdiDialog
                            open={open === 'edit'}
                            id={id}
                            handleClose={(value) => setOpen(value)}
                        />}
                </>
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        <GenFilterOption />
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