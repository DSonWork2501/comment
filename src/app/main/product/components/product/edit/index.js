import { CmsBoxLine, CmsButton, CmsCardedPage } from "@widgets/components"
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

function EditProduct(props) {
    const params = useParams()
    const dispatch = useDispatch()
    const entity = useSelector(store => store[keyStore].product.entity)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (params?.id) {
            dispatch(getProduct({search: params?.id}))
        }
    }, [params, dispatch])

    useEffect(() => {
        setData(entity?.data)
    }, [entity])

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
                    <div className="w-full h-full px-16 pb-40 pt-8">
                        <CmsBoxLine label="Thông tin cơ bản">
                            <BasicInfo data={data?.products} />
                        </CmsBoxLine>
                    </div>
                }
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <div className="flex items-center justify-items-start">
                        </div>
                        <div className="flex items-center justify-end">

                        </div>
                    </div>
                }
            />
        )
    )
}
export default withReducer(keyStore, reducer)(EditProduct);