import React, { useMemo, useState } from 'react';
import { CmsAlert, CmsButton, CmsButtonProgress, CmsCardedPage, CmsFormikTextField, CmsTextField } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { keyStore, playMusic, playMusicW } from '../../common';
import reducer from '../../store';
import CmcFormikLazySelect from '@widgets/components/cms-formik/CmcFormikLazySelect';
import { getList, updateOrderStatus } from '../../store/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getShelf, getWine } from 'app/main/customer-shelf/store/customerShelfSlice';
import LeftSideContent from 'app/main/product/components/product/edit/classify/LeftSideContent';
import { useEffect } from 'react';
import { product } from 'app/main/product/store/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { alertInformation } from '@widgets/functions';
import { useCallback } from 'react';
import { get } from 'lodash';
import History from '@history/@history';
import { useParams } from 'react-router';
import ListProductDialog from './ListProductDialog';
import noImage from '@widgets/images/noImage.jpg';
import clsx from 'clsx';
import QRCode from 'qrcode';

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
    orderID: null
}

const SelectDetail = ({ prefix, detail }) => {
    const product = get(detail, `[${prefix}].item`);
    return <>
        <BoxCustom
            className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full" >
            <InputLabel
                className='custom-label'>
                Rượu đã chọn
            </InputLabel>
            {
                product
                    ? <>
                        <div className='flex flex-wrap mb-8 justify-between'>
                            {
                                get(detail, `${prefix.split('.')[0]}`)?.name !== "Rượu Lẻ"
                                &&
                                <>
                                    <div style={{ width: '49%' }}>
                                        <CmsTextField
                                            label='Ngăn'
                                            value={get(detail, `${prefix.split('.')[0]}`)?.name}
                                            disabled
                                            size="small"
                                            className='bg-blue-100 rounded-4'
                                        />
                                    </div>
                                    <div style={{ width: '49%' }}>
                                        <CmsTextField
                                            label='Vị trí'
                                            value={get(detail, `${prefix}`)?.slot_name}
                                            disabled
                                            size="small"
                                            className='bg-blue-100 rounded-4'
                                        />
                                    </div>
                                </>
                            }

                            <div className='w-full pt-8'>
                                <div>
                                    <b className='mr-8'>
                                        Sku (Barcode):
                                    </b>
                                    {product?.sku}
                                </div>
                                <div>
                                    <b className='mr-8'>
                                        Tên rượu:
                                    </b>
                                    {product?.name}
                                </div>
                            </div>
                            <div style={{ width: '69%' }} className='mt-8'>
                                <div className='rounded-4 shadow-4'>
                                    <img
                                        style={{ objectFit: 'contain', width: '100%', height: 'auto', margin: 'auto' }}
                                        src={`${process.env.REACT_APP_BASE_URL}api/product/img/${product?.img}`}
                                        alt={`imageforitem`} />
                                </div>
                            </div>
                            <div style={{ width: '29%' }} className='mt-8 flex items-center'>
                                <img
                                    alt={`qrcord_`}
                                    style={{ objectFit: 'contain', width: '100%', height: 'auto', margin: 'auto' }}
                                    src={product.qrcode ? `data:image/png;base64, ${product.qrcode}` : noImage} className="m-auto" />
                            </div>

                        </div>
                    </>
                    : <div className='text-red'>
                        Lỗi không tồn tại sản phẩm trên
                    </div>
            }
        </BoxCustom>
    </>
}

export const generateQRCodeBase64 = async (data, option = {}) => {
    try {
        const canvas = await QRCode.toCanvas(data, option);
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
    const orders = useSelector(store => store[keyStore].order.entities?.data) || [];
    const popupLoading = useSelector(store => store[keyStore].order.popupLoading) || false;
    const detailEntities = useSelector(store => store[keyStore]?.order?.detailEntities?.data
        ? store[keyStore].order.detailEntities.data
        : []);
    const params = useParams(), ID = params.id;
    if (!ID) {
        History.push('package/0')
    }
    const paramsURL = new URLSearchParams(location.search), step = paramsURL.get('step');
    const detailCheck = useMemo(() => {
        let totalWine = 0, totalCheck = 0;
        !Boolean(current?.parentid)
            ? detailEntities?.length && detailEntities.forEach(element => {
                element.slots?.length && element.slots.forEach(val => {
                    if (val?.item?.id) {
                        totalWine = totalWine + 1;
                        if (val?.item?.ispacked === 1)
                            totalCheck = totalCheck + 1;
                    }
                })
            })
            : detailEntities?.length && detailEntities.forEach(element => {
                totalWine = totalWine + 1;
                if (element?.ispacked === 1)
                    totalCheck = totalCheck + 1;
            })

        return { totalWine, totalCheck };
    }, [detailEntities, current])
    const [reList, setReList] = useState([]);
    const [loading, setLoading] = useState();
    const [prefix, setPrefix] = useState(null);
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
                    qrcodenonhash: e?.item?.qrcodenonhash,
                    barcode: e?.item?.barcode
                })
            });
        });
        return data
    }, [reList])
    const [numberReceive, setNumberReceive] = useState(null);
    const receive = useMemo(() => {
        let total = 0;
        if (numberReceive)
            Object.values(numberReceive).forEach(val => {
                total = total + val;
            })
        return total
    }, [numberReceive])
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
                    numberReceive: numberReceive && numberReceive[sku] ? numberReceive[sku] : 0
                };
            }
        }

        return (current && !Boolean(current?.parentid)) ? {
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
                numberReceive: numberReceive && numberReceive[current.productorders[0].uniqueid] ? numberReceive[current.productorders[0].uniqueid] : 0
            },
            ...uniqueItems
        } : uniqueItems
    }, [listWine, numberReceive, current])

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

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
        })
    })

    const { values, setFieldValue } = formik, { orderID, productID, qrCode, barCodeSearch, numberProduct } = values;

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

    const HandleClickDetail = (event, stack_index, slot_index) => {
        var data = !isNaN(parseInt(slot_index)) ? `[${stack_index}].slots[${slot_index}]` : `[${stack_index}]`
        // console.log(data);
        setPrefix(data)
        if (!isNaN(parseInt(slot_index)) && get(reList, data))
            setFieldValue('productID', get(reList, data)?.item.id)
    }

    const handleCheck = async (check, item, trigger) => {
        const resultAction = await dispatch(product.other.wineArrange([{
            id: item.id,
            ispacked: check ? 1 : 0
        }]))
        unwrapResult(resultAction);
        getWines(current)

        trigger && trigger();
    }

    const crString = JSON.stringify(current)
    const updateItems = useCallback(
        (rest) => {
            const current = JSON.parse(crString)
            try {
                if (rest?.payload && rest?.payload?.result) {
                    const values = rest?.payload?.data;
                    if (values?.length && current) {
                        if (Boolean(current?.parentid)) {
                            setReList([
                                {
                                    name: 'Rượu Lẻ',
                                    slots:values.map(val=>{
                                        return {
                                            type: 'slot',
                                            isNotShow: true,
                                            item: val
                                        }
                                    }) 
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
        const rest = Boolean(currentT?.parentid)
            ? await dispatch(getShelf({ cusID: currentT?.cusId, type: 'wine', orderID: currentT?.id }))
            : await dispatch(getWine({ cusId: currentT?.cusId, parentId: currentT?.hhid, cms: 1 }))

        updateItems(rest)
    }, [updateItems, dispatch])

    useEffect(() => {
        if (current) {
            updateItems({ payload: { data: detailEntities, result: true } })
        }
    }, [current, detailEntities, updateItems])

    useEffect(() => {
        if (ID !== '0' && current?.id !== parseInt(ID) && checkFirst) {
            // console.log(ID);
            setCheckFirst(false);
            setTimeout(() => {
                setFieldValue('orderID', parseInt(ID))
            }, 0);
            setLoading(true);
            dispatch(getList({
                orderId: ID,
                status: 2,
                pageNumber: 1,
                rowsPage: 10,
                cms: 1,
                getQrCode: 1
            })).then((res) => {
                setLoading(false);
                if (res?.payload?.result && res?.payload?.data?.length && current?.id !== res.payload.data[0]?.id) {
                    const value = res.payload.data[0];
                    console.log(value);

                    generateQRCodeBase64(value?.productorders[0].uniqueid).then(qrcode => {
                        setCurrent({ ...value, qrcode })
                        getWines({ ...value, qrcode })
                    })
                }
            })
        }
    }, [ID, setFieldValue, dispatch, current, getWines, checkFirst])

    const handleCloseDialog = () => {
        History.push({
            state: {
                prevPath: window.location.pathname + window.location.search
            },
            pathname: `/package/${ID}`
        })
        setOpenDialog('');
    }

    useEffect(() => {
        if (step === '2' && openDialog !== 'productList')
            setOpenDialog('productList')
        if (step === '3')
            setOpenDialog('')

    }, [step, openDialog])

    const updateNumber = (num, key_, name) => {
        setNumberReceive(prev => {
            let key = key_,
                sku = listWine.find(val => val.barcode === key)?.sku;

            if (sku)
                key = sku;

            if (!Boolean(uniqueList[key])) {
                CmsAlert.fire({ heightAuto: false, text: 'Sản phẩm không tồn tại trong giỏ hàng !', icon: 'warning' })
                playMusicW();
                return prev
            }

            if (!Boolean(prev) || !prev[key]) {
                if (uniqueList[key].number < (num)) {
                    CmsAlert.fire({ heightAuto: false, text: 'Vượt quá số lượng !', icon: 'warning' })
                    playMusicW();
                    return prev
                }
                playMusic()
                setTimeout(() => {
                    setFieldValue('barCodeSearch', '')
                    setFieldValue('numberProduct', 0)
                }, 0);
                return {
                    ...prev,
                    [key]: num
                }
            } else {
                if (uniqueList[key].number < (numberReceive[key] + num)) {
                    CmsAlert.fire({ heightAuto: false, text: 'Vượt quá số lượng !', icon: 'warning' })
                    playMusicW();
                    return prev
                }
                playMusic()
                setTimeout(() => {
                    setFieldValue('barCodeSearch', '')
                    setFieldValue('numberProduct', 0)
                }, 0);
                return {
                    ...prev,
                    [key]: prev[key] + num
                }
            }
        })
    }

    return (
        <React.Fragment>
            {openDialog === 'productList' &&
                <ListProductDialog
                    handleClose={() => handleCloseDialog()}
                    data={Boolean(current.parentid) ? listWine : [{
                        "id": current.productorders[0].id,
                        "img": current.productorders[0].image,
                        "sku": current.productorders[0].uniqueid,
                        "name": current.productorders[0].name,
                        qrcode: current.qrcode,
                        qrcodenonhash: current.productorders[0].uniqueid,
                        currentIndex: 'cabin',
                        wine: 0
                    }, ...listWine]}
                    open={true}
                    loading={popupLoading}
                    handleSave={() => {
                        History.push({
                            pathname: `/package/${ID}`,
                            search: `?step=3`,
                            state: {
                                prevPath: window.location.pathname + window.location.search
                            }
                        })
                    }}
                />}

            {openDialog === 'printQr' &&
                <ListProductDialog
                    handleClose={() => setOpenDialog('')}
                    data={Boolean(current.parentid) ? listWine : [{
                        "id": current.productorders[0].id,
                        "img": current.productorders[0].image,
                        "sku": current.productorders[0].uniqueid,
                        "name": current.productorders[0].name,
                        qrcode: current.qrcode,
                        qrcodenonhash: current.productorders[0].uniqueid,
                        currentIndex: 'cabin',
                        wine: 0
                    }, ...listWine]}
                    open={true}
                    loading={popupLoading}
                />}

            <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                title={"Gói sản phẩm"}
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
                                    label={"Đã nhặt hàng"}
                                    startIcon="vertical_align_bottom"
                                    className="mx-2"
                                    onClick={() => {
                                        History.push({
                                            pathname: `/package/${ID}`,
                                            search: `?step=2`,
                                            state: {
                                                prevPath: window.location.pathname + window.location.search
                                            }
                                        })
                                    }}
                                    disabled={Boolean(step || ID === '0' || (Boolean(current?.parentid) ? listWine?.length : listWine?.length + 1) !== receive || !receive)}
                                    size="small" />
                                <CmsButtonProgress
                                    loading={formik.isSubmitting}
                                    type="submit"
                                    label={"In QrCode"}
                                    startIcon="vertical_align_bottom"
                                    className="mx-2"
                                    onClick={() => {
                                        setOpenDialog('printQr')
                                    }}
                                    size="small" />
                                <CmsButtonProgress
                                    loading={formik.isSubmitting}
                                    type="submit"
                                    label={"Đóng gói"}
                                    startIcon="vertical_align_bottom"
                                    className="mx-2"
                                    disabled={Boolean(detailCheck?.totalWine !== detailCheck?.totalCheck || step !== '3')}
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
                                                    status: 2,
                                                    pageNumber: 1,
                                                    rowsPage: 10,
                                                    cms: 1,
                                                    getQrCode: 1
                                                }))
                                            setLoading(false);
                                        }}
                                        onChange={async (id, value) => {
                                            Boolean(value.parentid)
                                                ? await dispatch(getShelf({ cusID: value.cusId, type: 'wine', orderID: value.id }))
                                                : await dispatch(getWine({ cusId: value.cusId, parentId: value.hhid, cms: 1 }))
                                            const qrcode = await generateQRCodeBase64(value?.productorders[0].uniqueid);
                                            setCheckFirst(false)
                                            setCurrent({ ...value, qrcode })
                                            setPrefix(null)
                                            History.push({
                                                pathname: `/package/${id}`,
                                                state: {
                                                    prevPath: window.location.pathname + window.location.search
                                                }
                                            })
                                        }}
                                        lazyLoading={loading}
                                        classes="my-8 small"
                                    />
                                    {
                                        !step
                                        &&
                                        <div className='flex justify-between items-center w-full'>
                                            <div style={{ width: '49%' }} className='pb-8'>
                                                <CmsFormikTextField
                                                    label={`Wine barCode/Uniqueid`}
                                                    name="barCodeSearch"
                                                    className="my-8"
                                                    size="small"
                                                    clearBlur
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            // setNumberReceive(prev => {
                                                            //     if (!Boolean(uniqueList[e.target.value])) {
                                                            //         CmsAlert.fire({ heightAuto: false, text: 'Sản phẩm không tồn tại trong giỏ hàng !', icon: 'warning' })
                                                            //         return prev
                                                            //     }

                                                            //     if (!Boolean(prev) || !prev[e.target.value]) {
                                                            //         return {
                                                            //             ...prev,
                                                            //             [e.target.value]: 1
                                                            //         }
                                                            //     } else {
                                                            //         if (uniqueList[e.target.value].number < prev[e.target.value] + 1) {
                                                            //             CmsAlert.fire({ heightAuto: false, text: 'Vượt quá số lượng !', icon: 'warning' })
                                                            //             return prev
                                                            //         }
                                                            //         return {
                                                            //             ...prev,
                                                            //             [e.target.value]: prev[e.target.value] + 1
                                                            //         }
                                                            //     }
                                                            // })
                                                            updateNumber(1, e.target.value, 'barCodeSearch');
                                                        }
                                                    }}
                                                    formik={formik} />
                                            </div>
                                            <div style={{ width: '24%' }} className='pb-8'>
                                                <CmsFormikTextField
                                                    label={`Số lượng`}
                                                    name="numberProduct"
                                                    className="my-8"
                                                    size="small"
                                                    clearBlur
                                                    disabled={!Boolean(barCodeSearch)}
                                                    isNumber
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            updateNumber(parseInt(e.target.value), barCodeSearch, 'numberProduct')
                                                        }
                                                    }}
                                                    formik={formik} />
                                            </div>
                                            <div style={{ width: '24%' }} className='pb-8 text-right'>
                                                <CmsButtonProgress
                                                    label={"Lưu"}
                                                    startIcon="vertical_align_bottom"
                                                    className="my-8 bg-green-500"
                                                    disabled={!Boolean(barCodeSearch) || !Boolean(numberProduct)}
                                                    onClick={() => {
                                                        updateNumber(parseInt(numberProduct), barCodeSearch, null)
                                                    }}
                                                    size="small" />
                                            </div>
                                        </div>
                                    }

                                    {
                                        step === '3'
                                        &&
                                        <>
                                            <div style={{ width: '49%' }} className='pb-8'>
                                                <CmsFormikTextField
                                                    id="qrcodeid"
                                                    label={`QrCode`}
                                                    name="qrCode"
                                                    className="my-8"
                                                    size="small"
                                                    clearBlur
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            setFieldValue('qrCode', e.target.value)

                                                            const value = e.target.value, pre = listWine.find(val => val.qrcodenonhash === value)?.currentIndex,
                                                                idPro = listWine.find(val => val.qrcodenonhash === value)?.id;
                                                            if (pre) {
                                                                setPrefix(pre);
                                                                setTimeout(() => {
                                                                    const barcode = document.getElementById('barcodeid');
                                                                    barcode.focus()
                                                                }, 0);
                                                                setFieldValue('productID', idPro)
                                                            } else {
                                                                playMusicW()
                                                                setPrefix('noProduct');
                                                            }
                                                        }
                                                    }}
                                                    formik={formik} />
                                                {/* <CmsFormikAutocomplete
                                                    className="my-8"
                                                    name="productID"
                                                    formik={formik}
                                                    label="QrCode"
                                                    data={listWine}
                                                    disabled={!Boolean(reList?.length)}
                                                    onChangeValue={value => setPrefix(value.currentIndex)}
                                                    size="small"
                                                    autocompleteProps={{
                                                        getOptionLabel: (option) => option?.id + ' | ' + option?.name || '',
                                                        ChipProps: {
                                                            size: 'small'
                                                        },
                                                        size: 'small',
                                                    }}
                                                    setOption={(option) => <div className={clsx(option?.ispacked === 1 ? 'text-green-900 font-bold' : '')}>
                                                        {option?.id + ' | ' + option?.name}
                                                    </div> || ''}
                                                    valueIsId /> */}
                                            </div>
                                            <div style={{ width: '49%', pointerEvents: !qrCode ? 'none' : 'initial' }} className='pb-8'>
                                                <CmsFormikTextField
                                                    id="barcodeid"
                                                    label={`BarCode`}
                                                    name="barcode"
                                                    className="my-8"
                                                    clearBlur
                                                    //disabled={!qrCode}
                                                    size="small"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            setFieldValue('barcode', e.target.value)

                                                            const value = e.target.value, pre = listWine.find(val => val.qrcodenonhash === qrCode)?.barcode,
                                                                crIndex = listWine.find(val => val.qrcodenonhash === qrCode)?.currentIndex;
                                                            if (value !== pre) {
                                                                setPrefix('noProduct');
                                                                playMusicW()
                                                            } else {
                                                                setPrefix(crIndex);
                                                                setTimeout(() => {
                                                                    setFieldValue('barcode', '')
                                                                    setFieldValue('qrCode', '')
                                                                }, 0);
                                                            }
                                                        }
                                                    }}
                                                    formik={formik} />
                                                {/* <CmsFormikAutocomplete
                                                    className="my-8"
                                                    name="productID"
                                                    formik={formik}
                                                    label="Barcode"
                                                    data={listWine}
                                                    disabled={!Boolean(reList?.length)}
                                                    onChangeValue={value => setPrefix(value.currentIndex)}
                                                    size="small"
                                                    autocompleteProps={{
                                                        getOptionLabel: (option) => option?.id + ' | ' + option?.name || '',
                                                        ChipProps: {
                                                            size: 'small'
                                                        },
                                                        size: 'small',
                                                    }}
                                                    setOption={(option) => <div className={clsx(option?.ispacked === 1 ? 'text-green-900 font-bold' : '')}>
                                                        {option?.id + ' | ' + option?.name}
                                                    </div> || ''}
                                                    valueIsId /> */}
                                            </div>
                                        </>
                                    }
                                </div>
                                <div>
                                    {
                                        (!Boolean(step) && ID !== '0')
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
                                                    <TableCell
                                                        style={{ background: 'aliceblue' }}
                                                        size='small'
                                                        component="th"
                                                        className='text-right'>
                                                        Nhặt
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
                                                                    className='rounded-6 shadow-4 bg-white'
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
                                                            <TableCell
                                                                style={{
                                                                    background: val.number === val.numberReceive ? '#bde0f5' : 'transparent'
                                                                }}
                                                                size='small'
                                                                className='text-right'>
                                                                {val.numberReceive || 0}
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
                                                        {Boolean(current?.parentid) ? listWine?.length : listWine?.length + 1}
                                                    </TableCell>
                                                    <TableCell
                                                        size='small'
                                                        style={{ background: 'aliceblue' }}
                                                        className='text-right'>
                                                        {receive}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    }
                                    {
                                        Boolean(orderID && step === '3')
                                        &&
                                        <div className='pt-8'>
                                            <LeftSideContent
                                                data={reList}
                                                isCanFix
                                                productID={productID}
                                                handleCheckBox={handleCheck}
                                                detailCheck={detailCheck}
                                                // HandleAddStack={HandleAddStack}
                                                // HandleAddSlot={HandleAddSlot}
                                                HandleClickDetail={HandleClickDetail}
                                                label={Boolean(current?.parentid) ? 'Thông tin rượu' : 'Thông tin tủ'}
                                            // HandleDeleteSlot={HandleDeleteSlot}
                                            // HandleDeleteStack={HandleDeleteStack}
                                            // stackIndex={stackIndex}
                                            // slotIndex={slotIndex}
                                            />
                                        </div>
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
                                        {
                                            Boolean(prefix && step === '3')
                                            &&
                                            <SelectDetail
                                                detail={reList}
                                                prefix={prefix}
                                            />
                                        }
                                        {/* {
                                            Boolean(prefix)
                                            &&
                                            <RightSideContent
                                                formik={formik_shelf}
                                                prefix={prefix}
                                                isCanSelect
                                                handleCheck={handleCheck}
                                            />
                                        } */}
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