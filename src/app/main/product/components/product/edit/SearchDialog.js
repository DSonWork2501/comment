import React, { useEffect } from 'react';
import { CmsButtonProgress, CmsDialog, CmsFormikAutocomplete, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux';
import { keyStore } from 'app/main/product/common';

const initialValues = {
    search: '',
    cate: '',
    brand: null,
    recommend: null,
    fromPrice: null,
    toPrice: null,
    certification: null,
    homeSubscription: null
}

function CancelDialog({ handleClose, handleSubmit, open, title = 'Thêm thuộc tính', options, search }) {
    const { brands, certification } = options;
    const loading = useSelector(store => store[keyStore].product.loading)

    const handleSave = (values) => {
        if (formik)
            handleSubmit(values, formik);
    }

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
        })
    })

    const { setFieldValue } = formik;

    useEffect(() => {
        if (search) {
            for (const key in initialValues) {
                let value = search[key];
                if (key === 'fromPrice' && search[key])
                    value = parseInt(search[key])
                if (key === 'toPrice' && search[key])
                    value = parseInt(search[key])

                setFieldValue(key, value);
            }
        }
    }, [search, setFieldValue])

    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                handleSave={formik.handleSubmit}
                disabledSave={loading}
                isCloseDialogSubmit={false}
                open={open}
                loading={loading}
                size='lg'
                btnTitle="Tìm kiếm"
                btnFootComponent={(handleClose) => {
                    return <CmsButtonProgress
                        onClick={() => {
                            formik.handleReset();
                            formik.handleSubmit();
                        }}
                        label='Reset'
                        disabled={loading}
                        color="">
                    </CmsButtonProgress>
                }}
            >
                <div className='flex flex-wrap -mx-8'>
                    <div className='md:w-1/3 w-1/2 px-8'>
                        <CmsFormikTextField
                            label="Tên sản phẩm"
                            name="search"
                            className="my-8"
                            size="small"
                            required={false}
                            formik={formik} />
                        <CmsFormikTextField
                            label="Danh mục"
                            name="cate"
                            className="my-8"
                            size="small"
                            required={false}
                            formik={formik} />
                        <div className="py-8">
                            <CmsFormikAutocomplete
                                name="certification"
                                formik={formik}
                                label={`Chứng nhận`}
                                data={certification}
                                size="small"
                                autocompleteProps={{
                                    getOptionLabel: (option) => option?.name,
                                    ChipProps: {
                                        size: 'small'
                                    },
                                    size: 'small',
                                }}
                                setOption={(option) => option?.name}
                                required={false}
                                valueIsId />
                        </div>
                    </div>
                    <div className='md:w-1/3 w-1/2  px-8'>
                        <div className="py-8">
                            <CmsFormikAutocomplete
                                name="brand"
                                formik={formik}
                                label={`Thương hiệu`}
                                data={brands}
                                size="small"
                                autocompleteProps={{
                                    getOptionLabel: (option) => option?.name,
                                    ChipProps: {
                                        size: 'small'
                                    },
                                    size: 'small',
                                }}
                                required={false}
                                setOption={(option) => option?.name}
                                valueIsId />
                        </div>
                        <div className="py-8">
                            <CmsFormikAutocomplete
                                name="recommend"
                                formik={formik}
                                label={`Recommend`}
                                data={[{
                                    name: 'Có',
                                    id: 1
                                }, {
                                    name: 'Không',
                                    id: 0
                                }]}
                                size="small"
                                autocompleteProps={{
                                    getOptionLabel: (option) => option?.name,
                                    ChipProps: {
                                        size: 'small'
                                    },
                                    size: 'small',
                                }}
                                acceptZero
                                required={false}
                                setOption={(option) => option?.name}
                                valueIsId />
                        </div>
                    </div>
                    <div className='md:w-1/3 w-1/2  px-8'>
                        <CmsFormikTextField
                            label="Giá thấp nhất"
                            name="fromPrice"
                            className="my-8"
                            size="small"
                            isNumberFormat
                            required={false}
                            formik={formik} />
                        <CmsFormikTextField
                            label="Giá lớn nhất"
                            name="toPrice"
                            className="my-8"
                            size="small"
                            required={false}
                            isNumberFormat
                            formik={formik} />
                    </div>
                </div>

            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(CancelDialog);