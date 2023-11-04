import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, InputLabel, styled } from '@material-ui/core';
import LocationContent from 'app/main/order/components/edit/basic/LocationContent';

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
    "id": 0,
    "email": "",
    "name": "",
    "phone": "",
    "img": "",
    "recipient": "",
    "address": "",
    "ward": 0,
    "district": 0,
    "province": 0,
    "recipientphone": "",
    aid: 0,
    customercity: 0,
    customerdistrict: 0,
    customerward: 0,
    customeraddress: ""
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

function AddDialog({ handleClose, detail, onSave, open, title = 'Thêm thuộc tính', status }) {

    const handleSave = (values) => {
        let value = { ...values };
        if (value.customeraddress)
            value.address = value.customeraddress;

        if (value.customercity)
            value.province = value.customercity;

        if (value.customerdistrict)
            value.district = value.customerdistrict;

        if (value.customerward)
            value.ward = value.customerward;

        if (formik)
            onSave({ ...value, isEdit: detail?.isEdit, isAddMore: detail?.isAddMore }, formik);
    }

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
            // contractCode: Yup.string().required("Vui lòng nhập số hợp đồng"),
            // signedAt: Yup.date().nullable().required("Vui lòng nhập ngày").typeError('Vui lòng nhập ngày'),
            // signedContractFiles: Yup.string().required("Vui lòng chọn file"),
        })
    })

    const { setValues } = formik;

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
                loading={formik.isSubmitting}
                size='md'
            >
                {
                    (!detail || detail?.isEdit === 1)
                    &&
                    <BoxCustom
                        className="p-8 mt-25 border-1 rounded-4 black-label h-full" >
                        <InputLabel
                            className='custom-label'>
                            Thông tin đối tác
                        </InputLabel>
                        <CmsFormikTextField
                            label="Email"
                            name="email"
                            className="my-4"
                            size="small"
                            formik={formik} />
                        <CmsFormikTextField
                            label="Tên đối tác"
                            name="name"
                            size="small"
                            className="my-4"
                            formik={formik} />
                        <CmsFormikTextField
                            label="Số điện thoại"
                            name="phone"
                            size="small"
                            className="my-4"
                            formik={formik} />
                    </BoxCustom>
                }

                {
                    (!detail || detail?.isEdit === 2)
                    &&
                    <>
                        <div className='mb-8'>
                            <CmsFormikTextField
                                label="Người phụ trách"
                                name="recipient"
                                size="small"
                                className="my-4"
                                formik={formik} />
                            <CmsFormikTextField
                                label="Số điện thoại người phụ trách"
                                name="recipientphone"
                                size="small"
                                className="my-4"
                                formik={formik} />
                        </div>
                        <LocationContent formik={formik} />
                    </>
                }
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddDialog);