import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const defaultForm = {
    email: "",
    newPassword: "",
    oldPassword: "",
    otp: "",
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

function ChangePasswordDialog({ type, detail, handleSubmit, handleClose, open, title = 'Thêm thuộc tính' }) {

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
            email: Yup.string().required("Vui lòng nhập email"),
            newPassword: Yup.string().required("Vui lòng nhập mật khẩu"),
        })
    })

    const { setValues } = formik;

    useEffect(() => {
        setValues(detail ? fillDefaultForm(defaultForm, detail) : defaultForm);
    }, [detail, setValues, type])

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
                    label="Email"
                    name="email"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikTextField
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikTextField
                    label="Mật khẩu mới"
                    name="newPassword"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikTextField
                    label="Otp"
                    name="otp"
                    size="small"
                    className="my-8"
                    formik={formik} />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(ChangePasswordDialog);
