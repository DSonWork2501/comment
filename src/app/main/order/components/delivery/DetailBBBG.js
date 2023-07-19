import React, { useState, useEffect, useCallback } from 'react'
import { CmsCardedPage, CmsTableBasic, CmsLabel, CmsTab, CmsFormikTextField, CmsFormikAutocomplete } from '@widgets/components';
import { Box, Button, Chip, Icon, TableCell, TableRow, Typography, styled } from '@material-ui/core';
import { alertInformation, initColumn } from '@widgets/functions'
import withReducer from 'app/store/withReducer'
import { useDispatch, useSelector } from 'react-redux'
import FuseLoading from '@fuse/core/FuseLoading'
import { unwrapResult } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import History from '@history';
import { GetApp } from '@material-ui/icons';
import Connect from '@connect';
import { deliveryLink, keyStore } from '../../common';
import { getDetail, order } from '../../store/orderSlice';
import reducer from '../../store';
import { getWine } from 'app/main/customer-shelf/store/customerShelfSlice';
import { useParams } from 'react-router';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { useFormik } from 'formik';

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .inner-scroll>div": {
        minHeight: 'initial'
    },
    '& [class^="makeStyles-header-"]': {
        minHeight: '7.8rem !important',
        height: '7.8rem !important'
    },
});

const initialValues = {
    page: 1,
    limit: 10
};

const Filter = ({ onSearch, search, namePage }) => {

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    })
    const { setFieldValue } = formik;

    useEffect(() => {
        if (search) {
            for (const key in initialValues) {
                if (search[key] !== initialValues[key]) {
                    let value = search[key];
                    if (key === 'status') {
                        value = JSON.stringify(search[key])
                    }
                    setFieldValue(key, value);
                }
            }
        }
    }, [search, setFieldValue])

    function handleSubmit(value) {
        let values = { ...value };
        if (values.status)
            values.status = parseInt(values.status);
        onSearch(values);
    }

    return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start  space-x-8 px-8" >
        <CmsFormikTextField
            label={`ID đơn hàng`}
            name="name"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} />
        <CmsFormikTextField
            label={`Sản phẩm`}
            name="name"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} />
        <CmsFormikAutocomplete
            className="my-8 inline-flex"
            name="partnerID"
            formik={formik}
            label="Trạng thái"
            data={[]}
            size="small"
            autocompleteProps={{
                getOptionLabel: (option) => option?.partnerShortName || '',
                ChipProps: {
                    size: 'small'
                },
                size: 'small',
            }}
            setOption={(option) => option?.partnerShortName || ''}
            valueIsId />
        <Button
            style={{
                background: '#FF6231',
                color: 'white',
                height: 36,
                position: 'relative',
                top: -1
            }}
            size='small'
            variant="contained"
            type='submit'
        >
            <Icon>
                search
            </Icon>
        </Button>
        <Button
            style={{
                color: 'black',
                height: 36,
                position: 'relative',
                top: -1
            }}
            size='small'
            variant="contained"
            type='submit'
            onClick={() => formik.handleReset()}
        >
            <Icon>
                refresh
            </Icon>
        </Button>
    </form>
}

const ProductTable = ({ entities, loading, setSearch }) => {
    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
        new initColumn({ field: "contract", label: `Sản phẩm`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "version", label: `Giá`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "date", label: `Tổng số lượng`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]
    const data = entities && entities.data && entities.data.map((item, index) => ({
        original: item,
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        action: (
            <div className="flex space-x-3 ">

            </div>
        ),
    }))

    return <CmsTableBasic
        className="w-full h-full"
        isServerSide={true}
        apiServerSide={params => setSearch(prev => {
            return { ...prev, ...params }
        })}
        isPagination={false}
        data={data}
        columns={columns}
        loading={loading}
        // moreFooter={
        //     <TableRow>
        //         <TableCell
        //             colSpan={3}
        //             className="text-center"
        //             style={{ borderRight: '1px solid #ddd' }}
        //         >
        //             <b>
        //                 TỔNG:
        //             </b>
        //         </TableCell>
        //         <TableCell
        //             className="text-right"
        //             style={{ borderRight: '1px solid #ddd' }}
        //         >
        //         </TableCell>
        //         <TableCell
        //             style={{ borderRight: '1px solid #ddd' }}
        //         >

        //         </TableCell>
        //     </TableRow>
        // }
    />
}

const OrderTable = ({ entities, loading, setSearch }) => {
    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
        new initColumn({ field: "contract", label: `Sản phẩm`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "version", label: `SL`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "date", label: `Giá`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Trạng thái`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const data = entities && entities.data && entities.data.map((item, index) => ({
        original: item,
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        action: (
            <div className="flex space-x-3 ">

            </div>
        ),
    }))

    return <CmsTableBasic
        className="w-full h-full"
        isServerSide={true}
        apiServerSide={params => setSearch(prev => {
            return { ...prev, ...params }
        })}
        isPagination={false}
        data={data}
        columns={columns}
        loading={loading}
        moreFooter={
            <TableRow>
                <TableCell
                    colSpan={3}
                    className="text-center"
                    style={{ borderRight: '1px solid #ddd' }}
                >
                    <b>
                        TỔNG:
                    </b>
                </TableCell>
                <TableCell
                    className="text-right"
                    style={{ borderRight: '1px solid #ddd' }}
                >
                </TableCell>
                <TableCell
                    style={{ borderRight: '1px solid #ddd' }}
                >

                </TableCell>

                <TableCell
                    style={{ borderRight: '1px solid #ddd' }}
                >

                </TableCell>
            </TableRow>
        }
    />
}

function DetailBBBG() {
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].contractLoading);
    const partners = useSelector(store => store[keyStore].partners?.data);
    const entities = useSelector(store => store[keyStore].order.detailDelivery);
    const typeInv = useSelector(store => store[keyStore].typeInv);
    const units = useSelector(store => store[keyStore].units);
    const platforms = useSelector(store => store[keyStore].platforms);
    const selected = useSelector(store => store[keyStore].selected);
    const [search, setSearch] = useState(initialValues);
    const [openDialog, setOpenDialog] = useState('');
    const [detail, setDetail] = useState(null);
    const params = useParams(), id = params.id, type = params.type;

    useEffect(() => {
        // dispatch(order.partner.getList());
        // dispatch(order.other.getUnit());
        // dispatch(order.other.getTypeInv());
        // dispatch(order.other.platform());
        dispatch(getWine({ cusId: 20, parentId: 58, cms: 1 }))
    }, [dispatch])

    const getListTable = useCallback((search) => {
        dispatch(order.other.getDetailDelivery({ ...search, id }));
    }, [dispatch, id])

    const searchString = JSON.stringify(search);
    useEffect(() => {
        let search = JSON.parse(searchString);
        getListTable(search);
    }, [searchString, getListTable, dispatch])

    useEffect(() => {
        if (openDialog === '')
            setDetail(null);
    }, [openDialog])

    const handleUpdate = (item) => {
        let value = { ...item };
        setDetail(value);
        setOpenDialog('partner');
    }

    const handleUpdateV = (item) => {
        let value = { ...item };
        setDetail({ ...value, version: "" });
        setOpenDialog('newVersion');
    }

    const handleUpdateA = (item) => {
        let value = { ...item };
        setDetail(value);
        setOpenDialog('addendum');
    }

    const selectedFile = async (filePath) => {
        const file = await Connect.live.upload.getFileS3({ documentName: filePath });
        const url = window.URL.createObjectURL(new Blob([file.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.config.params.documentName.split('/').pop()); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
    }



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
                        ? await dispatch(order.contract.update([values]))
                        : await dispatch(order.contract.create([values]));
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

    const handleSubmitAddendum = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(order.subContract.create(values))
                    unwrapResult(resultAction);
                    if (!values?.id) {
                        form.resetForm();
                    }
                    setOpenDialog('');
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

    // if (!data) {
    //     return <FuseLoading />
    // }

    return (
        <LayoutCustom>
            <div className='w-full  h-full' style={{ padding: '0 3.2rem' }}>
                <div className="w-full flex items-start py-8">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32">whatshot</Icon>
                    </FuseAnimate>
                    <div className="flex flex-col w-full">
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <React.Fragment>
                                <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                    Chi tiết biên bản bàn giao
                                </Typography>
                            </React.Fragment>
                        </FuseAnimate>
                    </div>
                </div>
                <div className='p-8 '>
                    <div className='p-8 rounded-4 shadow-4 flex bg-white'>
                        <div className='w-1/2'>
                            <div>
                                <b className='mr-4'>
                                    Mã biên bản:
                                </b>
                                {id}
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Tên người vận chuyển:
                                </b>
                                Trương Công Mạnh
                            </div>

                        </div>
                        <div className='w-1/2'>
                            <div>
                                <b className='mr-4'>
                                    Số đơn:
                                </b>
                                1
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Ghi chú:
                                </b>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-8 '>
                    <div className='p-8 rounded-4 shadow-4 bg-white'>
                        <CmsTab data={deliveryLink(id)} value={0} isLink={true} onChange={(e, value) => {
                            History.push(deliveryLink(id).find(e => e.id === value)?.link)
                        }} />
                        <div className='w-4/6 py-8'>
                            <Filter
                                onSearch={setSearch}
                                search={search}
                            />
                        </div>
                        {
                            type === '1'
                                ? <ProductTable entities={entities} loading={loading} setSearch={setSearch} />
                                : <OrderTable entities={entities} loading={loading} setSearch={setSearch} />
                        }

                    </div>
                </div>
            </div>
            {/* <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                icon="whatshot"
                title={"Quản lý hợp đồng"}
                toolbar={

                }
                content={
                    <>
                      
                    </>
                }
            /> */}
        </LayoutCustom>
    );
}

export default withReducer(keyStore, reducer)(DetailBBBG);
