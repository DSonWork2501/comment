import { CmsAlert, CmsBoxLine, CmsButton, CmsButtonProgress, CmsCardedPage, CmsLoadingOverlay, CmsTab } from "@widgets/components"
import { keyStore } from "app/main/product/common"
import reducer from "app/main/product/store"
import withReducer from "app/store/withReducer"
import React, { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import BasicInfo from "./BasicInfo"
import { getDetail, insertProduct, product, updateProduct } from "../../../store/productSlice";
import { initData, initProduct } from '../../../model/product/model'
import { useFormik } from "formik"
import ClassifyInfo from "./ClassifyInfo"
import { colors } from "@material-ui/core"
import { alertInformation } from "@widgets/functions"
import * as Yup from 'yup'
import { HomeSubscription } from "app/main/product/model/product/homeSubscription"
import { getOrigin } from "@widgets/store/filtersSlice"
import { productMeta } from "app/main/product-meta/store"
import CateInfo from "./CateInfo"

const TabType = {
    co_ban: { id: '1', name: 'Thông tin cơ bản' },
    phan_loai: { id: '2', name: 'Thông tin phân loại' },
    cate: { id: '3', name: 'Thông tin danh mục' },
}

function EditProduct(props) {
    const params = useParams()
    const dispatch = useDispatch()
    const entity = useSelector(store => store[keyStore].product.entity)
    const loading = useSelector(store => store[keyStore].product.loading)
    const cates = useSelector(store => store[keyStore].product.cates)
    const origins = useSelector(store => store['widgets'].filter.xuatxu)
    const [data, setData] = useState(null)
    const [tabValue, setTabValue] = useState(TabType.co_ban.id)

    const getListTable = useCallback((params) => {
        dispatch(getDetail({ sku: params?.id }))
    }, [dispatch])

    useEffect(() => {
        if (params?.id) {
            getListTable(params)
        }
    }, [params, dispatch, getListTable])

    const handleFresh = () => {
        getListTable(params)
    }

    useEffect(() => {
        dispatch(getOrigin());
        dispatch(productMeta.meta.getList({ type: 1 }));
        dispatch(productMeta.meta.getList({ type: 2 }));
        dispatch(productMeta.meta.getList({ type: 4 }));
        dispatch(productMeta.meta.getList({ type: 3 }));
        dispatch(productMeta.meta.getList({ type: 5 }));
    }, [dispatch])

    useEffect(() => {
        setData(entity?.data)
    }, [entity])

    const handleSaveData = (values) => {

        let value = { ...values };
        if (value?.certification && Array.isArray(value?.certification))
            value.certification = value.certification.join(',');

        alertInformation({
            text: 'Bạn có muốn lưu thao tác',
            data: value,
            confirm: async (data) => {
                var model = {
                    products: [
                        initProduct(data)
                    ],
                    details: [...data.detail.map(x => ({
                        ...x,
                        model: parseInt(values.ishs) === parseInt(HomeSubscription['1'].id) ? x.model : '',
                        capacity: parseInt(x.capacity) ? parseInt(x.capacity) : 0,
                        volume: x?.volume ? parseInt(x?.volume) : 0,
                        weight: x?.weight ? parseInt(x?.weight) : 0,
                        height: x?.height ? parseInt(x?.height) : 0,
                    }))],
                    "prices": data.detail.map(x => (
                        {
                            "uniqueid": x.uniqueid || 0,
                            "retailprice": parseInt(x.retailprice) || 0,
                            "wholesaleprice": parseInt(x.wholesaleprice) || 0,
                            "price": parseInt(x.price) || 0,
                            "discount": parseInt(x.discount) || 0,
                            "vat": parseInt(x.vat) || 0,
                            "temporaryprice": parseInt(x.temporaryprice) || 0,
                        }
                    )),
                    properties: data?.properties?.length ? data?.properties.map(val => ({ ...val, sku: data.sku })) : []
                }

                params?.id === '0' ? await dispatch(insertProduct(model)) : await dispatch(updateProduct(model))
                if (data?.newCates?.length)
                    await dispatch(product.other.addProductCate(data?.newCates))
                dispatch(getDetail({ sku: value.sku }))
                formik.setSubmitting(false)

            },
            close:()=>{
                formik.setSubmitting(false)
            }
        })
    }


    const handleResetData = () => {
        CmsAlert.fire({
            icon: 'question',
            heightAuto: false,
            title: `Bạn có muốn reset lại data ?`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Đồng Ý",
            confirmButtonColor: colors.green[500]
        }).then(result => {
            formik.setValues(initData(data))
            formik.setSubmitting(false);
        })

    }

    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    const formik = useFormik({
        initialValues: initData(data),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        // validate: () => { Object.values(formik.errors)?.length > 0 && setTabValue(TabType.co_ban.id) },
        validationSchema: Yup.object({
            name: Yup.string().typeError("Tên sản phẩm không được bỏ trống !").required("Tên sản phẩm không được bỏ trống !"),
            sku: Yup.string().typeError("SKU không được bỏ trống !").required("SKU không được bỏ trống !"),
            barcode: Yup.string().typeError("Barcode không được bỏ trống !").required("Barcode không được bỏ trống !"),
        })
    })

    const { values } = formik, { sku, ishs } = values;

    return (
        (
            <CmsCardedPage
                title={params.id ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}
                subTitle={'Quản lý thông tin sản phẩm'}
                icon="whatshot"
                // leftBottomHeader={leftBottomHeader}
                rightHeaderButton={
                    <div>
                        <CmsButton label="Danh sách sản phẩm" variant="text" color="default" component={Link} to={`/product`} className="mx-2" startIcon="arrow_back" />
                    </div>
                }
                content={
                    <div className="w-full h-full px-16 pb-40 pt-20 space-y-10">
                        <CmsLoadingOverlay loading={loading} />
                        {tabValue === TabType.co_ban.id &&
                            <CmsBoxLine label="Thông tin cơ bản">
                                <BasicInfo
                                    handleFresh={handleFresh}
                                    formik={formik} options={{ origins, cates }} />
                            </CmsBoxLine>}
                        {tabValue === TabType.phan_loai.id &&
                            <CmsBoxLine label="Thông tin phân loại">
                                <ClassifyInfo formik={formik} />
                            </CmsBoxLine>}
                        {tabValue === TabType.cate.id &&
                            <CmsBoxLine label="Thông tin danh mục">
                                <CateInfo formikParent={formik} sku={sku} ishs={ishs} dataOb={entity?.data?.categorys || []} />
                            </CmsBoxLine>}
                    </div>
                }
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <div className="flex items-center justify-items-start">
                            <div className="overflow-y-auto">
                                <CmsTab data={Object.values(TabType).map(val => ({ ...val, disabled: Boolean(val.id === '3' && (!sku || ishs === null)) ? true : false }))} value={tabValue} onChange={handleChangeTab} />
                            </div>
                        </div>
                        <div className="flex items-center justify-end space-x-8">
                            <CmsButtonProgress
                                disabled={formik.isSubmitting}
                                label="Lưu"
                                onClick={formik.handleSubmit}
                                loading={loading} />
                            <CmsButtonProgress color="default" label="Reset" onClick={handleResetData} />
                        </div>
                    </div>
                }
            />
        )
    )
}
export default withReducer(keyStore, reducer)(EditProduct);