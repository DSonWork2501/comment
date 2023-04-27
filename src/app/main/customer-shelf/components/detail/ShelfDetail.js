import { CmsButton, CmsDialog, CmsLabel, } from "@widgets/components"
import React, { } from "react"
import { keyStore } from "../../common"
import { useSelector } from "react-redux"
import clsx from "clsx"
import noImage from '@widgets/images/noImage.jpg';
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { Link, makeStyles } from "@material-ui/core"
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
                    content={`${value?.name} (Số lượng: ${slots?.length})`}
                />
            </div>
            <div className="w-full space-y-8">
                <div>

                </div>
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

    const handleDownloadAll = () => {
        for (let index = 0; index < entities?.data?.length; index++) {
            const slots = entities?.data[index].slots;
            for (let i = 0; i < slots?.length; i++) {
                const item = slots[i].item;
                if (item.qrcode) {
                    var a = document.createElement("a"); //Create <a>
                    a.href = `data:image/png;base64, ${item.qrcode}`; //Image Base64 Goes here
                    a.download = `${item.name}_${item.uniqueid?.replace('.', '_')}.png`; //File name Here
                    a.click(); //Downloaded file
                }
            }
        }
    }

    return (
        <CmsDialog
            title="Thông tin chi tiết tủ"
            open={open}
            handleClose={handleClose}
            size="md"
        >
            <div className="w-full space-y-4">
                <div className="text-right">
                    {entities?.data.length > 0 && <CmsButton className="" variant="outlined" size="small" label="Tải All" component={Link} onClick={() => handleDownloadAll()} />}
                </div>
                {entities?.data?.length > 0 ? entities?.data?.map((item, index) => (
                    <DetailModelContent
                        value={item}
                        index={index}
                        key={`DetailShelf-${index}`}
                    />
                )) : <div className="border-collapse border-2 border-green-500">
                    <CmsLabel
                        content={'Không có dữ liệu !'}
                        className="text-red-500 text-center"
                    />
                </div>
                }
            </div>
        </CmsDialog>
    )
}

// chi tiết ngăn tủ
function DetailShelfProductContent({ data, index, classes }) {
    const value = data?.item || null
    const img = value.img ? `${baseurl}${value.img}` : noImage

    const handleDownload = ({ qrcode, name, uniqueid }) => {
        var a = document.createElement("a"); //Create <a>
        a.href = `data:image/png;base64, ${qrcode}`; //Image Base64 Goes here
        a.download = `${name}_${uniqueid?.replace('.', '_')}.png`; //File name Here
        a.click(); //Downloaded file
    }

    return (
        <div
            key={`div-0-detai-${index}`}
            className={clsx("w-full flex flex-row shadow-2 hover:shadow-4 p-4 min-h-64", classes.shelf)}
        >
            <div className="w-1/5 self-center">
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
            <div className="w-1/5 self-center space-y-2 text-center">
                <img alt={`qrcord_${index}`} src={value.qrcode ? `data:image/png;base64, ${value.qrcode}` : noImage} className="" />
                {value.qrcode && <CmsButton variant="outlined" size="small" label="tải về" component={Link} onClick={() => handleDownload(value)} />}
            </div>
        </div>
    )
}

export default ShelfDetailContent