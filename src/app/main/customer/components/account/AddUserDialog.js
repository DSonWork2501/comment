import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const defaultForm = {
    id:0,
    name: "",
    email: "",
    phone: "",
    password: "",
    type: 0,
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

function AddUserDialog({ type, detail, handleSubmit, handleClose, open, title = 'Thêm thuộc tính' }) {

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
            email: Yup.string().required("Vui lòng nhập email"),
            phone: Yup.string().required("Vui lòng SĐT").typeError("Vui lòng SĐT"),
            password: Yup.string().required("Vui lòng nhập mật khẩu"),
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
                    label="Tên tài khoản"
                    name="name"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikTextField
                    label="Email"
                    name="email"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikTextField
                    label="Số điện thoại"
                    name="phone"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikTextField
                    label="Mật khẩu"
                    name="password"
                    size="small"
                    className="my-8"
                    formik={formik} />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddUserDialog);
