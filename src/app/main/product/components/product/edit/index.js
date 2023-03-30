import { CmsAlert, CmsBoxLine, CmsButton, CmsButtonProgress, CmsCardedPage, CmsLoadingOverlay, CmsTab } from "@widgets/components"
import { keyStore } from "app/main/product/common"
import reducer from "app/main/product/store"
import withReducer from "app/store/withReducer"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import BasicInfo from "./BasicInfo"
import { getDetail, insertProduct, updateProduct } from "../../../store/productSlice";
import { initData, initProduct } from '../../../model/product/model'
import { useFormik } from "formik"
import ClassifyInfo from "./ClassifyInfo"
import { colors } from "@material-ui/core"
import { alertInformation } from "@widgets/functions"
import * as Yup from 'yup'

const TabType = {
    co_ban: { id: '1', name: 'Thông tin cơ bản' },
    phan_loai: { id: '2', name: 'Thông tin phân loại' },
}

function EditProduct(props) {
    const params = useParams()
    const dispatch = useDispatch()
    const entity = useSelector(store => store[keyStore].product.entity)
    const loading = useSelector(store => store[keyStore].product.loading)
    const [data, setData] = useState(null)
    const [tabValue, setTabValue] = useState(TabType.co_ban.id)

    useEffect(() => {
        if (params?.id) {
            dispatch(getDetail({ sku: params?.id }))
        }
    }, [params, dispatch])

    useEffect(() => {
        setData(entity?.data)
    }, [entity])

    const handleSaveData = (values) => {
        alertInformation({
            text: 'Bạn có muốn lưu thao tác',
            data: values,
            confirm: async (data) => {
                var model = {
                    products: [
                        initProduct(data)
                    ],
                    details: data.detail

                }
                params?.id === 0 ? await dispatch(insertProduct(model)) : await dispatch(updateProduct(model))
            },
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
        validate: () => { Object.values(formik.errors)?.length > 0 && setTabValue(TabType.co_ban.id) },
        validationSchema: Yup.object({
            name: Yup.string().typeError("Tên sản phẩm không được bỏ trống !").required("Tên sản phẩm không được bỏ trống !"),
            sku: Yup.string().typeError("SKU không được bỏ trống !").required("SKU không được bỏ trống !"),
        })
    })

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
                                <BasicInfo formik={formik} />
                            </CmsBoxLine>}
                        {tabValue === TabType.phan_loai.id &&
                            <CmsBoxLine label="Thông tin phân loại">
                                <ClassifyInfo formik={formik} />
                            </CmsBoxLine>}
                    </div>
                }
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <div className="flex items-center justify-items-start">
                            <div className="overflow-y-auto">
                                <CmsTab data={Object.values(TabType)} value={tabValue} onChange={handleChangeTab} />
                            </div>
                        </div>
                        <div className="flex items-center justify-end space-x-8">
                            <CmsButtonProgress label="Lưu" onClick={formik.handleSubmit} loading={loading} />
                            <CmsButtonProgress color="default" label="Reset" onClick={handleResetData} />
                        </div>
                    </div>
                }
            />
        )
    )
}
export default withReducer(keyStore, reducer)(EditProduct);