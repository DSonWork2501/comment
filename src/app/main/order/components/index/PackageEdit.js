import React, { useMemo, useState } from 'react';
import { CmsButton, CmsButtonProgress, CmsCardedPage, CmsFormikAutocomplete } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, InputLabel, styled } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { keyStore } from '../../common';
import reducer from '../../store';
import CmcFormikLazySelect from '@widgets/components/cms-formik/CmcFormikLazySelect';
import { getList, updateOrderStatus } from '../../store/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getShelf, getWine } from 'app/main/customer-shelf/store/customerShelfSlice';
import LeftSideContent from 'app/main/product/components/product/edit/classify/LeftSideContent';
import RightSideContent from 'app/main/product/components/product/edit/classify/RightSideContent';
import { useEffect } from 'react';
import { product } from 'app/main/product/store/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { alertInformation } from '@widgets/functions';
import clsx from 'clsx';
import { useCallback } from 'react';
import { get } from 'lodash';
import History from '@history/@history';

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

function FormEdit() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(null);
    const orders = useSelector(store => store[keyStore].order.entities?.data) || [];
    const detailEntities = useSelector(store => store[keyStore]?.order?.detailEntities?.data
        ? store[keyStore].order.detailEntities.data
        : []);
    const detailCheck = useMemo(() => {
        let totalWine = 0, totalCheck = 0;
        current?.parentid !== 1
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
    // const reList = useMemo(() => {
    //     if (detailEntities?.length && orders?.length) {
    //         if (orders[0]?.parentid === 1)
    //             return [
    //                 {
    //                     name: 'Rượu Lẻ',
    //                     slots: [
    //                         {
    //                             type: 'slot',
    //                             isNotShow: true,
    //                             item: detailEntities[0]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         return detailEntities.map(val => ({
    //             ...val, slots: val.slots.map(e => ({
    //                 ...e,
    //                 type: e.slot_type,
    //                 name: e.slot_name,
    //                 active: e.slot_active,
    //                 capacity: e.slot_capacity,
    //                 heightlimit: e.slot_heightlimit,
    //             }))
    //         }))
    //     }
    //     return []
    // }, [detailEntities, orders])
    const [reList, setReList] = useState([]);
    const [loading, setLoading] = useState();
    const [prefix, setPrefix] = useState(null);
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
                    ispacked: e?.item?.ispacked
                })
            });
        });
        return data
    }, [reList])

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
                    History.push('/order/6');
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

    const { values, setFieldValue } = formik, { orderID, productID } = values;

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

        const rest = current?.parentid === 1
            ? await dispatch(getShelf({ cusID: current?.cusId, type: 'wine', orderID: current?.id }))
            : await dispatch(getWine({ cusId: current?.cusId, parentId: current?.hhid, cms: 1 }))

        updateItems(rest)
        trigger && trigger();
    }

    const updateItems = useCallback(
        (rest) => {
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
                            }))
                        })))
                    }
                }

            }
        }, [current])

    useEffect(() => {
        if (current) {
            updateItems({ payload: { data: detailEntities, result: true } })
        }
    }, [current, detailEntities, updateItems])

    return (
        <React.Fragment>
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
                                : '/legal/form'}
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
                                    label={"Đóng gói"}
                                    startIcon="vertical_align_bottom"
                                    className="mx-2"
                                    disabled={detailCheck?.totalWine !== detailCheck?.totalCheck}
                                    onClick={formik.handleSubmit}
                                    size="small" />
                            </div>
                        </div>
                    </div>
                }
                content={
                    <div className="w-full h-full flex justify-between p-8">
                        <div style={{ width: '39%' }} className='grid'>
                            <BoxCustom
                                className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full">
                                <InputLabel
                                    className='custom-label'>
                                    Thông tin đơn hàng
                                </InputLabel>
                                <div className='flex justify-between'>
                                    <div style={{ width: '49%' }}>
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
                                                        cms: 1
                                                    }))
                                                setLoading(false);
                                            }}
                                            onChange={async (id, value) => {
                                                value.parentid === 1
                                                    ? await dispatch(getShelf({ cusID: value.cusId, type: 'wine', orderID: value.id }))
                                                    : await dispatch(getWine({ cusId: value.cusId, parentId: value.hhid, cms: 1 }))
                                                //updateItems(rest)
                                                setCurrent(value)
                                                setPrefix(null)
                                            }}
                                            lazyLoading={loading}
                                            classes="my-8 small"
                                        />
                                    </div>
                                    <div style={{ width: '49%' }}>
                                        <CmsFormikAutocomplete
                                            className="my-8"
                                            name="productID"
                                            formik={formik}
                                            label="BarCode/QrCode SP"
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
                                            valueIsId />
                                    </div>
                                </div>
                                <div>
                                    {
                                        Boolean(orderID)
                                        &&
                                        <LeftSideContent
                                            data={reList}
                                            isCanFix
                                            productID={productID}
                                            handleCheckBox={handleCheck}
                                            detailCheck={detailCheck}
                                            // HandleAddStack={HandleAddStack}
                                            // HandleAddSlot={HandleAddSlot}
                                            HandleClickDetail={HandleClickDetail}
                                            label={current?.parentid === 1 ? 'Thông tin rượu' : 'Thông tin tủ'}
                                        // HandleDeleteSlot={HandleDeleteSlot}
                                        // HandleDeleteStack={HandleDeleteStack}
                                        // stackIndex={stackIndex}
                                        // slotIndex={slotIndex}
                                        />
                                    }
                                </div>
                            </BoxCustom>
                        </div>
                        <div style={{ width: '59%' }} className='grid'>
                            <BoxCustom
                                className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full">
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
                                            Boolean(prefix)
                                            &&
                                            <RightSideContent
                                                formik={formik_shelf}
                                                prefix={prefix}
                                                isCanSelect
                                                handleCheck={handleCheck}
                                            />
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