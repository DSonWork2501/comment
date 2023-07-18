import React, { useState, useEffect, useCallback } from 'react'
import { CmsCardedPage, CmsTableBasic, CmsLabel, CmsTab, CmsFormikTextField, CmsFormikDateTimePicker } from '@widgets/components';
import { Box, Button, Chip, Icon, TableCell, TableRow, Typography, styled } from '@material-ui/core';
import { alertInformation, initColumn } from '@widgets/functions'
import withReducer from 'app/store/withReducer'
import { useDispatch, useSelector } from 'react-redux'
import FuseLoading from '@fuse/core/FuseLoading'
import { unwrapResult } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import History from '@history';
import { GetApp } from '@material-ui/icons';
import Connect from '@connect';
import { deliveryLink, keyStore } from '../../common';
import { getDetail, order } from '../../store/orderSlice';
import reducer from '../../store';
import { getWine } from 'app/main/customer-shelf/store/customerShelfSlice';
import { useParams } from 'react-router';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { useFormik } from 'formik';

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .inner-scroll>div": {
        minHeight: 'initial'
    },
    '& [class^="makeStyles-header-"]': {
        minHeight: '7.8rem !important',
        height: '7.8rem !important'
    },
});

const initialValues = {
    page: 1,
    limit: 10
};

const Filter = ({ onSearch, search, namePage }) => {

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    })
    const { setFieldValue } = formik;

    useEffect(() => {
        if (search) {
            for (const key in initialValues) {
                if (search[key] !== initialValues[key]) {
                    let value = search[key];
                    if (key === 'status') {
                        value = JSON.stringify(search[key])
                    }
                    setFieldValue(key, value);
                }
            }
        }
    }, [search, setFieldValue])

    function handleSubmit(value) {
        let values = { ...value };
        if (values.status)
            values.status = parseInt(values.status);
        onSearch(values);
    }

    return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start space-x-8 px-8" >
        <CmsFormikTextField
            label={`Người giao hàng`}
            name="name"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} />
        <CmsFormikDateTimePicker
            format="dd/MM/yyyy"
            className="my-8"
            name="monthly"
            formik={formik}
            size="small"
            isOpenKeyBoard={false}
            label="Từ ngày" />
        <CmsFormikDateTimePicker
            format="dd/MM/yyyy"
            className="my-8"
            name="monthly"
            formik={formik}
            size="small"
            isOpenKeyBoard={false}
            label="Đến ngày" />
        <Button
            style={{
                background: '#FF6231',
                color: 'white',
                height: 36,
                position: 'relative',
                top: -1
            }}
            size='small'
            variant="contained"
            type='submit'
        >
            <Icon>
                search
            </Icon>
        </Button>
        <Button
            style={{
                color: 'black',
                height: 36,
                position: 'relative',
                top: -1
            }}
            size='small'
            variant="contained"
            type='submit'
            onClick={() => formik.handleReset()}
        >
            <Icon>
                refresh
            </Icon>
        </Button>
    </form>
}

function DetailBBBG() {
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].contractLoading);
    const partners = useSelector(store => store[keyStore].partners?.data);
    const entities = useSelector(store => store[keyStore].order.detailEntities);
    const typeInv = useSelector(store => store[keyStore].typeInv);
    const units = useSelector(store => store[keyStore].units);
    const platforms = useSelector(store => store[keyStore].platforms);
    const selected = useSelector(store => store[keyStore].selected);
    const [search, setSearch] = useState(initialValues);
    const [openDialog, setOpenDialog] = useState('');
    const [detail, setDetail] = useState(null);
    const params = useParams(), id = params.id, type = params.type;

    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
        new initColumn({ field: "contract2", label: `Người giao hàng`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "contract", label: `Tổng đơn`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "version", label: `Ghi chú`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "date", label: `Người tạo`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const data = entities && entities.data && entities.data.map((item, index) => ({
        ...item,
        original: item,
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        action: (
            <div className="flex space-x-3 ">

            </div>
        ),
    }))
    useEffect(() => {
        // dispatch(order.partner.getList());
        // dispatch(order.other.getUnit());
        // dispatch(order.other.getTypeInv());
        // dispatch(order.other.platform());
        dispatch(getWine({ cusId: 20, parentId: 58, cms: 1 }))
    }, [dispatch])

    const getListTable = useCallback((search) => {
        dispatch(order.other.getSummary(search));
    }, [dispatch])

    const searchString = JSON.stringify(search);
    useEffect(() => {
        let search = JSON.parse(searchString);
        getListTable(search);
    }, [searchString, getListTable, dispatch])

    useEffect(() => {
        if (openDialog === '')
            setDetail(null);
    }, [openDialog])

    const handleUpdate = (item) => {
        let value = { ...item };
        setDetail(value);
        setOpenDialog('partner');
    }

    const handleUpdateV = (item) => {
        let value = { ...item };
        setDetail({ ...value, version: "" });
        setOpenDialog('newVersion');
    }

    const handleUpdateA = (item) => {
        let value = { ...item };
        setDetail(value);
        setOpenDialog('addendum');
    }

    const selectedFile = async (filePath) => {
        const file = await Connect.live.upload.getFileS3({ documentName: filePath });
        const url = window.URL.createObjectURL(new Blob([file.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.config.params.documentName.split('/').pop()); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
    }



    const handleCloseDialog = () => {
        setOpenDialog('');
    }

    const handleSubmit = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = values?.id
                        ? await dispatch(order.contract.update([values]))
                        : await dispatch(order.contract.create([values]));
                    unwrapResult(resultAction);
                    if (!values?.id) {
                        form.resetForm();
                    }
                    setOpenDialog('');
                    getListTable(search);
                } catch (error) {
                } finally {
                    form.setSubmitting(false)
                }
            },
            close: () => form.setSubmitting(false)
        });
    }

    const handleSubmitAddendum = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(order.subContract.create(values))
                    unwrapResult(resultAction);
                    if (!values?.id) {
                        form.resetForm();
                    }
                    setOpenDialog('');
                } catch (error) {
                } finally {
                    form.setSubmitting(false)
                }
            },
            close: () => form.setSubmitting(false)
        });
    }
    // const clearSearchValue = (value) => setSearch(prev => {
    //     const values = { ...value };
    //     const search = { ...prev };
    //     for (const key in values) {
    //         if (!values[key] && typeof values[key] !== 'number') {
    //             delete search[key];
    //             delete values[key];
    //         }
    //     }
    //     return { ...search, ...values, page: 1 };
    // })

    // if (!data) {
    //     return <FuseLoading />
    // }

    return (
        <LayoutCustom>

            <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                icon="whatshot"
                title={"Quản lý biên bản bàn giao"}
                toolbar={
                    <Filter
                        onSearch={setSearch}
                        search={search}
                    />
                }
                content={
                    <>
                        <CmsTableBasic
                            className="w-full h-full"
                            isServerSide={true}
                            apiServerSide={params => setSearch(prev => {
                                return { ...prev, ...params }
                            })}
                            pagination={entities?.pagination}
                            data={data}
                            columns={columns}
                            loading={loading}
                        />
                    </>
                }
            />
        </LayoutCustom>
    );
}

export default withReducer(keyStore, reducer)(DetailBBBG);
