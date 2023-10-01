import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikChipSelect } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    id: null,
    partnerid: null,
    roleid: null
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

function AddManyCusDialog({ handleClose, detail, onSave, open, title = 'Thêm thuộc tính', options }) {
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
            id: Yup.number().nullable().required('Chọn khách hàng'),
            email: Yup.array().nullable().required('Nhập email khách hàng').min(1, "Nhập email khách hàng"),
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
                size='sm'
                loading={formik.isSubmitting}
            >
                <div className='py-8'>
                    <CmsFormikChipSelect
                        label="Email"
                        name="email"
                        charSplit={','}
                        className="my-8"
                        placeholder="Nhập email"
                        validateFc={(option) => {
                            console.log(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(option), option);
                            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(option);
                        }}
                        size="small"
                        formik={formik} />
                </div>

                <div className='py-8'>
                    <CmsFormikAutocomplete
                        className="my-8"
                        name="roleid"
                        formik={formik}
                        label={`Loại`}
                        data={[
                            {
                                name: 'Vip',
                                id: 1
                            },
                            {
                                name: 'Normal',
                                id: 2
                            }
                        ]}
                        size="small"
                        autocompleteProps={{
                            getOptionLabel: (option) => option?.name,
                            ChipProps: {
                                size: 'small'
                            },
                            size: 'small',
                        }}
                        setOption={(option) => option?.name}
                        valueIsId />
                </div>
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddManyCusDialog);