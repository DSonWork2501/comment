import { CmsBoxLine, CmsButton, CmsButtonProgress, CmsCardedPage, CmsTab } from "@widgets/components"
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
import { getList as getProduct } from "../../../store/productSlice";
import { initData } from '../../../model/product/model'
import { useFormik } from "formik"
import ClassifyInfo from "./ClassifyInfo"

const TabType = {
    co_ban: { id: '1', name: 'Thông tin cơ bản' },
    phan_loai: { id: '2', name: 'Thông tin phân loại' },
}

function EditProduct(props) {
    const params = useParams()
    const dispatch = useDispatch()
    const entity = useSelector(store => store[keyStore].product.entity)
    const [data, setData] = useState(null)
    const [tabValue, setTabValue] = useState(TabType.co_ban.id)

    useEffect(() => {
        if (params?.id) {
            dispatch(getProduct({ search: params?.id }))
        }
    }, [params, dispatch])

    useEffect(() => {
        setData(entity?.data)
    }, [entity])

    const handleSaveData = ({ BasicInfo }) => {
        console.log('BasicInfo', BasicInfo)
    }

    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    const formik = useFormik({
        initialValues: initData(data),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData
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
                    <div className="w-full h-full px-16 pb-40 pt-20 px-40 space-y-10">
                        {tabValue === TabType.co_ban.id &&
                            <CmsBoxLine label="Thông tin cơ bản">
                                <BasicInfo formik={formik} />
                            </CmsBoxLine>}
                        {tabValue === TabType.phan_loai.id &&
                            <CmsBoxLine label="Thông tin phân loại">
                                <ClassifyInfo formik={formik}  />
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
                        <div className="flex items-center justify-end">
                            <CmsButtonProgress label="Lưu" onClick={handleSaveData} />
                        </div>
                    </div>
                }
            />
        )
    )
}
export default withReducer(keyStore, reducer)(EditProduct);