import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, InputLabel, makeStyles, styled } from '@material-ui/core';

const BoxCustom = styled(Box)({
    border: '1px solid rgba(0, 0, 0, 0.12)',
    margin: '24px 0 16px 0',
    padding: '0 12px 0 12px',
    position: 'relative',
    borderRadius: '2px',
    transition: 'none',
    "& .custom-label": {
        top: '-13px',
        left: '8px',
        padding: '0 4px',
        position: 'absolute',
        backgroundColor: 'white',
        color: '#1B9E85',
        fontSize: '1.4rem',
        fontFamily: 'Roboto',
        fontWeight: 400,
        lineHeight: 1.5,
        margin: 0
    },
    "&.black-label>.custom-label": {
        color: 'black',
        fontSize: '1.5rem',
    },
    "& .hide-border": {
        border: 'none',
        marginTop: 0
    },
    "& .hide-label>label": {
        display: "none"
    }
});

const initialValues = {
    id: 0,
    orderid: null,
    shipperid: 0,
    shipname: "",
    phone: "",
    code: "",
    type: 0,
    session: "",
    vehicle: "",
    licenseplate: "",
    receiveimg: "",
    completeimg: "",
    contractfile: "",
    contractValid: 0,
    orders: []
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

function AddShipperDialog({ handleClose, detail, onSave, open, title = 'Thêm thuộc tính', status }) {
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
            shipname: Yup.string().nullable().required('Nhập tên'),
            phone: Yup.string().nullable().required('Nhập số điện thoại'),
        })
    })

    const { setValues, values } = formik, { orders } = values;

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
                size='md'
                loading={formik.isSubmitting}
            >
                {/* <BoxCustom
                    className="p-16 py-20 mt-25 border-1 rounded-4 black-label h-full">
                    <InputLabel
                        className='custom-label'>
                        Thông tin người giao hàng
                    </InputLabel> */}
                <>
                    <b className='mr-8'>
                        Số đơn cần giao:
                    </b>
                    {orders?.length}
                    <div className='flex justify-between space-x-16'>
                        <div className='w-1/2'>
                            <CmsFormikAutocomplete
                                className="my-8"
                                name="shipperid"
                                formik={formik}
                                label={`Chọn người nội bộ`}
                                data={[]}
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
                            <CmsFormikTextField
                                label="Tên"
                                name="shipname"
                                size="small"
                                className="my-8"
                                formik={formik} />
                            <CmsFormikTextField
                                size="small"
                                label="Phương tiện"
                                name="vehicle"
                                className="my-8"
                                formik={formik} />
                        </div>
                        <div className='w-1/2'>
                            <CmsFormikTextField
                                label="Số điện thoại"
                                size="small"
                                name="phone"
                                className="my-8"
                                formik={formik} />
                            <CmsFormikTextField
                                size="small"
                                label="Biển số"
                                name="licenseplate"
                                className="my-8"
                                formik={formik} />
                            <CmsFormikTextField
                                size="small"
                                label="Mã"
                                name="code"
                                className="my-8"
                                formik={formik} />
                            {/* <div className="my-8">
                                <CmsFormikCheckbox
                                    formik={formik}
                                    name="contractValid"
                                    label='Hợp đồng chính xác'
                                />
                                {
                                    formik && get(formik?.touched, 'contractValid') && Boolean(get(formik?.errors, 'contractValid'))
                                    &&
                                    <FormHelperText
                                        style={{
                                            color: '#f44336'
                                        }}
                                        className='mx-16'
                                    >
                                        {get(formik.errors, 'contractValid')}
                                    </FormHelperText>

                                }
                            </div> */}
                        </div>
                    </div>
                </>
                {/* </BoxCustom> */}
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(AddShipperDialog);