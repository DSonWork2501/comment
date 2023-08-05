import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikDateTimePicker, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { metaStatus } from '../common';
import { get } from 'lodash';
import CmsFormikUploadFile from '@widgets/components/cms-formik/CmsFormikUploadFile';
import { Button, FormHelperText } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import Connect, { baseurl } from '@connect/@connect';

const defaultForm = {
    id: 0,
    name: "",
    status: 1
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

function AddMetaDialog({ detail, handleSubmit, handleClose, open, title = 'Thêm thuộc tính' }) {

    const handleSave = (values) => {
        const value = { ...values };

        handleSubmit(value, formik);
    }

    const formik = useFormik({
        initialValues: defaultForm,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
            name: Yup.string().required("Vui lòng nhập tên"),
            status: Yup.number().nullable().required("Vui lòng chọn trạng thái"),
        })
    })

    const { setValues } = formik;

    useEffect(() => {
        setValues(detail ? fillDefaultForm(defaultForm, detail) : defaultForm);
    }, [detail, setValues])

    async function upLoadFile(file, { setLoading, resetFile, form }) {
        if (file?.length) {

            const data = new FormData();

            data.append('enpoint', 'account');
            data.append('files', file[0]);
            await Connect.live.uploadFile.insert(data);
            formik.setFieldValue('file', file[0].name);
        }
    }

    const selectedFile = async (filePath) => {
        // const file = await Connect.live.upload.getFileS3({ documentName: filePath });
        // const url = window.URL.createObjectURL(new Blob([file.data]));
        const url = baseurl + `/common/files/${filePath}?subfolder=account`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filePath); //or any other extension
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
                loading={formik.isSubmitting}
                open={open}
            >
                <CmsFormikTextField
                    label="Khách hàng"
                    name="name"
                    disabled
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikDateTimePicker
                    allDateTime={false}
                    label="Ngày nộp"
                    format="yyyy-MM-dd"
                    className="my-8"
                    name="fromDate"
                    formik={formik}
                    size="small"
                    isOpenKeyBoard={false} />
                <CmsFormikAutocomplete
                    className="my-8"
                    name={`status`}
                    formik={formik}
                    label="Hình thức"
                    setOption={(option) => option?.name}
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.name,
                        size: 'small'
                    }}
                    data={[
                        {
                            id: 1,
                            name: 'Thanh toán chuyển khoản'
                        },
                        {
                            id: 2,
                            name: 'Thanh toán tiền mặt'
                        },
                    ]}
                    acceptZero
                    valueIsId
                />
                <CmsFormikTextField
                    label="Tổng tiền"
                    name="name"
                    size="small"
                    isNumberFormat
                    className="my-8"
                    formik={formik} />
                <div className="flex items-center">
                    <CmsFormikUploadFile
                        className="my-8"
                        id="uploadfile"
                        name="fileInput"
                        fileProperties={
                            { accept: ".doc, .docx, .xls, .xlsx" }
                        }
                        setValue={upLoadFile}
                        formik={formik}
                        showFileName={false} />
                    {
                        formik && get(formik?.touched, 'file') && Boolean(get(formik?.errors, 'file'))
                        &&
                        <FormHelperText
                            style={{
                                color: '#f44336'
                            }}
                            className='mx-16'
                        >
                            {get(formik.errors, 'file')}
                        </FormHelperText>

                    }
                    {
                        formik.values['file']
                        &&
                        <Button
                            startIcon={<GetApp color='primary' />}
                            style={{
                                textTransform: 'none'
                            }}
                            onClick={() => selectedFile(formik.values['file'])}
                        >
                            {formik.values['file'].split('/').pop()}
                        </Button>
                    }
                    <div>
                        {
                            formik && get(formik?.touched, 'file') && Boolean(get(formik?.errors, 'file'))
                            &&
                            <FormHelperText
                                style={{
                                    color: '#f44336'
                                }}
                                className='opacity-0'
                            >
                                {get(formik.errors, 'file')}
                            </FormHelperText>
                        }
                    </div>
                </div>
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddMetaDialog);