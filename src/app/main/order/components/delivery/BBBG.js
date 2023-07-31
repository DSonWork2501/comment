import React, { useState, useEffect, useCallback } from 'react'
import {
    CmsCardedPage,
    CmsTableBasic,
    CmsLabel,
    CmsFormikTextField,
    CmsFormikDateTimePicker,
    CmsIconButton,
} from '@widgets/components';
import { Box, Button, Icon, styled } from '@material-ui/core';
import { initColumn } from '@widgets/functions';
import withReducer from 'app/store/withReducer'
import { useDispatch, useSelector } from 'react-redux'
import { keyStore } from '../../common';
import { order } from '../../store/orderSlice';
import reducer from '../../store';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import Connect from '@connect/@connect';
import { showMessage } from 'app/store/fuse/messageSlice';

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
    limit: 10,
    phone: '',
    fromDate: null,
    toDate: null
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
                    setFieldValue(key, value);
                }
            }
        }
    }, [search, setFieldValue])

    function handleSubmit(value) {
        let values = { ...value };
        if (values?.fromDate)
            values.fromDate = format(new Date(values.fromDate), 'yyyy-MM-dd')
        if (values?.toDate)
            values.toDate = format(new Date(values.toDate), 'yyyy-MM-dd')
        onSearch(values);
    }

    return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start space-x-8 px-8" >
        <CmsFormikTextField
            label={`Số điện thoại`}
            name="phone"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} />
        <CmsFormikDateTimePicker
            format="dd/MM/yyyy"
            className="my-8"
            name="fromDate"
            formik={formik}
            size="small"
            isOpenKeyBoard={false}
            label="Từ ngày" />
        <CmsFormikDateTimePicker
            format="dd/MM/yyyy"
            className="my-8"
            name="toDate"
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
    const loading = useSelector(store => store[keyStore].order.loading);
    const entities = useSelector(store => store[keyStore].order.deliveryList);
    const [search, setSearch] = useState(initialValues);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "deliveryid", label: "ID", classHeader: "w-128", sortable: false }),
        new initColumn({ field: "customer", label: `Người giao hàng`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "numberOrder", label: `Tổng đơn`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "cho_lay_hang", label: `Chờ lấy`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "da_lay_hang", label: `Đã lấy`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "dang_giao_hang", label: `Đang giao`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "hoan_tat", label: `Hoàn thành`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "note", label: `Ghi chú`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        //new initColumn({ field: "date", label: `Người tạo`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const data = entities && entities.data && entities.data.map((item, index) => ({
        ...item,
        original: item,
        cho_lay_hang: (
            <div>
                {item.cho_lay_hang || 0}
            </div>
        ),
        da_lay_hang: (
            <div>
                {item.da_lay_hang || 0}
            </div>
        ),
        dang_giao_hang: (
            <div>
                {item.dang_giao_hang || 0}
            </div>
        ),
        hoan_tat: (
            <div>
                {item.hoan_tat || 0}
            </div>
        ),
        deliveryid: (
            <a href={`/order/delivery/1/${item.deliveryid}`}>
                {item.deliveryid}
            </a>
        ),
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        customer: (
            <React.Fragment>
                <CmsLabel content={`${(item.shipname)}`} />
                <CmsLabel content={`${(item.phone)}`} />
            </React.Fragment>
        ),
        numberOrder: (
            <React.Fragment>
                <CmsLabel content={`${(item.cho_lay_hang + item.da_lay_hang + item.dang_giao_hang)}`} />
            </React.Fragment>
        ),
        action: (
            <div className="flex space-x-3 ">
                <CmsIconButton
                    tooltip="Copy Link nhận hàng"
                    delay={50}
                    disabled={loadingBtn}
                    icon="link"
                    className="bg-green-500 text-white shadow-3  hover:bg-green-900"
                    onClick={() => {
                        setLoadingBtn(true);
                        Connect.live.order.other.getDetailDelivery({ id: item.deliveryid }).then(({ data }) => {
                            const { result } = data;
                            if (result) {
                                navigator.clipboard.writeText(`https://ibp.tastycounter.vn/employ-delivery/1/${encodeURIComponent(data?.data[0]?.shipping?.deliverysession)}`).then(() => {
                                    dispatch(showMessage({ variant: "success", message: 'Copy thành công' }))
                                }).catch(err => {
                                    dispatch(showMessage({ variant: "error", message: 'Copy không thành công' }))
                                }).finally(() => {
                                    setLoadingBtn(false);
                                })

                            }
                        })
                    }}
                />
            </div>
        ),
    }))

    const getListTable = useCallback((search) => {
        dispatch(order.other.getDeliveryList(search));
    }, [dispatch])

    useEffect(() => {
        getListTable(search);
    }, [search, getListTable, dispatch])


    if (!data) {
        return <FuseLoading />
    }

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
