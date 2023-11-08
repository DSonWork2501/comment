import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    id: 0,
    reason: ''
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

function CancelDialog({ handleClose, onSave, detail, open, title = 'Thêm thuộc tính', status }) {

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
            reason: Yup.string().required("Vui lòng nhập lý do"),
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
            >
                <CmsFormikTextField
                    label="Lý do"
                    name="reason"
                    className="my-8"
                    multiline={true}
                    rows={4}
                    formik={formik} />
                {/* <CmsFormikTextField
                    label="Khách hàng"
                    name="description"
                    className="my-8"
                    multiline={true}
                    rows={4}
                    formik={formik} /> */}
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(CancelDialog);