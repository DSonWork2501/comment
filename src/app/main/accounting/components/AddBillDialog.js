import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { order } from 'app/main/order/store/orderSlice';
import { useDispatch } from 'react-redux';

const initialValues = {
    id: 0,
    cusID: "",
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

function AddBillDialog({ handleClose, detail, onSave, open, title = 'Thêm thuộc tính', options }) {
    const { customers } = options;
    const dispatch = useDispatch();

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
            cusID: Yup.number().nullable().required('Chọn khách hàng'),
        })
    })

    useEffect(() => {
        dispatch(order.other.getUserDelivery());
    }, [dispatch])

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
                size='sm'
                loading={formik.isSubmitting}
            >
                <CmsFormikAutocomplete
                    className="my-8"
                    name="cusID"
                    formik={formik}
                    label={`Chọn khách hàng`}
                    data={customers}
                    size="small"
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.email,
                        ChipProps: {
                            size: 'small'
                        },
                        size: 'small',
                    }}
                    setOption={(option) => option?.email}
                    onChangeValue={(value) => {
                    }}
                    valueIsId />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddBillDialog);