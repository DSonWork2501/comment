import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { order } from 'app/main/order/store/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { keyStore } from '../common';

const initialValues = {
    id: 0,
    collector: "",
    phone: ""
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

function AddUserDialog({ handleClose, detail, onSave, open, title = 'Thêm thuộc tính', status }) {
    const dispatch = useDispatch();
    const userDelivery = useSelector(store => store[keyStore]?.userDelivery?.data) || [];

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
            collector: Yup.string().nullable().required('Nhập nhân viên'),
            phone: Yup.string().nullable().required('Nhập số điện thoại'),
        })
    })

    useEffect(() => {
        dispatch(order.other.getUserDelivery());
    }, [dispatch])

    const { setValues, values } = formik, { shipperid } = values;

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
                size='sm'
                loading={formik.isSubmitting}
            >
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
                        formik.setFieldValue('collector', value?.fullname)
                        formik.setFieldValue('phone', value?.phone)
                    }}
                    valueIsId />
                <CmsFormikTextField
                    label="Tên"
                    name="collector"
                    size="small"
                    className="my-8"
                    disabled={shipperid}
                    formik={formik} />
                <CmsFormikTextField
                    label="Số điện thoại"
                    size="small"
                    name="phone"
                    disabled={shipperid}
                    className="my-8"
                    formik={formik} />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddUserDialog);