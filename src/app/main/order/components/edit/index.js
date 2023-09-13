import { CmsButton, CmsButtonProgress, CmsCardedPage, CmsTab } from "@widgets/components";
import withReducer from "app/store/withReducer";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { keyStore } from "../../common";
import reducer from "../../store";
import { getDetail } from "../../store/orderSlice";
import * as Yup from 'yup'
import BasicInfoContent from "./BasicInfo";
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
import { getList as getCustomers } from "app/main/customer/store/customerSlice";
import { useState } from "react";
import DetailProductContent from "./DetailInfo";
import { Link } from "react-router-dom";
import { alertInformation } from "@widgets/functions";
import { insertOrder } from "app/main/order/store/orderSlice";
import { customModal } from "../../model/modal";
import { OrderContext } from "../../context/OrderContext";
import { HomeSubscription } from "app/main/product/model/product/homeSubscription";
import { unwrapResult } from "@reduxjs/toolkit";
import History from "@history";
import { setStateRedux } from "app/main/product/store/productSlice";

const TabType = {
    'thongtin': { id: 'thongtin', name: 'Thông tin đơn hàng' },
    'chitiet': { id: 'chitiet', name: 'Chi tiết sản phẩm' }
}

function EditOrderContent() {
    const params = useParams()
    const dispatch = useDispatch()
    const loading = useSelector(store => store[keyStore].order.loading)
    const entity = useSelector(store => store[keyStore].order.entity)
    const [tabValue, setTabValue] = useState(TabType.thongtin.id)
    const { cusId, orderId } = params
    const [hs, setHs] = useState(HomeSubscription['0'].id)

    useEffect(() => {
        dispatch(getDetail({ cusId, orderId }))
        dispatch(getCustomers())
        if (cusId && orderId) {
            setHs(1);
        }
    }, [dispatch, cusId, orderId])

    const handleSaveData = (values) => {
        alertInformation({
            text: 'Bạn có muốn lưu thông tin ?',
            data: values,
            confirm: async (item) => {
                const resultAction = await dispatch(insertOrder(customModal(item)));
                unwrapResult(resultAction);
                History.push('/order')
            }
        })
    }

    const formik = useFormik({
        initialValues: { ...entity, customercity: entity?.cityid || null, customerdistrict: entity?.districtid || null, customerward: entity?.wardid || null, orderType: 1 },
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        // validate: () => { Object.values(formik.errors)?.length > 0 && setTabValue(TabType.co_ban.id) },
        validationSchema: Yup.object({
            customerid: Yup.number().typeError("Mã khách hàng không được bỏ trống !").required("Mã khách hàng không được bỏ trống !"),
            customername: Yup.string().typeError("Tên khách hàng không được bỏ trống !").required("Tên khách hàng không được bỏ trống !"),
        })
    })
    // console.log(formik);
    function handleChangeTab(event, value) {
        setTabValue(value);
        dispatch(setStateRedux({ searchDetailEntities: null }))
    }
    const setValue = formik.setFieldValue
    const productorder = formik?.values?.productorder

    useEffect(() => {
        if (Array.isArray(productorder)) {
            var total = productorder?.map(x => x.quantity * x.price)
            let sum = 0;
            total.map(x => sum += x);
            setValue('moneytotal', sum)
        }
    }, [productorder, setValue])

    // console.log('formik', formik.values)
    return (
        <CmsCardedPage
            title={orderId === '0' ? `Thêm mới đơn hàng` : `Cập nhật đơn hàng (Mã ID: ${orderId})`}
            subTitle={'Tạo mới đơn hàng'}
            icon="whatshot"
            // leftBottomHeader={leftBottomHeader}
            rightHeaderButton={
                <div>
                    <CmsButton label="Danh sách đơn hàng" variant="text" color="default" component={Link} to={`/order`} className="mx-2" startIcon="arrow_back" />
                </div>
            }
            content={
                <OrderContext.Provider value={{ hs, setHs }}>
                    {tabValue === TabType.thongtin.id && (
                        <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }}>
                            <BasicInfoContent formik={formik} />
                        </FuseAnimateGroup>)}
                    {tabValue === TabType.chitiet.id && (
                        <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }}>
                            <DetailProductContent formik={formik} />
                        </FuseAnimateGroup>
                    )}
                </OrderContext.Provider>
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <div className="flex items-center justify-items-start">
                        <div className="overflow-y-auto">
                            <CmsTab data={Object.values(TabType)} value={tabValue} onChange={handleChangeTab} />
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-8">
                        {
                            (Boolean(cusId) && orderId === '0')
                            &&
                            <CmsButtonProgress label="Lưu" onClick={formik.handleSubmit} loading={loading} />
                        }
                    </div>
                </div>
            }
        />
    )
}
export default withReducer(keyStore, reducer)(EditOrderContent) 