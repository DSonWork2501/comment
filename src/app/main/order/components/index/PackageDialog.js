import { CmsButton, CmsButtonProgress, CmsCheckbox, CmsDialog, CmsLabel, } from "@widgets/components"
import React, { useMemo, useState } from "react"
import { keyStore } from "../../common"
import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx"
import noImage from '@widgets/images/noImage.jpg';
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { Divider, Link, makeStyles } from "@material-ui/core"
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup/FuseAnimateGroup"
import { getListHS } from "app/main/product/store/productSlice"
import ProductSearch from "app/main/product/components/product/edit/classify/rightSide/ProductSearch"
import ProductSearchList from "app/main/product/components/product/edit/classify/rightSide/ProductSearchList"
import { useEffect } from "react"
import UniqueProductList from "app/main/product/components/product/edit/classify/rightSide/UniqueProductList"
import { alertInformation } from "@widgets/functions"
import { unwrapResult } from "@reduxjs/toolkit"
import { getWine, customerShelf } from "app/main/customer-shelf/store/customerShelfSlice"
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        cursor: 'pointer'
    },
    shelf: {
        cursor: 'pointer'
    }
}));

// Ngăn tủ
function DetailModelContent({ value, setTab, handleChooseUniqueID, handleCheck }) {
    const classes = useStyles()
    const slots = value?.slots || []

    return (
        <div className="w-full grid border-solid border-2 border-green-500 rounded-4 ">
            <div className="w-full shadow-4 bg-green-500 rounded-2 grid">
                <CmsLabel
                    className="text-white justify-self-center"
                    content={`${value?.name} (Số lượng: ${slots?.length})`}
                />
            </div>
            <div className="w-full space-y-8">
                {slots.map((item, index) => (
                    <DetailShelfProductContent
                        data={item}
                        index={index}
                        setTab={setTab}
                        handleChooseUniqueID={handleChooseUniqueID}
                        key={`DetailShelfProductContent-${index}`}
                        classes={classes}
                        handleCheck={handleCheck}
                    />
                ))}
            </div>
        </div>

    )
}

const initialSearch = {
    pageNumber: 1,
    rowsPage: 10,
    homeSubscription: 2
}

export const ProductPopup = ({ setTab, handleChooseUniqueID }) => {
    const [search, setSearch] = useState(initialSearch);
    const dispatch = useDispatch();
    const [chosenSku, setChosenSku] = useState(null)

    useEffect(() => {
        dispatch(getListHS(search))
    }, [dispatch, search])

    const handleClickSku = (event, value) => {
        setChosenSku(value);
    }

    const handleKeyPressSearch = (event) => {
        if (event.key === 'Enter') {
            setSearch(prev => ({ ...prev, search: event.target.value }))
        }
    }

    const sku = chosenSku?.sku || null
    const img = chosenSku?.image ? `${baseurl}${chosenSku?.image}` : noImage
    const name = chosenSku?.name || null

    return <>
        {
            !Boolean(chosenSku)
                ? <>
                    <CmsButtonProgress
                        className="w-96 mb-8 float-right"
                        size="small"
                        label="Quay lại"
                        startIcon="undo"
                        color="default"
                        onClick={() => { setTab(null) }}
                    />
                    <ProductSearch keyStore={keyStore} handleKeyPressSearch={handleKeyPressSearch} />
                    <ProductSearchList
                        keyStore={keyStore}
                        onClickSku={handleClickSku}
                        setSearch={(value) => setSearch((prev) => ({ ...prev, ...value }))}
                    />
                </>
                : <UniqueProductList
                    sku={sku}
                    onClickView={() => setChosenSku(null)}
                    skuItem={{ img, name }}
                    onClickChooseUniqueId={(value) => handleChooseUniqueID({ value, setChosenSku })}
                />
        }
    </>
}

function PackageDialog({ open, handleClose, detail, handleCheck, handlePackage }) {
    const popupLoading = useSelector(store => store[keyStore]?.order?.popupLoading);
    const entities = useSelector(store => store[keyStore]?.order?.detailEntities);
    const [tab, setTab] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const isFullCheck = useMemo(() => {
        let totalWine = 0, totalCheck = 0;
        detail?.parentid !== 1
            ? entities.data?.length && entities.data.forEach(element => {
                element.slots?.length && element.slots.forEach(val => {
                    if (val?.item?.id) {
                        totalWine = totalWine + 1;
                        if (val?.item?.ispacked === 1)
                            totalCheck = totalCheck + 1;
                    }
                })
            })
            : entities.data?.length && entities.data.forEach(element => {
                totalWine = totalWine + 1;
                if (element?.ispacked === 1)
                    totalCheck = totalCheck + 1;
            })

        return totalWine !== totalCheck;
    }, [entities, detail])

    const handleChooseUniqueID = ({ value, oldValue, setChosenSku }) => {

        const oldItem = oldValue ? oldValue : tab;
        const data = {
            "olditem": {
                "id": oldItem.id,
                "cusid": detail.cusid,
                "parentid": detail.id,
                "uniqueid": oldItem.uniqueid,
                "imei_ord": oldItem.imei_ord,
                "name": oldItem.name,
                "img": oldItem.img,
                "capacity": oldItem.capacity,
                "note": oldItem.note,
                "qrcode": oldItem.qrcode,
                "status": oldItem.status,
                "type": oldItem.type
            },
            "newitem": {
                "id": 0,
                "cusid": detail.cusid,
                "parentid": detail.id,
                "uniqueid": value.uniqueid,
                "imei_ord": 0,
                "name": value.skuItem.name,
                "img": value.skuItem.img,
                "capacity": 0,
                "note": "",
                "qrcode": "",
                "status": 1,
                "type": "wine"
            }
        };

        alertInformation({
            text: `Xác nhận thao tác`,
            data,
            confirm: async (data) => {
                try {
                    const resultAction = await dispatch(customerShelf.other.reOrder(data));
                    unwrapResult(resultAction);
                    if (setChosenSku)
                        setChosenSku(null);
                    setTab(null);
                    dispatch(getWine({ cusId: detail.cusid, parentId: detail.id, cms: 1 }))
                } catch (error) { }
            },
        })
    }

    return (
        <CmsDialog
            title={`Thông tin chi tiết ${Boolean(detail?.parentid) ? 'chai rượu' : 'tủ rượu'}`}
            open={open}
            loading={popupLoading}
            handleClose={handleClose}
            handleSave={handlePackage}
            disabledSave={isFullCheck}
            size="md"
        >
            {
                tab === null
                    ? <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }} className="w-full">
                        <div className="w-full space-y-4">
                            {
                                Boolean(detail?.parentid)
                                    ? <>
                                        {entities?.data?.length > 0 ? entities?.data?.map(val => ({ item: { ...val } })).map((item, index) => (
                                            <DetailShelfProductContent
                                                data={item}
                                                index={index}
                                                setTab={setTab}
                                                key={`DetailShelfProductContent-${index}`}
                                                classes={classes}
                                                handleCheck={handleCheck}
                                            />
                                        )) : <div className="border-collapse border-2 border-green-500">
                                            <CmsLabel
                                                content={'Không có dữ liệu !'}
                                                className="text-red-500 text-center"
                                            />
                                        </div>
                                        }
                                    </>
                                    : <>
                                        {entities?.data?.length > 0 ? entities?.data?.map((item, index) => (
                                            <DetailModelContent
                                                value={item}
                                                index={index}
                                                handleChooseUniqueID={handleChooseUniqueID}
                                                setTab={setTab}
                                                key={`DetailShelf-${index}`}
                                                handleCheck={handleCheck}
                                            />
                                        )) : <div className="border-collapse border-2 border-green-500">
                                            <CmsLabel
                                                content={'Không có dữ liệu !'}
                                                className="text-red-500 text-center"
                                            />
                                        </div>
                                        }
                                    </>
                            }
                        </div>
                    </FuseAnimateGroup>
                    : <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }} className="w-full">
                        <ProductPopup
                            handleChooseUniqueID={handleChooseUniqueID}
                            setTab={setTab} />
                    </FuseAnimateGroup>
            }
        </CmsDialog>
    )
}

// chi tiết ngăn tủ
function DetailShelfProductContent({ data, index, classes, setTab, handleChooseUniqueID, handleCheck }) {
    const value = data?.item || null
    const img = value.img ? `${baseurl}${value.img}` : noImage

    const handleDownload = ({ qrcode, name, uniqueid }) => {
        // var a = document.createElement("a"); //Create <a>
        // a.href = `data:image/png;base64, ${qrcode}`; //Image Base64 Goes here
        // a.download = `${name}_${uniqueid?.replace('.', '_')}.png`; //File name Here
        // a.click(); //Downloaded file
        var qrImage = new Image();

        qrImage.src = `data:image/png;base64, ${qrcode}`;

        qrImage.onload = function () {
            var printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(`<html>
                <head>
                <title>${name}</title>
                </head>
                <body style="display:flex;align-items:center;justify-content:center">
                    <div style="width:100%">
                        <img style="width:100%;margin:auto" src="${qrImage.src}" alt="QR Code">
                    </div>
                </body>
            </html>`);
            printWindow.document.close();

            printWindow.onload = function () {
                printWindow.print();
                setTimeout(function () {
                    printWindow.close();
                }, 1000);
            };
        };
    }

    return (
        <div className="px-4 relative">
            <div
                key={`div-0-detai-${index}`}
                className={clsx("w-full flex flex-row shadow-2 hover:shadow-4 p-4 min-h-64", classes.shelf, value?.status === 0 && 'opacity-10')}
            >
                <div className="w-2/6 self-center">
                    <img src={img} alt="image_detail" className="object-cover h-92" />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} />
                    <LabelInfo key={`imei_ord-${index}-labelInfo`} label={{ content: 'imei đơn hàng', className: 'min-w-min' }} info={{ content: value?.imei_ord || '-' }} />

                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`name-${index}-labelInfo`} label={{ content: 'tên', className: 'min-w-min' }} info={{ content: value?.name || '-' }} />
                    {/* <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min' }} info={{ content: value?.color || '-' }} /> */}
                    <LabelInfo key={`sku-${index}-labelInfo`} label={{ content: 'sku', className: 'min-w-min' }} info={{ content: value?.sku || '-' }} />
                </div>
                <div className="w-1/6 self-center space-y-2 text-center">
                    <img alt={`qrcord_${index}`} src={value.qrcode ? `data:image/png;base64, ${value.qrcode}` : noImage} className="" />
                    {value.qrcode && <CmsButton variant="outlined" size="small" label="In" component={Link} onClick={() => handleDownload(value)} />}
                </div>
                <Divider className="h-92 mx-8" orientation="vertical" />
                <div className="w-2/6 self-center space-y-2 text-center">
                    <CmsCheckbox
                        key={`box`}
                        checked={Boolean(value.ispacked)}
                        label="Đã Gói"
                        value={false}
                        onChange={e => {
                            handleCheck(e.target.checked, value.id)
                        }}
                        name="status"
                    />
                </div>
            </div>
            {
                value?.status === 0
                &&
                <div className="absolute top-1/2  transform  -translate-y-1/2 right-8">
                    <CmsButtonProgress
                        className="w-96 mb-4"
                        size="small"
                        label="Làm mới"
                        startIcon="undo"
                        color="default"
                        onClick={() => {
                            handleChooseUniqueID({
                                value: {
                                    uniqueid: value?.uniqueid,
                                    skuItem: {
                                        img: value?.image,
                                        name: value?.name
                                    }
                                },
                                oldValue: value
                            });
                        }}
                    />
                    <CmsButtonProgress
                        className="w-96"
                        size="small"
                        label="Thay thế"
                        startIcon="refresh"
                        color="primary"
                        onClick={() => { setTab(value) }}
                    />
                </div>
            }
        </div>
    )
}

export default PackageDialog