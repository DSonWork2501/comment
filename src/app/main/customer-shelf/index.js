import withReducer from "app/store/withReducer";
import React, { useCallback, useState } from "react";
import { keyStore } from "./common";
import reducer from "./store";
import { CmsButton, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { getShelf, getWine, setSearch } from "./store/customerShelfSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { initColumn } from "@widgets/functions";
import noImage from '@widgets/images/noImage.jpg';
import GenFilterOptionContent from './components/index/GenFilterOption'
import { LabelInfo } from "@widgets/components/common/LabelInfo";
import ShelfDetailContent from "./components/detail/ShelfDetail";
import { CustomerProductType } from "./model/CustomerProductType";
import { Link } from "@material-ui/core";


export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function CustomerShelfContent() {
    const dispatch = useDispatch()
    const entities = useSelector(store => store[keyStore]?.cusShelf?.entities)
    const loading = useSelector(store => store[keyStore]?.cusShelf?.loading)
    const search = useSelector(store => store[keyStore]?.cusShelf?.search)
    const [detail, setDetail] = useState(null);
    const [open, setOpen] = useState('')

    useEffect(() => {
        dispatch(getShelf(search))
    }, [search, dispatch])

    const handleShowDetail = useCallback((cusid, id) => {
        setOpen('detail')
        dispatch(getWine({ cusId: cusid, parentId: id, cms: 1 }))
    }, [dispatch])

    const handleDownloadQRCode = useCallback(({ qrcode, name, uniqueid }) => {
        var a = document.createElement("a"); //Create <a>
        a.href = `data:image/png;base64, ${qrcode}`; //Image Base64 Goes here
        a.download = `${name}_${uniqueid?.replace('.', '_')}.png`; //File name Here
        a.click(); //
    }, [])



    const data = useMemo(() =>
        entities?.data?.map((x, index) => ({
            ...x,
            info: <div className="w-full">
                <LabelInfo label={{ content: 'SKU' }} info={{ content: x.sku }} />
                <LabelInfo label={{ content: 'Unique ID' }} info={{ content: x.uniqueid }} />
            </div>,
            qrcode:
                <div className="space-y-4 w-60">
                    <img alt={`image_${index}`} src={x.qrcode ? `data:image/png;base64, ${x.qrcode}` : noImage} className="text-center" />
                    {x.qrcode && <CmsButton className="text-center" variant="outlined" size="small" label="tải về" component={Link} onClick={() => handleDownloadQRCode(x)} />}
                </div>,
            image: <img alt={`image_${index}`} src={x.img ? `${baseurl}${x.img}` : noImage} className="h-64" />,
            action: <div>
                {x.type === "household" && <CmsIconButton icon="info" onClick={() => {
                    handleShowDetail(x.cusid, x.id);
                    setDetail(x);
                }} tooltip={'chi tiết'} />}
            </div>
        })) || []
        , [entities, handleShowDetail, handleDownloadQRCode])

    const columns = [
        new initColumn({ field: 'id', label: CustomerProductType['wine'].id === search.Type ? 'imei' : 'id', classHeader: "w-128", sortable: false }),
        new initColumn({ field: "info", label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "name", label: "Tên sản phẩm", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "cusname", label: "Tên khách hàng", alignHeader: "left", alignValue: "left", sortable: false }),
        CustomerProductType['wine'].id === search.Type && new initColumn({ field: "qrcode", label: "QRCode", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "image", label: "Hình ảnh", alignHeader: "left", alignValue: "left", sortable: false }),
    ]

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
                            detail={detail}
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