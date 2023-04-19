import { makeStyles } from "@material-ui/core"
import { CmsButton, CmsLabel, CmsTextField } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import noImage from '@widgets/images/noImage.jpg';
import clsx from "clsx"

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

function DetailShelfContent({ value, img, index, handleClickBread, classes, HandleAddData }) {
    return (
        <div onClick={handleClickBread}>
            <div key={`div-0-detail-${index}`}
                className={clsx("w-full grid justify-items-center space-y-8 hover: shadow-4 py-4", classes.shelf)}
            >
                <img src={img || noImage} alt="image_detail" className="h-128" />
                <div className="grid justify-items-start">
                    <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} />
                    <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                    <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min' }} info={{ content: value?.color || '-' }} />
                    <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min' }} info={{ content: value?.quantity || '-' }} />
                </div>
            </div>
        </div>
    )
}
// chi tiết ngăn tủ
function DetailShelfProductContent({ data, index, classes, HandleAddData }) {
    const [quantity, setQuantity] = useState(0)
    const value = data?.item || null
    const img = value.img ? `${baseurl}${value.img}` : noImage
    return (
        <div
            key={`div-0-detai-${index}`}
            className={clsx("w-full flex flex-row shadow-2 hover:shadow-4 p-4 h-64", classes.shelf)}
        >
            <div className="w-2/3 flex flex-row">
                <div className="flex self-center w-1/5">
                    <img src={img} alt="image_detail" className="object-cover h-60 self-center" />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} />
                    <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min' }} info={{ content: value?.color || '-' }} />
                    <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min' }} info={{ content: value?.quantity || '-' }} />
                </div>
            </div>
            <div className="flex flex-row space-x-8 w-1/3 self-center">
                <CmsTextField
                    key={`quantity-${index}-labelInfo`}
                    isNumber
                    inputProps={{ inputProps: { min: 0, max: 1000 } }}
                    size="small"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    name="quantity"
                    label="Số lượng"
                />
                <CmsButton
                    key={`add-${index}-button`}
                    size="small"
                    label="thêm"
                    onClick={() => HandleAddData({ quantity, index: 0, item: value })}
                />
            </div>
        </div>
    )
}
// Ngăn tủ
function DetailModelContent({ value, classes, HandleAddData }) {
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
                        HandleAddData={HandleAddData}
                        classes={classes}
                    />
                ))}
            </div>
        </div>
    )
}

function ShelfProductContent({ img, HandleAddData, data }) {
    const classes = useStyles()
    const [breadValue, setBreadValue] = useState('danh_sach_tu')
    const [model, setModel] = useState([])

    const handleClickBread = useCallback((name, item) => {
        switch (name) {
            case 'danh_sach_tu':
                setBreadValue(name)
                setModel([])
                break
            case 'chi_tiet_san_pham':
                setBreadValue(name)
                setModel(JSON.parse(item.model) ? JSON.parse(item.model) : [])
                break
            default:
                break
        }
    }, [])

    console.log('model', model)
    return (
        <div className="w-full space-y-8">
            {breadValue === 'danh_sach_tu' &&
                <div className="w-full max-h-320 grid grid-cols-3 gap-4 place-items-start overflow-y-auto">
                    {data?.map((item, index) =>
                    (<DetailShelfContent
                        img={img}
                        value={item}
                        index={index}
                        key={`DetailShelf-${index}`}
                        HandleAddData={HandleAddData}
                        handleClickBread={() => handleClickBread('chi_tiet_san_pham', item)}
                        classes={classes}
                    />))}
                </div>}
            {breadValue === 'chi_tiet_san_pham' &&
                <div className="w-full space-y-8">
                    <div className="w-full flex-row-reverse">
                        <div>
                            <CmsButton
                                color="default"
                                startIcon="arrow_back"
                                label="Danh sách tủ"
                                onClick={() => handleClickBread('danh_sach_tu')}
                            />
                        </div>

                    </div>
                    <div className="max-h-320 overflow-y-auto">
                        {model?.map((item, index) =>
                        (<DetailModelContent
                            key={`DetailModelContent_${index}`}
                            value={item}
                            classes={classes}
                            HandleAddData={HandleAddData}
                        />))}
                    </div>
                </div>}
        </div >)
}
export default React.memo(ShelfProductContent)