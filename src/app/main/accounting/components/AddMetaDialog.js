import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { metaStatus } from '../common';

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

function AddMetaDialog({ type, detail, handleSubmit, handleClose, open, title = 'Thêm thuộc tính' }) {

    const handleSave = (values) => {
        const value = { ...values, type };

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
                    label="Tên"
                    name="name"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikAutocomplete
                    className="my-8"
                    name={`status`}
                    formik={formik}
                    label="Trạng thái"
                    setOption={(option) => option?.name}
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.name,
                        size: 'small'
                    }}
                    disabled
                    data={metaStatus}
                    acceptZero
                    valueIsId
                />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddMetaDialog);