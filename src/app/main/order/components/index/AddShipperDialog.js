import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { order } from '../../store/orderSlice';
import { keyStore } from '../../common';

const initialValues = {
    id: 0,
    orderid: null,
    shipperid: 0,
    shipname: "",
    phone: "",
    code: "",
    type: 0,
    session: "",
    vehicle: "",
    licenseplate: "",
    receiveimg: "",
    completeimg: "",
    contractfile: "",
    contractValid: 0,
    deliveryid: null,
    deliverysession: null,
    note: '',
    orders: []
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

function AddShipperDialog({ handleClose, detail, onSave, open, title = 'Thêm thuộc tính', status }) {
    const dispatch = useDispatch();
    const [type, setType] = useState('1');
    const deliveries = useSelector(store => store[keyStore].order.deliveries) || [];
    const vehicles = useSelector(store => store[keyStore].order.vehicles?.data) || [];
    const userDelivery = useSelector(store => store[keyStore].order.userDelivery?.data) || [];

    const handleSave = (values) => {
        if (formik)
            onSave(values, formik);
    }

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
            shipname: Yup.string().nullable().required('Nhập tên'),
            phone: Yup.string().nullable().required('Nhập số điện thoại'),
        })
    })

    useEffect(() => {
        dispatch(order.other.getDelivery());
        dispatch(order.other.getVehicles());
        dispatch(order.other.getUserDelivery());
    }, [dispatch])

    const { setValues, values } = formik, { orders, shipperid,vehicleid } = values;

    useEffect(() => {
        setValues(detail ? fillDefaultForm(initialValues, detail) : initialValues);
    }, [detail, setValues])

    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                handleSave={formik.handleSubmit}
                disabledSave={formik.isSubmitting}
                isCloseDialogSubmit={false}
                open={open}
                size='md'
                loading={formik.isSubmitting}
            >
                {/* <BoxCustom
                    className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full">
                    <InputLabel
                        className='custom-label'>
                        Thông tin người giao hàng
                    </InputLabel> */}
                <>
                    <div className='flex justify-between items-center space-x-16'>
                        <div className='w-1/2'>
                            <b className='mr-8'>
                                Số đơn cần giao:
                            </b>
                            {orders?.length}
                        </div>
                        <div className='w-1/2'>
                            <RadioGroup
                                aria-label="Layout Style"
                                name="type"
                                className="mt-8 px-8"
                                value={type}
                                onChange={(val) => {
                                    setType(val.target.value);
                                    formik.setFieldValue('shipperid', null);
                                    formik.setFieldValue('deliveryid', null);
                                }}
                                row
                            >
                                <FormControlLabel
                                    key="rtl"
                                    value="1"
                                    control={<Radio />}
                                    label="Biên bản mới" />
                                <FormControlLabel
                                    key="ltr"
                                    value="2"
                                    control={<Radio />}
                                    label="Biên bản có sẵn" />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-between'>
                        <div className='w-1/2 pr-8'>
                            {
                                type === '1'
                                    ?
                                    <CmsFormikAutocomplete
                                        className="my-8"
                                        name="shipperid"
                                        formik={formik}
                                        label={`Chọn người nội bộ`}
                                        data={userDelivery}
                                        size="small"
                                        autocompleteProps={{
                                            getOptionLabel: (option) => option?.fullname,
                                            ChipProps: {
                                                size: 'small'
                                            },
                                            size: 'small',
                                        }}
                                        setOption={(option) => option?.fullname}
                                        onChangeValue={(value) => {
                                            formik.setFieldValue('shipname', value?.fullname)
                                            formik.setFieldValue('phone', value?.phone)
                                        }}
                                        valueIsId />
                                    : <CmsFormikAutocomplete
                                        className="my-8"
                                        name="deliveryid"
                                        formik={formik}
                                        label={`Chọn biên bản`}
                                        data={deliveries.map(val => ({ ...val, id: val.deliveryid }))}
                                        size="small"
                                        autocompleteProps={{
                                            getOptionLabel: (option) => option?.deliveryid + ' - ' + option?.shipname,
                                            ChipProps: {
                                                size: 'small'
                                            },
                                            size: 'small',
                                        }}
                                        onChangeValue={(value) => {
                                            formik.setValues(prev => ({ ...prev, deliveryid: value.deliveryid, shipname: value.shipname, phone: value.phone }))
                                        }}
                                        setOption={(option) => option?.deliveryid + ' - ' + option?.shipname}
                                        valueIsId='deliveryid' />
                            }
                            <CmsFormikTextField
                                label="Tên"
                                name="shipname"
                                size="small"
                                className="my-8"
                                disabled={type === '2' || shipperid}
                                formik={formik} />
                            <CmsFormikTextField
                                label="Số điện thoại"
                                size="small"
                                name="phone"
                                disabled={type === '2' || shipperid}
                                className="my-8"
                                formik={formik} />

                        </div>
                        <div className='w-1/2 pl-8'>
                            <CmsFormikAutocomplete
                                className="my-8"
                                name="vehicleid"
                                formik={formik}
                                label={`Phương tiện nội bộ`}
                                data={vehicles}
                                size="small"
                                autocompleteProps={{
                                    getOptionLabel: (option) => option?.vehiclename,
                                    ChipProps: {
                                        size: 'small'
                                    },
                                    size: 'small',
                                }}
                                setOption={(option) => option?.vehiclename}
                                onChangeValue={(value) => {
                                    formik.setFieldValue('vehicle', value?.vehiclename)
                                    formik.setFieldValue('licenseplate', value?.licenseplate)
                                }}
                                valueIsId />
                            <CmsFormikTextField
                                size="small"
                                label="Phương tiện"
                                name="vehicle"
                                className="my-8"
                                disabled={type === '2' || vehicleid}
                                formik={formik} />
                            <CmsFormikTextField
                                size="small"
                                label="Biển số"
                                name="licenseplate"
                                disabled={type === '2' || vehicleid}
                                className="my-8"
                                formik={formik} />
                            {/* <CmsFormikTextField
                                size="small"
                                label="Mã"
                                name="code"
                                disabled={type === '2' || shipperid}
                                className="my-8"
                                formik={formik} /> */}
                            {/* <div className="my-8">
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
                            </div> */}
                        </div>
                        {/* <CmsFormikTextField
                            label="Ghi chú"
                            name="note"
                            className="my-8"
                            multiline={true}
                            rows={4}
                            formik={formik} /> */}
                    </div>
                </>
                {/* </BoxCustom> */}
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddShipperDialog);