import React, { useMemo, useState } from 'react';
import { CmsButton, CmsButtonProgress, CmsCardedPage, CmsFormikCheckbox, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, FormHelperText, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { keyStore } from '../../common';
import reducer from '../../store';
import CmcFormikLazySelect from '@widgets/components/cms-formik/CmcFormikLazySelect';
import { getDetail, getList, updateOrderStatus } from '../../store/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getShelf, getWine } from 'app/main/customer-shelf/store/customerShelfSlice';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { alertInformation } from '@widgets/functions';
import { useCallback } from 'react';
import { get } from 'lodash';
import History from '@history/@history';
import { useParams } from 'react-router';
import clsx from 'clsx';
import QRCode from 'qrcode';
import EditDialog, { Frame } from 'app/main/contract/components/edit/EditDialog';

const BoxCustom = styled(Box)({
    border: '1px solid rgba(0, 0, 0, 0.12)',
    margin: '24px 0 16px 0',
    padding: '0 12px 0 12px',
    position: 'relative',
    borderRadius: '2px',
    transition: 'none',
    "& .custom-label": {
        top: '-13px',
        left: '8px',
        padding: '0 4px',
        position: 'absolute',
        backgroundColor: 'white',
        color: '#1B9E85',
        fontSize: '1.4rem',
        fontFamily: 'Roboto',
        fontWeight: 400,
        lineHeight: 1.5,
        margin: 0
    },
    "&.black-label>.custom-label": {
        color: 'black',
        fontSize: '1.5rem',
    },
    "& .hide-border": {
        border: 'none',
        marginTop: 0
    },
    "& .hide-label>label": {
        display: "none"
    }
});

const initialValues = {
    id: 0,
    orderID: null,
    "shipperid": 0,
    "shipname": "",
    "phone": "",
    "code": "",
    "type": 0,
    "session": "",
    "vehicle": "",
    "licenseplate": "",
    "receiveimg": "",
    "completeimg": "",
    "contractfile": "",
    contractValid: 0
}

const generateQRCodeBase64 = async (data) => {
    try {
        const canvas = await QRCode.toCanvas(data);
        const dataURL = canvas.toDataURL();
        const base64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
        return base64;
    } catch (error) {
        console.error(error);
        return null;
    }
};

function FormEdit() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(null);
    const [openDialog, setOpenDialog] = useState('');
    const [iframeKey, setIframeKey] = useState(0);
    const orders = useSelector(store => store[keyStore].order.entities?.data) || [];
    const orderDetail = useSelector(store => store[keyStore].order.entity);
    const detailEntities = useSelector(store => store[keyStore]?.order?.detailEntities?.data
        ? store[keyStore].order.detailEntities.data
        : []);
    const params = useParams(), ID = params.id;
    const [arrayForm, setArrayForm] = useState(null);
    if (!ID) {
        History.push('order-delivery/0')
    }
    const paramsURL = new URLSearchParams(location.search), step = paramsURL.get('step');
    const [reList, setReList] = useState([]);
    const [loading, setLoading] = useState();
    const [checkFirst, setCheckFirst] = useState(true);
    const listWine = useMemo(() => {
        let data = [], parent = 0, child = 0;
        reList?.length && reList.forEach((element, index) => {
            parent = index;
            element?.slots?.length && element.slots.forEach((e, i) => {
                child = i;
                data.push({
                    id: e?.item?.id,
                    img: e?.item?.img,
                    sku: e?.item?.sku,
                    name: e?.item?.name,
                    currentIndex: `[${parent}].slots[${child}]`,
                    ispacked: e?.item?.ispacked,
                    qrcode: e?.item?.qrcode,
                    qrcodenonhash: e?.item?.qrcodenonhash
                })
            });
        });
        return data
    }, [reList])
    const uniqueList = useMemo(() => {
        const uniqueItems = {};
        for (let item of listWine) {
            const sku = item.sku;
            if (sku in uniqueItems) {
                uniqueItems[sku].number++;
            } else {
                uniqueItems[sku] = {
                    item,
                    number: 1,
                };
            }
        }

        return current ? {
            [current.productorders[0].uniqueid]: {
                item: {
                    id: current.productorders[0].id,
                    img: current.productorders[0].image,
                    sku: current.productorders[0].uniqueid,
                    name: current.productorders[0].name,
                    qrcode: current.qrcode,
                    qrcodenonhash: current.productorders[0].uniqueid,
                    currentIndex: 'cabin',
                    wine: 0
                },
                number: 1,
            },
            ...uniqueItems
        } : uniqueItems
    }, [listWine, current])

    const handleSave = (values) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: values,
            confirm: async (values) => {
                formik.setSubmitting(true);
                try {
                    let form = {
                        id: current?.id,
                        cusID: current?.cusId,
                        status: 6
                    }

                    const resultAction = await dispatch(updateOrderStatus(form))
                    unwrapResult(resultAction);
                    History.push({
                        state: {
                            prevPath: window.location.pathname + window.location.search
                        },
                        pathname: '/order/6'
                    });
                } catch (error) { }
                finally {
                    formik.setSubmitting(false);
                }
            },
            close: () => formik.setSubmitting(false)
        })
    }

    const handleSaveShip = (values) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: values,
            confirm: async (values) => {
                formik.setSubmitting(true);
                try {
                    const value = { ...values, orderid: values.orderID }
                    console.log(value);
                    //const resultAction = await dispatch(order.shipper.insert(value))
                    //unwrapResult(resultAction);

                } catch (error) { }
                finally {
                    formik.setSubmitting(false);
                }
            },
            close: () => formik.setSubmitting(false)
        })
    }

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveShip,
        validationSchema: Yup.object({
            "shipname": Yup.string().nullable().required("Nhập tên"),
            "phone": Yup.string().nullable().required("Nhập số điện thoại"),
            contractValid: Yup.number().min(1, 'Vui lòng xác nhận')
        })
    })

    const { values, setFieldValue } = formik, { orderID } = values;
    const formik_shelf = useFormik({
        initialValues: detailEntities,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
        })
    })

    const { setValues: setVl } = formik_shelf;

    useEffect(() => {
        setVl(reList);
    }, [reList, setVl])

    const crString = JSON.stringify(current)
    const updateItems = useCallback(
        (rest) => {
            const current = JSON.parse(crString)
            try {
                if (rest?.payload && rest?.payload?.result) {
                    const values = rest?.payload?.data;
                    if (values?.length && current) {
                        if (current?.parentid === 1) {
                            setReList([
                                {
                                    name: 'Rượu Lẻ',
                                    slots: [
                                        {
                                            type: 'slot',
                                            isNotShow: true,
                                            item: values[0]
                                        }
                                    ]
                                }
                            ])
                        } else {
                            setReList(values.map(val => ({
                                ...val, slots: val.slots.map(e => ({
                                    ...e,
                                    type: e.slot_type,
                                    name: e.slot_name,
                                    active: e.slot_active,
                                    capacity: e.slot_capacity,
                                    heightlimit: e.slot_heightlimit,
                                    isNotShow: true,
                                }))
                            })))
                        }
                    }

                }
            } catch { }
        }, [crString])

    const getWines = useCallback(async (currentT) => {
        const rest = currentT?.parentid === 1
            ? await dispatch(getShelf({ cusID: currentT?.cusId, type: 'wine', orderID: currentT?.id }))
            : await dispatch(getWine({ cusId: currentT?.cusId, parentId: currentT?.hhid, cms: 1 }))
        await dispatch(getDetail({
            cusId: currentT.cusId,
            orderId: currentT.id
        }))
        updateItems(rest)
    }, [updateItems, dispatch])

    useEffect(() => {
        if (current) {
            updateItems({ payload: { data: detailEntities, result: true } })
        }
    }, [current, detailEntities, updateItems])

    useEffect(() => {
        if (ID !== '0' && current?.id !== parseInt(ID) && checkFirst) {
            console.log(ID);
            setCheckFirst(false);
            setTimeout(() => {
                setFieldValue('orderID', parseInt(ID))
            }, 0);
            setLoading(true);
            dispatch(getList({
                orderId: ID,
                status: 6,
                pageNumber: 1,
                rowsPage: 10,
                cms: 1,
                getQrCode: 1
            })).then((res) => {
                setLoading(false);
                if (res?.payload?.result && res?.payload?.data?.length && current?.id !== res.payload.data[0]?.id) {
                    const value = res.payload.data[0];
                    generateQRCodeBase64(value?.productorders[0].uniqueid).then(qrcode => {
                        setCurrent({ ...value, qrcode })
                        getWines({ ...value, qrcode })
                    })
                }
            })
        }
    }, [ID, setFieldValue, dispatch, current, getWines, checkFirst])

    const handleCloseDialog = () => {
        setOpenDialog('');
    }

    useEffect(() => {
        if (step === '2' && openDialog !== 'productList')
            setOpenDialog('productList')
        if (step === '3')
            setOpenDialog('')

    }, [step, openDialog])

    const handleSaveContrac = (value, form) => {
        setArrayForm(value[0]?.arrayForm);
        handleCloseDialog();
        setIframeKey(prev => prev + 1)
    }

    return (
        <React.Fragment>
            {openDialog === 'edit' && orderDetail?.contract &&
                <EditDialog
                    open={openDialog === 'edit'}
                    item={orderDetail.contract}
                    handleSave={handleSaveContrac}
                    handleClose={handleCloseDialog}
                    signature={orderDetail.contract?.signature}
                    isShip
                />}

            <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                title={"Vận chuyển"}
                icon="whatshot"
                rightHeaderButton={
                    <div className="flex items-center space-x-4">
                        <CmsButton
                            label={'Trở về'}
                            variant="text"
                            color="default"
                            component={Link}
                            to={location?.state?.prevPath
                                ? location?.state?.prevPath
                                : '/order/2'}
                            className="mx-2 flex-none"
                            startIcon="arrow_back" />
                    </div>
                }
                toolbar={
                    <div className="w-full h-68 flex justify-between items-center">
                        <div></div>
                        <div className="justify-end px-8 flex items-center space-x-8">
                            <div className="flex items-center space-x-4">
                                <CmsButtonProgress
                                    loading={formik.isSubmitting}
                                    type="submit"
                                    label={"Lưu"}
                                    startIcon="vertical_align_bottom"
                                    className="mx-2"
                                    onClick={formik.handleSubmit}
                                    size="small" />
                            </div>
                        </div>
                    </div>
                }
                content={
                    <div className="w-full h-full flex justify-between p-8">
                        <div style={{ width: '39%', display: 'inline-table' }} >
                            <BoxCustom
                                className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full" style={{ minHeight: 600 }}>
                                <InputLabel
                                    className='custom-label'>
                                    Thông tin đơn hàng
                                </InputLabel>
                                <div className='flex flex-wrap justify-between sticky top-0 pt-10 bg-white z-10'>
                                    <CmcFormikLazySelect
                                        name="orderID"
                                        debounceTime={500}
                                        options={orders}
                                        formik={formik}
                                        label='ID đơn hàng'
                                        getOptionLabel={(option) => option?.id + ' | ' + option?.cusname}
                                        dropdownOption={(option) => {
                                            return (
                                                <div className='flex items-center'>
                                                    <img style={{ height: 60, margin: '0 auto' }} src={`${option?.productorders[0]?.image ? `${process.env.REACT_APP_BASE_URL}api/product/img/${option?.productorders[0].image}` : 'assets/images/etc/no-image-icon.png'}`} alt={option?.img} />
                                                    <div className='p-2'>
                                                    </div>
                                                    <div className='text-12'>
                                                        <div>
                                                            <b>
                                                                {
                                                                    option?.id + ' | ' + option?.cusname
                                                                }
                                                            </b>
                                                        </div>
                                                        <div >
                                                            {
                                                                option?.productorders[0]?.name
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }}
                                        onSearch={async (value) => {
                                            setLoading(true);
                                            if (value)
                                                await dispatch(getList({
                                                    orderId: value,
                                                    status: 6,
                                                    pageNumber: 1,
                                                    rowsPage: 10,
                                                    cms: 1,
                                                    getQrCode: 1
                                                }))
                                            setLoading(false);
                                        }}
                                        onChange={async (id, value) => {
                                            value.parentid === 1
                                                ? await dispatch(getShelf({ cusID: value.cusId, type: 'wine', orderID: value.id }))
                                                : await dispatch(getWine({ cusId: value.cusId, parentId: value.hhid, cms: 1 }))
                                            await dispatch(getDetail({
                                                cusId: value.cusId,
                                                orderId: value.id
                                            }))
                                            const qrcode = await generateQRCodeBase64(value?.productorders[0].uniqueid);
                                            setCheckFirst(false)
                                            setCurrent({ ...value, qrcode })
                                            History.push({
                                                pathname: `/order-delivery/${id}`,
                                                state: {
                                                    prevPath: window.location.pathname + window.location.search
                                                }
                                            })
                                        }}
                                        lazyLoading={loading}
                                        classes="my-8 small"
                                    />
                                </div>
                                <div>
                                    {
                                        (ID !== '0')
                                        &&
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        style={{ background: 'aliceblue' }}
                                                        size='small'
                                                        component="th"
                                                        className='text-center'>
                                                        Hình ảnh
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ background: 'aliceblue' }}
                                                        size='small'
                                                        component="th"
                                                        className='text-left'>
                                                        Tên sản phẩm
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ background: 'aliceblue' }}
                                                        size='small'
                                                        component="th"
                                                        className='text-right'>
                                                        SL
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    Object.values(uniqueList).sort((a, b) => {
                                                        if (a?.item?.wine < b?.item?.wine) return 1;
                                                        return 0;
                                                    }).map((val, i) => (
                                                        <TableRow key={val?.item?.sku}>
                                                            <TableCell
                                                                size='small'
                                                                style={{
                                                                    width: 130,
                                                                    background: val.number === val.numberReceive ? '#bde0f5' : 'transparent'
                                                                }}>
                                                                <img
                                                                    className='rounded-6 shadow-4'
                                                                    style={{ objectFit: 'contain', height: '110px', maxWidth: 150, margin: 'auto' }}
                                                                    src={`${process.env.REACT_APP_BASE_URL}api/product/img/${val?.item?.img}`}
                                                                    alt={`imageforitem${i}`} />
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    background: val.number === val.numberReceive ? '#bde0f5' : 'transparent'
                                                                }}
                                                                size='small'>
                                                                <div>
                                                                    <b className={clsx(val?.item?.wine === 0 ? 'text-blue-500' : '')}>
                                                                        - {val?.item?.name}
                                                                    </b>
                                                                </div>
                                                                <div>
                                                                    -  {val?.item?.sku}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    background: val.number === val.numberReceive ? '#bde0f5' : 'transparent'
                                                                }}
                                                                size='small'
                                                                className='text-right'>
                                                                {val.number}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        size='small'
                                                        style={{ background: 'aliceblue' }}
                                                        className='text-center'
                                                        colSpan={2}>
                                                        <b>
                                                            Tổng
                                                        </b>
                                                    </TableCell>
                                                    <TableCell
                                                        size='small'
                                                        style={{ background: 'aliceblue' }}
                                                        className='text-right'>
                                                        {listWine?.length + 1}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    }
                                </div>
                            </BoxCustom>
                        </div>
                        <div style={{ width: '59%', display: 'inline-table' }} >
                            <BoxCustom
                                className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full" style={{ minHeight: 600 }}>
                                <InputLabel
                                    className='custom-label'>
                                    Thông chi tiết
                                </InputLabel>
                                {
                                    Boolean(orderID)
                                    &&
                                    <>
                                        <div className='flex mb-8'>
                                            <div className='w-1/3'>
                                                <div>
                                                    <b className='mr-8'>
                                                        ID đơn hàng:
                                                    </b>
                                                    {current?.id}
                                                </div>
                                                <div>
                                                    <b className='mr-8'>
                                                        Khách hàng:
                                                    </b>
                                                    {current?.cusname}
                                                </div>

                                            </div>
                                            <div className='w-1/3'>
                                                <div>
                                                    <b className='mr-8'>
                                                        Số điện thoại:
                                                    </b>
                                                    0363341099
                                                </div>
                                                <div>
                                                    <b className='mr-8'>
                                                        Hợp đồng:
                                                    </b>
                                                    DK8899
                                                </div>

                                            </div>
                                            <div className='w-1/3'>
                                                <div>
                                                    <b className='mr-8'>
                                                        Trạng thái đơn hàng:
                                                    </b>
                                                    {current?.status === 2 && 'Đã xác nhận'}
                                                    {current?.status === 6 && 'Đã đóng gói'}
                                                </div>
                                                {/* <CmsCheckbox
                                                    key={`box`}
                                                    //checked={Boolean(item?.item.ispacked)}
                                                    value={false}
                                                    label='Đóng gói'
                                                    onChange={(e) => {
                                                        // handleCheckBox(e.target.checked, item?.item, () => {
                                                        //     HandleClickDetail(e, stack_index, index)
                                                        // })
                                                    }}
                                                    name="status"
                                                /> */}
                                            </div>
                                        </div>
                                        <BoxCustom
                                            className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full">
                                            <InputLabel
                                                className='custom-label'>
                                                Thông tin người giao hàng
                                            </InputLabel>
                                            <div className='flex justify-between space-x-8'>
                                                <div className='w-1/2'>
                                                    <CmsFormikTextField
                                                        label="Tên"
                                                        name="shipname"
                                                        size="small"
                                                        className="my-8"
                                                        formik={formik} />
                                                    <CmsFormikTextField
                                                        size="small"
                                                        label="Phương tiện"
                                                        name="vehicle"
                                                        className="my-8"
                                                        formik={formik} />
                                                    <CmsFormikTextField
                                                        size="small"
                                                        label="Mã"
                                                        name="code"
                                                        className="my-8"
                                                        formik={formik} />
                                                </div>
                                                <div className='w-1/2'>
                                                    <CmsFormikTextField
                                                        label="Số điện thoại"
                                                        size="small"
                                                        name="phone"
                                                        className="my-8"
                                                        formik={formik} />
                                                    <CmsFormikTextField
                                                        size="small"
                                                        label="Biển số"
                                                        name="licenseplate"
                                                        className="my-8"
                                                        formik={formik} />
                                                    <div className="my-8">
                                                        <CmsFormikCheckbox
                                                            formik={formik}
                                                            name="contractValid"
                                                            label='Hợp đồng chính xác'
                                                        />
                                                        {
                                                            formik && get(formik?.touched, 'contractValid') && Boolean(get(formik?.errors, 'contractValid'))
                                                            &&
                                                            <FormHelperText
                                                                style={{
                                                                    color: '#f44336'
                                                                }}
                                                                className='mx-16'
                                                            >
                                                                {get(formik.errors, 'contractValid')}
                                                            </FormHelperText>

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </BoxCustom>
                                        {
                                            orderDetail
                                            &&
                                            <BoxCustom
                                                className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full">
                                                <InputLabel
                                                    className='custom-label'>
                                                    Thông tin hợp đồng
                                                </InputLabel>
                                                <div className='flex justify-between space-x-8 mb-8 items-center'>
                                                    <div className='w-1/2'>
                                                        <b>Tên:</b> {orderDetail?.contract?.title}
                                                    </div>
                                                    <div className='w-1/2 text-right'>
                                                        <CmsButtonProgress
                                                            label={"Chỉnh sửa"}
                                                            startIcon="edit"
                                                            color='primary'
                                                            onClick={() => {
                                                                setOpenDialog('edit')
                                                            }}
                                                            size="small" />
                                                    </div>
                                                </div>
                                                <Frame iframeKey={iframeKey} fileName={orderDetail?.contract?.file} arrayForm={arrayForm} />
                                            </BoxCustom>
                                        }
                                    </>
                                }
                            </BoxCustom>
                        </div>
                    </div>
                }

            />
        </React.Fragment >
    )
}

export default withReducer(keyStore, reducer)(FormEdit);