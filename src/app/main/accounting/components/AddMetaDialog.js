import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const defaultForm = {
    id: 0,
    note: "",
    status: 2
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
                size='md'
            >
                <CmsFormikTextField
                    label="Ghi chú"
                    name="note"
                    multiline={true}
                    rows={4}
                    size="small"
                    className="my-8"
                    formik={formik} />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddMetaDialog);