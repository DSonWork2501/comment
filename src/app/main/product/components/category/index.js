import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton } from "@widgets/components";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import reducer from "../../store";
import { editCate, getById, getList as getCategory } from "../../store/categorySlice";
import EditCateContent from "./edit";
import { Link } from 'react-router-dom';

function CategoryView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].category.search)
    const entities = useSelector(store => store[keyStore].category.entities)
    const [filterOptions, setFilterOptions] = useState(null);
    const [open, setOpen] = useState(null);
    const [editId, setEditId] = useState(0);

    useEffect(() => {
        dispatch(getCategory(search))
    }, [dispatch, search])

    // const HandleChangeStatus = useCallback((status, item) => {
    //     alertInformation({
    //         text: `Bạn có muốn ${status === 1 ? 'BẬT' : 'TẮT'} trạng thái thể loại ?`,
    //         data: [
    //             {
    //                 ...item, status: status
    //             }
    //         ],
    //         confirm: (data) => {
    //             dispatch(changeStatus(data))
    //         }
    //     })
    // }, [dispatch]);


    const handleFilterType = (event, value) => {
        setFilterOptions(value)
    };

    const HandleSaveData = (value) => {
        dispatch(editCate(value))
    };

    const HandleAddNew = () => {
        setEditId(0)
        setOpen('edit')
    };

    const HandleRefresh = () => {
        dispatch(getCategory(search))
    };


    return (
        <CmsCardedPage
            title={'Quản lý danh mục'}
            subTitle={'Quản lý danh mục'}
            icon="whatshot"
            // leftBottomHeader={leftBottomHeader}
            rightHeaderButton={
                <div>

                </div>
            }
            content={
                <div className="w-full h-full overflow-x-hidden">
                    <div className="flex  px-8 pt-8 -mx-8 flex-wrap">
                        {
                            entities?.data?.length && entities?.data.map(val => (
                                <div className="lg:w-1/5 md:w-1/4 sm:w-1/2 w-full p-8" key={val.id}>
                                    <div className="item shadow-4 rounded-8 p-8 relative">
                                        <img className="object-contain h-256 m-auto" src={`${process.env.REACT_APP_BASE_URL_IMG}${val.image}`} alt="imageProduct" />
                                        <div>
                                            <b>
                                                Tên:
                                            </b>
                                            {val.name}
                                        </div>
                                        <div>
                                            <b>
                                                Loại:
                                            </b>
                                            {
                                                val.type === 1 && "Home subcription"
                                            }
                                            {
                                                val.type === 0 && "Thường"
                                            }
                                        </div>
                                        <div className="flex absolute flex-col-reverse top-8 right-8">
                                            <CmsIconButton
                                                tooltip="Chỉnh sửa"
                                                delay={50}
                                                icon="edit"
                                                onClick={() => {
                                                    dispatch(getById(val.id))
                                                    setOpen('edit')
                                                    setEditId(val.id)
                                                }}
                                                className="bg-green-500 text-white shadow-3  hover:bg-green-900 opacity-0"
                                            />
                                            <CmsIconButton
                                                tooltip="Danh sách sản phẩm"
                                                delay={50}
                                                icon="format_list_numbered"
                                                className="bg-blue-500 text-white shadow-3  hover:bg-blue-900 mb-4 opacity-0"
                                                component={Link}
                                                to={`/product-category/${val.id}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* <CmsTableBasic
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
                    /> */}
                    {
                        open === 'edit' &&
                        <EditCateContent
                            id={editId}
                            open={open === 'edit'}
                            handleClose={() => setOpen('')}
                            handleSave={HandleSaveData}
                        />
                    }
                </div>
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        <CmsButtonGroup size="small" value={filterOptions} onChange={handleFilterType} data={Object.values(FilterOptions.FilterType)} />
                    </div>
                    <div className="flex items-center justify-end space-x-8">
                        <CmsButton className="bg-orange-700 text-white hover:bg-orange-900" label="Thêm mới" startIcon="add" onClick={() => HandleAddNew()} />
                        <CmsButton className="bg-grey-500 text-white hover:bg-grey-700" label="Làm mới" startIcon="refresh" onClick={() => HandleRefresh()} />
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