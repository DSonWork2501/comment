import React, { useMemo, useState } from 'react';
import { CmsButton, CmsCardedPage, CmsFormikAutocomplete } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Box, InputLabel, styled } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { keyStore } from '../../common';
import reducer from '../../store';
import CmcFormikLazySelect from '@widgets/components/cms-formik/CmcFormikLazySelect';
import { getList } from '../../store/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getShelf, getWine } from 'app/main/customer-shelf/store/customerShelfSlice';
import LeftSideContent from 'app/main/product/components/product/edit/classify/LeftSideContent';
import RightSideContent from 'app/main/product/components/product/edit/classify/RightSideContent';
import { useEffect } from 'react';

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

const fillDefaultForm = (def, detail, setId = true) => {
    if (!detail)
        return null;

    let newDef = {};
    for (const key in def) {
        newDef[key] = detail[key] || def[key]
    }

    if (setId && detail.id)
        newDef.id = detail.id;

    return newDef;
}


function FormEdit() {
    const location = useLocation();
    const dispatch = useDispatch();
    const orders = useSelector(store => store[keyStore].order.entities?.data) || [];
    const detailEntities = useSelector(store => store[keyStore]?.order?.detailEntities?.data
        ? store[keyStore].order.detailEntities.data
        : []);
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
    console.log(detailEntities, reList);
    const [loading, setLoading] = useState();
    const [prefix, setPrefix] = useState(null);
    const listWine = useMemo(() => {
        let data = [];
        reList?.length && reList.forEach((element, index) => {
            element?.slots?.length && element.slots.forEach(e => {
                data.push({
                    id: e?.item?.id,
                    img: e?.item?.img,
                    sku: e?.item?.sku,
                    name: e?.item?.name,
                })
            });
        });
        return data
    }, [reList])

    const handleSave = () => {

    }

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
        })
    })

    const { values } = formik, { orderID, productID } = values;

    const formik_shelf = useFormik({
        initialValues: detailEntities,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
        })
    })

    const { values: vl, setValues: setVl } = formik_shelf;

    useEffect(() => {
        setVl(reList);
    }, [reList, setVl])

    const HandleClickDetail = (event, stack_index, slot_index) => {
        var data = !isNaN(parseInt(slot_index)) ? `[${stack_index}].slots[${slot_index}]` : `[${stack_index}]`
        setPrefix(data)
    }

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
                // toolbar={
                //     <></>
                // }
                content={
                    <div className="w-full h-full flex justify-between p-8">
                        <div style={{ width: '39%' }}>
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
                                                const rest = value.parentid === 1
                                                    ? await dispatch(getShelf({ cusID: value.cusId, type: 'wine', orderID: value.id }))
                                                    : await dispatch(getWine({ cusId: value.cusId, parentId: value.hhid, cms: 1 }))

                                                if (rest?.payload && rest?.payload?.result) {
                                                    const values = rest?.payload?.data;
                                                    if (value?.parentid === 1) {
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
                                            size="small"
                                            autocompleteProps={{
                                                getOptionLabel: (option) => option?.id + ' | ' + option?.name || '',
                                                ChipProps: {
                                                    size: 'small'
                                                },
                                                size: 'small',
                                            }}
                                            setOption={(option) => option?.id + ' | ' + option?.name || ''}
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
                                            // HandleAddStack={HandleAddStack}
                                            // HandleAddSlot={HandleAddSlot}
                                            HandleClickDetail={HandleClickDetail}
                                            label={orders[0].parentid === 1 ? 'Thông tin rượu' : 'Thông tin tủ'}
                                        // HandleDeleteSlot={HandleDeleteSlot}
                                        // HandleDeleteStack={HandleDeleteStack}
                                        // stackIndex={stackIndex}
                                        // slotIndex={slotIndex}
                                        />
                                    }
                                </div>
                            </BoxCustom>
                        </div>
                        <div style={{ width: '59%' }}>
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
                                            <div className='w-1/2'>
                                                <div>
                                                    <b>
                                                        ID đơn hàng:
                                                    </b>
                                                    {orders[0].id}
                                                </div>
                                                <div>
                                                    <b>
                                                        Khách hàng:
                                                    </b>
                                                    {orders[0].cusname}
                                                </div>
                                            </div>
                                            <div className='w-1/2'>
                                                <div>
                                                    <b>
                                                        Số điện thoại:
                                                    </b>
                                                    {orders[0].cusname}
                                                </div>
                                                <div>
                                                    <b>
                                                        Hợp đồng:
                                                    </b>
                                                    {orders[0].cusname}
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            Boolean(prefix)
                                            &&
                                            <RightSideContent
                                                formik={formik_shelf}
                                                prefix={prefix}
                                                isCanSelect
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