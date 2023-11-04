import React, { useEffect, useState } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from '@material-ui/core';
import Connect from '@connect';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import clsx from 'clsx';

const defaultForm = {
    email: "",
    newPassword: "",
    otp: "",
    token: "",
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

function ResetPasswordDialog({ type, detail, handleSubmit, handleClose, open, title = 'Thêm thuộc tính' }) {
    const [btnLoading, setBtnLoading] = useState(false);
    const dispatch = useDispatch();

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
            otp: Yup.string().required("Vui lòng nhập otp"),
        })
    })

    const { setValues, values } = formik, { email } = values;

    useEffect(() => {
        setValues(detail ? fillDefaultForm(defaultForm, detail) : defaultForm);
    }, [detail, setValues, type])

    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                handleSave={formik.handleSubmit}
                disabledSave={formik.isSubmitting || btnLoading}
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
                {
                    email
                    &&
                    <div className={clsx('text-13 text-right', btnLoading ? 'pointer-events-none' : '')}>
                        <Link className='cursor-pointer' onClick={() => {
                            setBtnLoading(true);
                            Connect.live.identity.forgotPass({ email }).then(val => {
                                const data = val.data?.data?.token;
                                if (data) {
                                    setTimeout(() => {
                                        dispatch(showMessage({ variant: "success", message: 'Đã gửi OTP đến email' }))
                                    }, 100);
                                    formik.setFieldValue('token', data);
                                } else {
                                    setTimeout(() => {
                                        dispatch(showMessage({ variant: "error", message: 'Không tìm thấy token duy trì phiên' }))
                                    }, 100);
                                }
                                setBtnLoading(false);
                            })
                        }}>
                            Gửi Otp đến email
                        </Link>
                    </div>
                }

            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(ResetPasswordDialog);
