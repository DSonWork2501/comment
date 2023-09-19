import React, { useEffect, useState } from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikTextField, CmsTab } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const initialValues = {
    reason: ''
}

const Note = () => {

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    })

    function handleSubmit(value) {

    }

    return <div>
        <div className='flex items-center pt-16'>
            <div className='w-2/3'>
                <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start space-x-8 px-8" >
                    <CmsFormikTextField
                        label={`Tìm kiếm`}
                        name="name"
                        className="my-8"
                        size="small"
                        clearBlur
                        formik={formik} />
                    <CmsFormikAutocomplete
                        className="my-8 inline-flex"
                        name="partnerID"
                        formik={formik}
                        label="Loại"
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
                </form>
            </div>
            <div className='w-1/3 text-right'>
                <Button
                    title='Thêm mới'
                    variant='contained'
                    color='primary'
                    size='small'
                    style={{ textTransform: 'none' }}
                >
                    Thêm mới
                </Button>
            </div>
        </div>
    </div>
}

const Information = ({ detail }) => {
    return <div className='flex pt-16 -mx-8'>
        <div className='w-2/3 px-8'>
            <h2 className='pb-16'>
                Thông tin chính
            </h2>
            <table className='w-full' style={{ borderLeft: '1px solid #c8c8c8', borderTop: '1px solid #c8c8c8' }}>
                <tbody>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Họ tên
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            {detail?.name}
                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Giới tính
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            {detail?.gender ? 'Nam' : 'Nữ'}
                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Sinh nhật
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>

                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Email
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            {detail?.email}
                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Di động
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            {detail?.phone}
                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Địa chỉ
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>

                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Funnel
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>

                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Tổng số order
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            {detail?.totalorder}
                        </td>
                    </tr>
                    <tr>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>
                            Nhãn (tags)
                        </td>
                        <td className='p-8 w-1/2' style={{ borderRight: '1px solid #c8c8c8', borderBottom: '1px solid #c8c8c8' }}>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='w-1/3 px-8'>
            <h2 className='pb-16'>
                Thông tin liên hệ khác
            </h2>
            <div>
                Không tìm thấy liên hệ!
            </div>
        </div>
    </div>
}

function OverviewDialog({ handleClose, onSave, open, title = 'Thêm thuộc tính', status, detail }) {
    const [tab, setTab] = useState(1);
    const handleSave = (values) => {
        if (formik)
            onSave(values, formik.setSubmitting);
    }

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
            reason: Yup.string().required("Vui lòng nhập lý do"),
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
                // title={title}
                handleClose={handleClose}
                handleSave={formik.handleSubmit}
                disabledSave={formik.isSubmitting}
                isCloseDialogSubmit={false}
                open={open}
                loading={formik.isSubmitting}
                size="lg"
            >
                <CmsTab
                    data={[
                        {
                            id: 1,
                            name: 'Thông tin chung',
                        },
                        {
                            id: 2,
                            name: 'Tất cả ghi chú',
                        },
                        {
                            id: 3,
                            name: 'Cuộc gọi',
                        },
                        {
                            id: 4,
                            name: 'Cơ hội',
                        },
                        {
                            id: 5,
                            name: 'Đơn hàng',
                        },
                        {
                            id: 6,
                            name: 'Phiếu ghi',
                        },
                        {
                            id: 7,
                            name: 'Đánh giá',
                        },
                    ]}
                    value={tab}
                    onChange={(e, value) => {
                        setTab(value);
                    }}
                />
                {
                    tab === 1
                    &&
                    <Information detail={detail} />
                }

                {
                    tab === 2
                    &&
                    <Note detail={detail} />
                }
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(OverviewDialog);