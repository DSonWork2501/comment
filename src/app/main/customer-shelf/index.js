import withReducer from "app/store/withReducer";
import React, { useCallback, useState } from "react";
import { keyStore } from "./common";
import reducer from "./store";
import { CmsButton, CmsCardedPage, CmsIconButton, CmsTableBasic } from "@widgets/components";
import { customerShelf, getShelf, getWine, setSearch } from "./store/customerShelfSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { initColumn } from "@widgets/functions";
import noImage from '@widgets/images/noImage.jpg';
import GenFilterOptionContent from './components/index/GenFilterOption'
import { LabelInfo } from "@widgets/components/common/LabelInfo";
import ShelfDetailContent from "./components/detail/ShelfDetail";
import { CustomerProductType } from "./model/CustomerProductType";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { Box, TableCell, TableRow, styled } from "@material-ui/core";

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .Mui-selected": {
        background: 'rgb(215 247 250)'
    },
    "& .inner-scroll >div:first-child": {
        height: 90,
        minHeight: 'initial'
    }
});

export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function CustomerShelfContent() {
    const dispatch = useDispatch()
    const entities = useSelector(store => store[keyStore]?.cusShelf?.entities)
    const loading = useSelector(store => store[keyStore]?.cusShelf?.loading)
    const search = useSelector(store => store[keyStore]?.cusShelf?.search)
    const summary = useSelector(store => store[keyStore]?.cusShelf?.summary)
    const params = useParams(), type = parseInt(params.type);
    const [detail, setDetail] = useState(null);
    const [open, setOpen] = useState('')

    useEffect(() => {
        if (type)
            dispatch(getShelf({ ...search, Type: Object.values(CustomerProductType).find(val => val.rawID === type)?.id }))
        if (type === 1)
            dispatch(customerShelf.other.getSummary());
    }, [search, type, dispatch])

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
            action: <div className="flex space-x-3 ">
                {x.type === "household" &&
                    <>
                        <CmsIconButton
                            tooltip="Chi tiết"
                            delay={50}
                            icon="visibility"
                            className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
                            onClick={() => {
                                handleShowDetail(x.cusid, x.id);
                                setDetail(x);
                            }} />
                        <CmsIconButton
                            tooltip="Chi tiết đơn hàng"
                            delay={50}
                            icon="format_list_bulleted"
                            className="bg-green-500 text-white shadow-3  hover:bg-green-900"
                            component={Link}
                            to={`/order/edit/${x.cusid}/${x.id}`} />
                    </>
                }

            </div>
        })) || []
        , [entities, handleShowDetail, handleDownloadQRCode])

    const columns = [
        new initColumn({ field: 'id', style: { top: type === 1 ? 78 : 0 }, label: CustomerProductType['wine'].id === search.Type ? 'imei' : 'id', classHeader: "w-128", sortable: false }),
        new initColumn({ field: "info", style: { top: type === 1 ? 78 : 0 }, label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "name", style: { top: type === 1 ? 78 : 0 }, label: "Tên sản phẩm", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "cusname", style: { top: type === 1 ? 78 : 0 }, label: "Tên khách hàng", alignHeader: "left", alignValue: "left", sortable: false }),
        CustomerProductType['wine'].id === search.Type && new initColumn({ field: "qrcode", label: "QRCode", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "image", style: { top: type === 1 ? 78 : 0 }, label: "Hình ảnh", alignHeader: "left", alignValue: "left", sortable: false }),
    ]

    return (
        <LayoutCustom>
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
                            className="w-full h-full"
                            isServerSide={true}
                            data={data}
                            search={search}
                            setSearch={(value) => dispatch(setSearch({ ...search, value }))}
                            columns={columns}
                            loading={loading}
                            pagination={data?.pagination}
                            upperHead={
                                type === 1
                                &&
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                    >
                                        <div className="flex space-x-32 px-20">
                                            <div className="flex-1 flex justify-between rounded-4 py-8 px-14 bg-blue-50">
                                                CHƯA SỬ DỤNG:
                                                <span>
                                                    {
                                                        summary?.chua_su_dung
                                                            ? summary?.chua_su_dung.toLocaleString('en-US')
                                                            : 0
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex-1 flex justify-between rounded-4 py-8 px-14 bg-blue-50">
                                                ĐÃ NẠP LẠI:
                                                <span>
                                                    {
                                                        summary?.da_nap_lai
                                                            ? summary?.da_nap_lai.toLocaleString('en-US')
                                                            : 0
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex-1 flex justify-between rounded-4 py-8 px-14 bg-blue-50">
                                                ĐÃ UỐNG:
                                                <span>
                                                    {
                                                        summary?.da_uong
                                                            ? summary?.da_uong.toLocaleString('en-US')
                                                            : 0
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            }
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
                    </div>
                }
            />
        </LayoutCustom>
    )
}

export default withReducer(keyStore, reducer)(CustomerShelfContent);