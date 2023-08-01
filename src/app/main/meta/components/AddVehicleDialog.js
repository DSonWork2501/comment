import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const defaultForm = {
    id: 0,
    vehiclename: "",
    licenseplate: "",
    type: 1,
    status: 1,
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

function AddVehicleDialog({ type, detail, handleSubmit, handleClose, open, title = 'Thêm thuộc tính' }) {

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
            // partnerShortName: Yup.string().required("Vui lòng nhập tên thường gọi"),
            // partnerFullName: Yup.string().required("Vui lòng nhập tên đầy đủ"),
            // taxCode: Yup.string().required("Vui lòng nhập mã số thuế").typeError("Nội dung phải là số"),
            // accountNumber: Yup.string().required("Vui lòng nhập số tài khoản").typeError("Nội dung phải là số"),
            // bankName: Yup.string().required("Vui lòng nhập ngân hàng"),
            // address: Yup.string().required("Vui lòng nhập địa chỉ"),
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
                    label="Tên xe"
                    name="vehiclename"
                    size="small"
                    className="my-8"
                    formik={formik} />
                <CmsFormikTextField
                    label="Biển số xe"
                    name="licenseplate"
                    size="small"
                    className="my-8"
                    formik={formik} />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddVehicleDialog);