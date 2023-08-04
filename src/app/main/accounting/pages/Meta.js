import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CmsCardedPage, CmsTableBasic, CmsButton, CmsLabel, CmsIconButton, CmsTab } from '@widgets/components';
import { Box, Chip, TableCell, TableRow, styled } from '@material-ui/core';
import { alertInformation, initColumn } from '@widgets/functions';
import withReducer from 'app/store/withReducer';
import reducer, { setSelected, productMeta } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { keyI18n, keyStore, links } from '../common';
import AddMetaDialog from '../components/AddMetaDialog';
import { unwrapResult } from '@reduxjs/toolkit';
import History from '@history';
import { useParams } from 'react-router';

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .inner-scroll>div": {
        minHeight: '70px'
    },
    "& .inner-scroll": {
        position: 'relative',
        top: -58
    },
});

// const initialValues = {
//     name: '',
//     status: null
// };

// const Filter = ({ onSearch, search, namePage }) => {

//     const formik = useFormik({
//         initialValues,
//         onSubmit: handleSubmit
//     })
//     const { setFieldValue } = formik;

//     useEffect(() => {
//         if (search) {
//             for (const key in initialValues) {
//                 if (search[key] !== initialValues[key]) {
//                     let value = search[key];
//                     if (key === 'status') {
//                         value = JSON.stringify(search[key])
//                     }
//                     setFieldValue(key, value);
//                 }
//             }
//         }
//     }, [search, setFieldValue])

//     function handleSubmit(value) {
//         let values = { ...value };
//         if (values.status)
//             values.status = parseInt(values.status);
//         onSearch(values);
//     }

//     return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start w-1/4 space-x-8 px-8" >
//         <CmsFormikTextField
//             label={`Tên đối tác`}
//             name="name"
//             className="my-8"
//             size="small"
//             clearBlur
//             formik={formik} />
//         <Button
//             style={{
//                 background: '#FF6231',
//                 color: 'white',
//                 height: 36,
//                 position: 'relative',
//                 top: -1
//             }}
//             size='small'
//             variant="contained"
//             type='submit'
//         >
//             <Icon>
//                 search
//             </Icon>
//         </Button>
//         <Button
//             style={{
//                 color: 'black',
//                 height: 36,
//                 position: 'relative',
//                 top: -1
//             }}
//             size='small'
//             variant="contained"
//             type='submit'
//             onClick={() => formik.handleReset()}
//         >
//             <Icon>
//                 refresh
//             </Icon>
//         </Button>
//     </form>
// }

function Meta() {
    const dispatch = useDispatch();
    const { t } = useTranslation(keyI18n);
    const loading = useSelector(store => store[keyStore].loading);
    const entities = useSelector(store => store[keyStore].entities);
    const selected = useSelector(store => store[keyStore].selected);
    const searchDefault = useSelector(store => store[keyStore].search);
    const params = useParams(), type = parseInt(params.type);
    const [search, setSearch] = useState(searchDefault);
    const [openDialog, setOpenDialog] = useState('');
    const [detail, setDetail] = useState(null);

    const columns = [
        new initColumn({ field: "STT", label: "STT [1]", style: { width: 75 }, sortable: false }),
        new initColumn({ field: "name", label: `Khách hàng [2]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Số điện thoại [3]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Nợ phải thu [4]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Có phải trả [5]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Nợ [6]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Có [7]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Nợ phải thu [4+6-5-7]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Có phải trả [5+7-4-6]`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const getListTable = useCallback((search) => {
        dispatch(productMeta.meta.getList({ ...search, type }));
    }, [dispatch, type])

    const searchString = JSON.stringify(search);
    useEffect(() => {
        let search = JSON.parse(searchString);
        getListTable(search);
    }, [searchString, getListTable, dispatch])

    useEffect(() => {
        if (openDialog === '')
            setDetail(null);
    }, [openDialog])

    const data = entities && entities.data && entities.data.map((item, index) => ({
        ...item,
        original: item,
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        status: (
            <React.Fragment>
                {
                    item.status === 0
                    &&
                    <Chip label="Tắt" color='secondary' />
                }

                {
                    item.status === 1
                    &&
                    <Chip label="Hoạt động" color='primary' />
                }
            </React.Fragment>
        ),
        action: (
            <div className="flex space-x-3 ">
                {
                    item.status === 1 &&
                    <>
                        <CmsIconButton
                            tooltip="Chỉnh sửa"
                            delay={50}
                            icon="edit"
                            className="bg-green-500 text-white shadow-3  hover:bg-green-900"
                            onClick={() => {
                                setOpenDialog('meta');
                                setDetail(item);
                            }} />
                        <CmsIconButton
                            tooltip="Xóa"
                            delay={50}
                            icon="delete"
                            className="bg-red-500 text-white shadow-3  hover:bg-red-900"
                            onClick={
                                () =>
                                    alertInformation({
                                        text: `Xác nhận thao tác`,
                                        data: { item },
                                        confirm: async () => {
                                            try {
                                                const resultAction = await dispatch(productMeta.meta.delete({
                                                    value: [{
                                                        id: item.id,
                                                        status: 0
                                                    }],
                                                    type
                                                }));
                                                unwrapResult(resultAction);
                                                getListTable(search);
                                            } catch (error) {
                                            }
                                        }
                                    })
                            } />
                    </>
                }
            </div>
        )
    }))

    const handleCloseDialog = () => {
        setOpenDialog('');
    }

    const handleSubmit = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = values?.id
                        ? await dispatch(productMeta.meta.update({ value: [values], type }))
                        : await dispatch(productMeta.meta.create({ value: [values], type }));
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

    const nameDialog = () => {
        if (type === 1)
            return detail ? 'Chỉnh sửa thương hiệu' : 'Thêm mới thương hiệu';
    }

    const pageName = () => {
        return links.find(val => val.id === type)?.name;
    }

    return (
        <LayoutCustom>
            {
                openDialog === 'meta'
                &&
                <AddMetaDialog
                    open={openDialog === 'meta'}
                    handleClose={handleCloseDialog}
                    handleSubmit={handleSubmit}
                    title={nameDialog()}
                    detail={detail}
                    type={type}
                />
            }

            <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                icon="whatshot"
                title={'Quản lý thanh toán'}
                toolbar={
                    <>
                        <CmsTab data={links} value={0} isLink={true} onChange={(e, value) => {
                            History.push(links.find(e => e.id === value)?.link)
                        }} />
                    </>
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
                            upperHead={
                                <TableRow>
                                    <TableCell
                                        className="text-center p-8"
                                    >
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="text-center p-8"
                                    >
                                        Đối tượng
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="text-center p-8"
                                    >
                                        Số dư đầu kỳ
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="text-center p-8"
                                    >
                                        Phát sinh trong kỳ
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="text-center p-8"
                                    >
                                        Số dư cuối kỳ
                                    </TableCell>
                                </TableRow>
                            }
                        />
                    </>
                }
                rightHeaderButton={
                    <div>
                        <CmsButton
                            label={t("ADD_NEW")}
                            onClick={() => setOpenDialog('meta')}
                            className="mx-2"
                            startIcon="add" />
                    </div>
                }
            />
        </LayoutCustom>
    );
}

export default withReducer(keyStore, reducer)(Meta);
