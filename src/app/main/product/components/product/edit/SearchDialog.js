import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    deniedNote: ''
}

function CancelDialog({ handleClose, onSave, open, title = 'Thêm thuộc tính', status }) {

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
            deniedNote: Yup.string().required("Vui lòng nhập lý do"),
        })
    })

    const { setValues } = formik;

    useEffect(() => {
        setValues(initialValues)
    }, [setValues])

    useEffect(() => {
        if (typeof status !== 'undefined')
            initialValues.status = status;
    }, [status])

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
                size='lg'
            >
                <div className='flex flex-wrap'>
                    <div className='md:w-1/3 w-1/2 '>
                        <CmsFormikTextField
                            label="Tên sản phẩm"
                            name="deniedNote"
                            className="my-8"
                            size="small"
                            formik={formik} />
                    </div>
                    <div className='md:w-1/3 w-1/2 '>

                    </div>
                </div>

            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(CancelDialog);