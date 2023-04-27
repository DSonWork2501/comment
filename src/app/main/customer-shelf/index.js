import withReducer from "app/store/withReducer";
import React, { useCallback, useState } from "react";
import { keyStore } from "./common";
import reducer from "./store";
import { CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { getShelf, getWine, setSearch } from "./store/customerShelfSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { initColumn } from "@widgets/functions";
import noImage from '@widgets/images/noImage.jpg';
import GenFilterOptionContent from './components/index/GenFilterOption'
import { LabelInfo } from "@widgets/components/common/LabelInfo";
import ShelfDetailContent from "./components/detail/ShelfDetail";


export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const columns = [
    new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "name", label: "Tên sản phẩm", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "cusname", label: "Tên khách hàng", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "qrcode", label: "QRCode", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "image", label: "Hình ảnh", alignHeader: "left", alignValue: "left", sortable: false }),
]

function CustomerShelfContent() {
    const dispatch = useDispatch()
    const entities = useSelector(store => store[keyStore]?.cusShelf?.entities)
    const loading = useSelector(store => store[keyStore]?.cusShelf?.loading)
    const search = useSelector(store => store[keyStore]?.cusShelf?.search)
    const [open, setOpen] = useState('')

    useEffect(() => {
        dispatch(getShelf(search))
    }, [search, dispatch])

    const handleShowDetail = useCallback((cusid, id) => {
        setOpen('detail')
        dispatch(getWine({ cusId: cusid, parentId: id, cms: 1 }))
    }, [dispatch])

    const data = useMemo(() =>
        entities?.data?.map((x, index) => ({
            ...x,
            info: <div className="w-full">
                <LabelInfo label={{ content: 'SKU' }} info={{ content: x.sku }} />
                <LabelInfo label={{ content: 'Unique ID' }} info={{ content: x.uniqueid }} />
            </div>,
            qrcode: <img alt={`image_${index}`} src={x.qrcode ? `data:image/png;base64, ${x.qrcode}` : noImage} className="h-64" />,
            image: <img alt={`image_${index}`} src={x.img ? `${baseurl}${x.img}` : noImage} className="h-64" />,
            action: <div>
                {x.parentid === 0 && <CmsIconButton icon="info" onClick={() => handleShowDetail(x.cusid, x.id)} tooltip={'chi tiết'} />}
            </div>
        })) || []
        , [entities, handleShowDetail])

    return (
        <CmsCardedPage
            title={'Danh sách tủ rượu/ rượu khách hàng'}
            subTitle={'Quản lý thông tin sản phâm của khách hàng'}
            icon="whatshot"
            // leftBottomHeader={leftBottomHeader}
            rightHeaderButton={
                <div>

                </div>
            }
            content={
                <>
                    <CmsTableBasic
                        className="w-full"
                        isServerSide={true}
                        data={data}
                        search={search}
                        setSearch={(value) => dispatch(setSearch({ ...search, value }))}
                        columns={columns}
                        loading={loading}
                        pagination={data?.pagination}
                    />
                    {open === 'detail' &&
                        <ShelfDetailContent
                            open={open === 'detail'}
                            handleClose={() => setOpen('')}
                        />}
                </>
            }
            toolbar={
                <div className="w-full flex items-center justify-between px-12">
                    <GenFilterOptionContent />
                    {/* <div className="flex w-2/3 items-center justify-items-start">
                        
                    </div>
                    <div className="flex items-center justify-end space-x-8">
                        
                    </div> */}
                </div>
            }
        />
    )
}

export default withReducer(keyStore, reducer)(CustomerShelfContent);