import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikDateTimePicker, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CmsFormikUploadFile from '@widgets/components/cms-formik/CmsFormikUploadFile';
import Connect from '@connect/@connect';
import { get } from 'lodash';
import { Box, Button, FormHelperText, InputLabel, styled } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
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
    "recipientphone": ""
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
            onSave(value, formik);
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

    async function upLoadFile(file, { setLoading, resetFile, form }, name) {
        if (file?.length) {
            const data = new FormData();

            data.append('file', file[0]);
            setLoading(true);
            formik.setSubmitting(true);

            try {
                const result = await Connect.live.upload.fileS3(data);
                console.log(name, 'oke');
                formik.setFieldValue(name, result?.data?.data?.path);
            } catch (error) { }
            finally {
                setLoading(false);
                formik.setSubmitting(false);
            }
        }
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
                </BoxCustom>

                <LocationContent formik={formik} />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddDialog);