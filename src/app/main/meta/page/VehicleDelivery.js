
import React, { useState, useEffect, useCallback } from 'react';
import { CmsCardedPage, CmsTableBasic, CmsLabel, CmsIconButton, CmsTab, CmsButton } from '@widgets/components';
import { Box, styled } from '@material-ui/core';
import { alertInformation, initColumn } from '@widgets/functions';
import withReducer from 'app/store/withReducer';
import reducer, { setSelected, meta } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { keyStore, links } from '../common';
import CodeDialog from '../components/CodeDialog';
import { unwrapResult } from '@reduxjs/toolkit';
import History from '@history';
import AddVehicleDialog from '../components/AddVehicleDialog';

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .inner-scroll>div": {
        minHeight: '70px'
    },
});

// const initialValues = {
//     unitID: null,
//     groupID: null,
//     codeName: "",
//     status: null,
//     page: 1,
//     limit: 10,
// };

// const Filter = ({ onSearch, filterOptions, options }) => {
//     const { units, groups } = options;
//     const formik = useFormik({
//         initialValues,
//         onSubmit: handleSubmit
//     })

//     function handleSubmit(value) {
//         let values = { ...value };

//         onSearch(values);
//     }

//     return <form onSubmit={formik.handleSubmit} >
//         <CmsFilter
//             ftype={filterOptions}
//             fadvance={
//                 <React.Fragment>
//                     <div className="w-full flex flex-wrap">
//                         <div className=" w-full md:w-1/3 sm:w-1/2 p-16  mb-6  relative z-10">
//                             <div className="sm:flex flex-wrap">
//                                 <CmsFormikTextField
//                                     label="Tên hợp đồng"
//                                     name={`codeName`}
//                                     size="small"
//                                     className="my-8"
//                                     formik={formik} />
//                                 <CmsFormikAutocomplete
//                                     className="my-8 inline-flex"
//                                     name="unitID"
//                                     formik={formik}
//                                     label="Đơn vị ban hành"
//                                     data={units}
//                                     size="small"
//                                     autocompleteProps={{
//                                         ChipProps: {
//                                             size: 'small'
//                                         },
//                                         size: 'small',
//                                     }}
//                                     valueIsId />
//                             </div>
//                         </div>
//                         <div className="w-full md:w-1/3 sm:w-1/2 p-16  mb-6 ">
//                             <div className="sm:flex flex-wrap">
//                                 <CmsFormikAutocomplete
//                                     className="my-8 inline-flex"
//                                     name="groupID"
//                                     formik={formik}
//                                     label="Nhóm hợp đồng"
//                                     data={groups}
//                                     size="small"
//                                     autocompleteProps={{
//                                         ChipProps: {
//                                             size: 'small'
//                                         },
//                                         size: 'small',
//                                     }}
//                                     valueIsId />
//                                 <CmsFormikAutocomplete
//                                     className="my-8 inline-flex"
//                                     name="status"
//                                     formik={formik}
//                                     label="Trạng thái"
//                                     data={statusForm}
//                                     size="small"
//                                     autocompleteProps={{
//                                         ChipProps: {
//                                             size: 'small'
//                                         },
//                                         size: 'small',
//                                     }}
//                                     valueIsId />
//                             </div>
//                         </div>
//                         <div className="flex items-end w-full p-16 md:w-1/3 sm:w-1/2 mb-6 ">
//                             <div className="my-8">
//                                 <Button
//                                     style={{
//                                         background: '#FF6231',
//                                         color: 'white',
//                                         position: 'relative',
//                                         top: -1
//                                     }}
//                                     size='small'
//                                     variant="contained"
//                                     type='submit'
//                                     className='mr-8'
//                                 >
//                                     <Icon>
//                                         search
//                                     </Icon>
//                                 </Button>
//                                 <Button
//                                     style={{
//                                         color: 'black',
//                                         position: 'relative',
//                                         top: -1
//                                     }}
//                                     size='small'
//                                     variant="contained"
//                                     type='submit'
//                                     onClick={() => formik.handleReset()}
//                                 >
//                                     <Icon>
//                                         refresh
//                                     </Icon>
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </React.Fragment>
//             }
//         />
//     </form>
// }

function Form() {
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].loading);
    const entities = useSelector(store => store[keyStore].vehicles);
    const selected = useSelector(store => store[keyStore].selected);
    const searchDefault = useSelector(store => store[keyStore].search);
    const code = useSelector(store => store[keyStore]?.code);
    const [search, setSearch] = useState(searchDefault);
    const [openDialog, setOpenDialog] = useState('');
    const [detail, setDetail] = useState(null);

    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "vehiclename", label: `Tên xe`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "licenseplate", label: `Biển số`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const getListTable = useCallback((search) => {
        dispatch(meta.vehicleDelivery.getList(search));
    }, [dispatch])

    const searchString = JSON.stringify(search);
    useEffect(() => {
        let search = JSON.parse(searchString);
        getListTable(search);
    }, [searchString, getListTable, dispatch])

    // const selectedFile = async (filePath) => {
    //     const file = await Connect.live.upload.getFileS3({ documentName: filePath });
    //     const url = window.URL.createObjectURL(new Blob([file.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', file.config.params.documentName.split('/').pop()); //or any other extension
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    // }

    const data = entities && entities.data && entities.data.map((item, index) => ({
        ...item,
        original: item,
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        gender: (
            <React.Fragment>
                {
                    item?.gender
                        ? <CmsLabel content={`Nam`} />
                        : <CmsLabel content={`Nữ`} />
                }

            </React.Fragment>
        ),
        action: (
            <div className="flex space-x-3 ">
                <CmsIconButton
                    tooltip="Chỉnh sửa"
                    delay={50}
                    icon="edit"
                    className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
                    onClick={() => {
                        setDetail(item);
                        setOpenDialog('user');
                    }}
                />
            </div>
        )
    }))

    const handleCloseDialog = () => {
        setOpenDialog('');
        setDetail(null);
    }

    // const handleSubmit = async (values, form) => {
    //     alertInformation({
    //         text: `Xác nhận thao tác`,
    //         data: { values, form },
    //         confirm: async () => {
    //             try {
    //                 const resultAction = values?.id
    //                     ? await dispatch(meta.customer.update([values]))
    //                     : await dispatch(meta.customer.create([values]));
    //                 unwrapResult(resultAction);
    //                 if (!values?.id) {
    //                     form.resetForm();
    //                 }
    //                 setOpenDialog('');
    //                 getListTable(search);
    //             } catch (error) {
    //             } finally {
    //                 form.setSubmitting(false)
    //             }
    //         },
    //         close: () => form.setSubmitting(false)
    //     });
    // }
    // const clearSearchValue = (value) => setSearch(prev => {
    //     const values = { ...value };
    //     const search = { ...prev };
    //     for (const key in values) {
    //         if (!values[key] && typeof values[key] !== 'number') {
    //             delete search[key];
    //             delete values[key];
    //         }
    //     }
    //     return { ...search, ...values, page: 1 };
    // })

    if (!data) {
        return <FuseLoading />
    }

    const handleSubmit = (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = values?.id
                        ? await dispatch(meta.vehicleDelivery.update([values]))
                        : await dispatch(meta.vehicleDelivery.insert([values]));
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

    return (
        <LayoutCustom>
            {

                openDialog === 'f2a' && <CodeDialog open={true} code={code} handleClose={handleCloseDialog} title='Tạo 2fa code' />
            }

            {
                openDialog === 'user' && <AddVehicleDialog
                    open={true}
                    detail={detail}
                    handleClose={handleCloseDialog}
                    handleSubmit={handleSubmit}
                    title='Thêm phương tiện'
                />
            }
            <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                icon="whatshot"
                title={"Quản lý phương tiện giao hàng"}
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <CmsTab data={links} value={0} isLink={true} onChange={(e, value) => {
                            History.push(links.find(e => e.id === value)?.link)
                        }} />
                    </div>
                }
                content={
                    <>
                        <CmsTableBasic
                            className="w-full h-full"
                            isServerSide={true}
                            apiServerSide={params => setSearch(prev => {
                                return { ...prev, ...params }
                            })}
                            isPagination={false}
                            data={data}
                            selected={selected}
                            setSelected={entity => dispatch(setSelected(entity))}
                            columns={columns}
                            loading={loading}
                        />
                    </>
                }
                rightHeaderButton={
                    <div>
                        <CmsButton
                            label={'Thêm mới'}
                            className="mx-2"
                            onClick={() => setOpenDialog('user')}
                            startIcon="add" />
                    </div>
                }
            />
        </LayoutCustom>
    );
}

export default withReducer(keyStore, reducer)(Form);
