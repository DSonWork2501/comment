import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const defaultForm = {
    DATA1: null,
    DATA2: [],
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
            DATA1: Yup.number().nullable().required("Vui lòng chọn nhân viên phụ trách"),
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
                <CmsFormikAutocomplete
                    className="my-8 inline-flex"
                    name="DATA1"
                    formik={formik}
                    label="Chọn nhân viên phụ trách"
                    data={[]}
                    size="small"
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.partnerShortName || '',
                        ChipProps: {
                            size: 'small'
                        },
                        size: 'small',
                    }}
                    setOption={(option) => option?.partnerShortName || ''}
                    valueIsId />
                <CmsFormikAutocomplete
                    className="my-8 inline-flex"
                    label="Chọn nhân viên hỗ trợ"
                    name="DATA2"
                    formik={formik}
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.subPlatformName,
                        ChipProps: {
                            size: 'small'
                        }
                    }}
                    data={[]}
                    valueIsId
                    multiple
                    size="small" />
                <i>
                    (*) Nhân viên hỗ trợ không được sửa/xoá/export thông tin khách hàng

                </i>
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddUserDialog);