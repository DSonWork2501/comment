import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsLabel, CmsTableBasic } from "@widgets/components";
import { initColumn } from "@widgets/functions";
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

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "email", label: "Email", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "name", label: "Tên Khách Hàng", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "phone", label: "Phone", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "gender", label: "Gender", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "statusName", label: "Trạng thái", alignHeader: "left", alignValue: "left", sortable: false }),
]

function CategoryView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)
    const entities = useSelector(store => store[keyStore].customer.entities)
    const [filterOptions, setFilterOptions] = useState(null);
    const [open, setOpen] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        dispatch(getCustomer(search))
    }, [dispatch, search])

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        email: item.email,
        name: item.name,
        phone: item.phone,
        gender: item.gender,
        status: item.status,
        statusName: <CmsLabel component={'span'} content={statusCus[item.status].name} className={clsx('text-white p-6 rounded-12', statusCus[item.status].className)} />,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">
                {/* <CmsIconButton icon="edit" className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white" /> */}
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

    // console.log('filterOptions', filterOptions)

    return (
        <CmsCardedPage
            title={'Danh sách khách hàng 123'}
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
    )
}

export default withReducer(keyStore, reducer)(CategoryView);