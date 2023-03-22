import { CmsDialog, CmsFormikTextField } from "@widgets/components"
import { keyStore } from "app/main/customer/common"
import { getCusById } from "app/main/customer/store/customerSlice"
import { useFormik } from "formik"
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from 'yup'

function EditCusContent({ open, email, handleClose, handleSave }) {
    const dispatch = useDispatch()
    const entity = useSelector(store => store[keyStore].customer.entity)

    useEffect(() => {
        if (email)
            dispatch(getCusById({ email }))
    }, [dispatch, email])

    const initData = (entity, email) => {
        if (email) {
            return {
                "name": entity.name,
                "email": entity.email,
                "phone": entity.phone,
                "password": entity.password,
                "status": entity.status,
                "type": entity.type
            }
        }
        else return {
            "name": "",
            "email": "",
            "phone": "",
            "password": "",
            "status": 1,
            "type": 1
        }
    }

    const handleSaveData = (value) => {
        handleSave && handleSave(value)
        handleClose && handleClose()
    }

    const formik = useFormik({
        initialValues: initData(entity, email),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        validationSchema: Yup.object({
            name: Yup.string().typeError("Tên khách hàng không được bỏ trống !").required("Tên khách hàng không được bỏ trống !"),
            email: Yup.string().typeError("Email không được bỏ trống !").required("Email không được bỏ trống !").email('Không phải email !'),
            phone: Yup.string().typeError("Phone không được bỏ trống !").required("Phone không được bỏ trống !"),
            password: Yup.string().typeError("Password không được bỏ trống !").required("Password không được bỏ trống !"),
        })
    })

    return (
        <CmsDialog
            title={email ? `Cập nhật thông tin khách hàng: ${email}` : 'Tạo mới khách hàng'}
            open={open}
            handleClose={handleClose}
            handleSave={formik.handleSubmit}
            isCloseDialogSubmit={false}
        >
            <div className="w-full space-y-16">
                <CmsFormikTextField size="small" name="name" formik={formik} label="Tên khách hàng" />
                <CmsFormikTextField size="small" name="email" formik={formik} label="Email" />
                <CmsFormikTextField size="small" name="phone" formik={formik} label="Điện thoại" />
                <CmsFormikTextField size="small" name="password" formik={formik} label="Mật khẩu" />
            </div>
        </CmsDialog>
    )

}
export default EditCusContent