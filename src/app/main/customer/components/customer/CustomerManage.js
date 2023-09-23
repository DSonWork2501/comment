import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
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
import { getList as getCustomer, insertCus, resetSearch, setSearch } from "../../store/customerSlice";
import EditCusContent from "./edit/EditCus";
import { statusCus } from "../../model";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEnvelope, faUserLock, faUserMinus, faUserPlus, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import AddUserDialog from "./edit/AddUserDialog";
import AddBlackDialog from "./edit/AddBlackDialog";
import OverviewDialog from "./edit/OverviewDialog";
import History from "@history";

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", style: { width: 50 }, sortable: false }),
    new initColumn({ field: "name", label: "Tên Khách Hàng", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "phone", label: "Mobile", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "stage", label: "Stage", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "tags", label: "Tags", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "agent", label: "Agent", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "call", label: "Cuộc gọi gần nhất", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "created", label: "Ngày thêm", alignHeader: "center", alignValue: "left", sortable: false }),
    new initColumn({ field: "totalorder", label: "Tổng đơn hàng", alignHeader: "right", alignValue: "right", sortable: true }),
    new initColumn({ field: "totalvalue", label: "Tổng tiền", alignHeader: "right", alignValue: "right", sortable: true }),
    new initColumn({ field: "async", label: "Lần đồng bộ cuối", alignHeader: "center", alignValue: "left", sortable: true }),
    //new initColumn({ field: "gender", label: "Gender", alignHeader: "center", alignValue: "left", sortable: false }),
    // new initColumn({ field: "statusName", label: "Trạng thái", alignHeader: "center", alignValue: "left", sortable: false }),
]

function CategoryView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)
    const entities = useSelector(store => store[keyStore].customer.entities)
    const [filterOptions, setFilterOptions] = useState(null);
    const [open, setOpen] = useState('');
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        dispatch(getCustomer(search))
    }, [dispatch, search])

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        email: item.email,
        totalorder: (
            item?.totalorder
                ? <CmsLabel content={`${(item.totalorder)?.toLocaleString('en-US')}`} />
                : '0'
        ),
        totalvalue: (
            item?.totalvalue
                ? <CmsLabel content={`${(item.totalvalue)?.toLocaleString('en-US')}`} />
                : '0'
        ),
        name: <>
            <b className="text-purple-900">
                {item.name}
            </b>
            <div>
                <FontAwesomeIcon
                    icon={faVenusMars}
                    style={{ width: 14 }}
                    className="text-11 mr-2 text-blue-400" />
                {
                    item?.gender ? 'Nam' : 'Nữ'
                }
            </div>
            <div>
                <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ width: 14 }}
                    className="text-11 mr-2 text-blue-400" />
                {
                    item?.email
                }
            </div>
        </>,
        phone: item.phone,
        gender: item.gender,
        status: item.status,
        statusName: <CmsLabel component={'span'} content={statusCus[item.status].name} className={clsx('text-white p-6 rounded-12', statusCus[item.status].className)} />,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                <CmsIconButton
                    tooltip="Gán nhân viên phụ trách"
                    delay={50}
                    icon={<FontAwesomeIcon icon={faUserPlus} style={{ height: 18, width: 18, marginBottom: 7 }} />}
                    className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
                    onClick={() => {
                        setDetail(item);
                        setOpen('assign')
                    }} />

                <CmsIconButton
                    tooltip="Xóa nhân viên phụ trách"
                    delay={50}
                    icon={<FontAwesomeIcon icon={faUserMinus} style={{ height: 18, width: 18, marginBottom: 7 }} />}
                    className="bg-red-500 text-white shadow-3  hover:bg-red-900"
                    onClick={() => {
                        alertInformation({
                            text: `Xác nhận thao tác`,
                            data: {},
                            confirm: async () => {

                            },
                        });
                    }} />

                <CmsIconButton
                    tooltip="Thêm vào danh sách không liên hệ"
                    delay={50}
                    icon={<FontAwesomeIcon icon={faUserLock} style={{ height: 18, width: 18, marginBottom: 7 }} />}
                    className="bg-orange-500 text-white shadow-3  hover:bg-orange-900"
                    onClick={() => {
                        setDetail(item);
                        setOpen('black')
                    }} />

                <CmsIconButton
                    tooltip="Hồ sơ khách hàng"
                    delay={50}
                    icon={<FontAwesomeIcon icon={faAddressCard} style={{ height: 18, width: 18, marginBottom: 7 }} />}
                    className="bg-green-500 text-white shadow-3  hover:bg-green-900"
                    onClick={() => {
                        History.push('/customer-manage/1/overview/1')
                    }} />

            </div>
        ) || []
    })), [entities])

    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };

    const HandleInsertCus = () => {
        setOpen('edit')
        setEmail('')
    }
    const HandleInsertCusData = (value) => {
        dispatch(insertCus(value))
    }

    const handleCloseDialog = () => {
        setDetail(null);
        setOpen('');
    }

    const handleSubmit = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {

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
                open === 'assign'
                &&
                <AddUserDialog
                    open={open === 'assign'}
                    handleClose={handleCloseDialog}
                    handleSave={handleSubmit}
                    detail={detail}
                    title="Gán nhân viên phụ trách"
                />
            }

            {
                open === 'black'
                &&
                <AddBlackDialog
                    open={open === 'black'}
                    handleClose={handleCloseDialog}
                    handleSave={handleSubmit}
                    detail={detail}
                    title="Thêm vào danh sách không liên hệ"
                />
            }

            {
                open === 'profile'
                &&
                <OverviewDialog
                    open={open === 'profile'}
                    handleClose={handleCloseDialog}
                    detail={detail}
                    title="Hồ sơ khách hàng"
                    size="xl"
                />
            }

            <CmsCardedPage
                title={'Danh sách khách hàng'}
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
                            isServerSide={true}
                            data={data}
                            search={search}
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
                        />
                        <EditCusContent
                            open={open === 'edit'}
                            handleClose={() => setOpen('')}
                            handleSave={HandleInsertCusData}
                            email={email}
                        />
                    </>
                }
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <div className="flex items-center justify-items-start">
                            <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType).filter(x => x.id === FilterOptions.FilterType.basic.id)} />
                        </div>
                        <div className="flex items-center justify-end">
                            <CmsButton className="bg-orange-700 text-white hover:bg-orange-900" label="Thêm mới" startIcon="add" onClick={HandleInsertCus} />
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

export default withReducer(keyStore, reducer)(CategoryView);