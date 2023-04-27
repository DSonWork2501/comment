import { CmsButton, CmsDialog, CmsLabel, CmsTextField } from "@widgets/components"
import React, { useState } from "react"
import { keyStore } from "../../common"
import { useSelector } from "react-redux"
import clsx from "clsx"
import noImage from '@widgets/images/noImage.jpg';
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { makeStyles } from "@material-ui/core"
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
function DetailModelContent({ value }) {
    const classes = useStyles()
    const slots = value?.slots || []
    return (
        <div className="w-full grid border-solid border-2 border-green-500 rounded-4 ">
            <div className="w-full shadow-4 bg-green-500 rounded-2 grid">
                <CmsLabel
                    className="text-white justify-self-center"
                    content={value?.name}
                />
            </div>
            <div className="w-full space-y-8">
                {slots.map((item, index) => (
                    <DetailShelfProductContent
                        data={item}
                        index={index}
                        key={`DetailShelfProductContent-${index}`}
                        classes={classes}
                    />
                ))}
            </div>
        </div>
    )
}

function ShelfDetailContent({ open, handleClose }) {
    const entities = useSelector(store => store[keyStore]?.cusShelf?.detailEntities)
    console.log('entities', entities)
    return (
        <CmsDialog
            title="Thông tin chi tiết tủ"
            open={open}
            handleClose={handleClose}
            size="md"
        >
            <div className="">
                {entities?.data?.map((item, index) => (
                        <DetailModelContent
                            value={item}
                            index={index}
                            key={`DetailShelf-${index}`}
                        />
                    ))}
            </div>
        </CmsDialog>
    )
}

// chi tiết ngăn tủ
function DetailShelfProductContent({ data, index, classes }) {
    const value = data?.item || null
    const img = value.img ? `${baseurl}${value.img}` : noImage
    return (
        <div
            key={`div-0-detai-${index}`}
            className={clsx("w-full flex flex-row shadow-2 hover:shadow-4 p-4 min-h-64", classes.shelf)}
        >
            <div className="flex flex-row">
                <div className="flex self-center">
                    <img src={img} alt="image_detail" className="object-cover h-60 self-center" />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} />
                    <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`name-${index}-labelInfo`} label={{ content: 'tên', className: 'min-w-min' }} info={{ content: value?.name || '-' }} />
                    {/* <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min' }} info={{ content: value?.color || '-' }} /> */}
                    <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min' }} info={{ content: value?.quantity || '-' }} />
                </div>
                <div className="self-center space-y-16 w-min">
                    <img alt={`qrcord_${index}`} src={value.qrcode ? `data:image/png;base64, ${value.qrcode}` : noImage} className="h-64"/>
                </div>
            </div>
        </div>
    )
}

export default ShelfDetailContent