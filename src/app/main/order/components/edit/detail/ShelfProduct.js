import { Tooltip, makeStyles } from "@material-ui/core"
import { CmsButton, CmsIconButton, CmsLabel } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import React, { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import noImage from '@widgets/images/noImage.jpg';
import clsx from "clsx"
import ShelfContent from "app/main/product/components/product/edit/classify/Shelf"
import { returnModelPr } from "app/main/product/components/product/edit/ClassifyInfo"
import { useRef } from "react"

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
            <Tooltip title={<CmsLabel content={'Click vào để hiển thị thông tin chi tiết !'} className="text-14" />}>
                <div key={`div-0-detail-${index}`}
                    className={clsx("border-1 border-collapse rounded-2 w-full grid justify-items-center space-y-8 hover:shadow-4 p-8", classes.shelf)}
                >
                    <img src={img || noImage} alt="image_detail" className="w-52" />
                    <div className="grid justify-items-start px-4">
                        <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min text-10' }} info={{ content: value?.uniqueid || '-', className: 'text-10' }} />
                        <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min text-10' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0, className: 'text-10' }} />
                        <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min text-10' }} info={{ content: value?.color || '-', className: 'text-10' }} />
                        <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min text-10' }} info={{ content: value?.quantity || '-', className: 'text-10' }} />
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}
function TooltipProduct({ value, index }) {

    return <div>
        <div className="w-full">
            <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min text-10' }} info={{ content: value?.uniqueid || '-', className: 'text-10' }} />
            <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min text-10' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0, className: 'text-10' }} />
        </div>
        <div className="w-full">
            <LabelInfo key={`name-${index}-labelInfo`} label={{ content: 'tên', className: 'min-w-min text-10' }} info={{ content: value?.name || '-', className: 'text-10' }} />
            <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min text-10' }} info={{ content: value?.quantity || '-', className: 'text-10' }} />
        </div>
    </div>

}
// chi tiết ngăn tủ
function DetailShelfProductContent({ data, index, classes, HandleAddData }) {
    //const quantity = 1;
    const value = data?.item || null
    const img = value?.img ? `${baseurl}${value.img}` : noImage
    return (
        <div
            key={`div-0-detai-${index}`}
            className={clsx("w-full shadow-2 hover:shadow-4 p-4 self-center space-y-8", classes.shelf)}
        >
            <div className="h-92 text-center m-auto">
                <img src={img} alt="image_detail" className="object-center h-full m-auto" />
            </div>
            <Tooltip title={<TooltipProduct value={value} index={index} />}>
                <div className="w-full flex flex-row items-center">
                    <CmsIconButton size="small" icon="info" className="" />
                    <CmsLabel content={value?.name} className="text-10 w-88 truncate" />
                </div>
            </Tooltip>
            <div className="flex flex-col space-y-8 self-center">
                {/* <CmsTextField
                    key={`quantity-${index}-labelInfo`}
                    isNumber
                    inputProps={{ inputProps: { min: 0, max: 1000 } }}
                    size="small"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    name="quantity"
                    label="Số lượng"
                /> */}
                {/* <CmsButton
                    key={`add-${index}-button`}
                    size="small"
                    label="thêm"
                    onClick={() => HandleAddData({ quantity, index: 0, item: value })}
                /> */}
            </div>
            {/* <div className="w-2/3 flex flex-row">
                <div className="flex self-center w-1/5">
                    <img src={img} alt="image_detail" className="object-cover h-60 self-center" />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min text-10' }} info={{ content: value?.uniqueid || '-', className: 'text-10' }} />
                    <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min text-10' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 , className: 'text-10'}} />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo key={`name-${index}-labelInfo`} label={{ content: 'tên', className: 'min-w-min text-10' }} info={{ content: value?.name || '-', className: 'text-10' }} />
                    <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min text-10' }} info={{ content: value?.quantity || '-', className: 'text-10' }} />
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
            </div> */}
        </div >
    )
}
// function DetailShelfProductContent({ data, index, classes, HandleAddData }) {
//     const [quantity, setQuantity] = useState(1)
//     const value = data?.item || null
//     const img = value.img ? `${baseurl}${value.img}` : noImage
//     return (
//         <div
//             key={`div-0-detai-${index}`}
//             className={clsx("w-full flex flex-row shadow-2 hover:shadow-4 p-4 h-64", classes.shelf)}
//         >
//             <div className="w-2/3 flex flex-row">
//                 <div className="flex self-center w-1/5">
//                     <img src={img} alt="image_detail" className="object-cover h-60 self-center" />
//                 </div>
//                 <div className="w-full self-center space-y-16">
//                     <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min text-10' }} info={{ content: value?.uniqueid || '-', className: 'text-10' }} />
//                     <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min text-10' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 , className: 'text-10'}} />
//                 </div>
//                 <div className="w-full self-center space-y-16">
//                     <LabelInfo key={`name-${index}-labelInfo`} label={{ content: 'tên', className: 'min-w-min text-10' }} info={{ content: value?.name || '-', className: 'text-10' }} />
//                     <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min text-10' }} info={{ content: value?.quantity || '-', className: 'text-10' }} />
//                 </div>
//             </div>
//             <div className="flex flex-row space-x-8 w-1/3 self-center">
//                 <CmsTextField
//                     key={`quantity-${index}-labelInfo`}
//                     isNumber
//                     inputProps={{ inputProps: { min: 0, max: 1000 } }}
//                     size="small"
//                     value={quantity}
//                     onChange={(event) => setQuantity(event.target.value)}
//                     name="quantity"
//                     label="Số lượng"
//                 />
//                 <CmsButton
//                     key={`add-${index}-button`}
//                     size="small"
//                     label="thêm"
//                     onClick={() => HandleAddData({ quantity, index: 0, item: value })}
//                 />
//             </div>
//         </div>
//     )
// }
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
            <div className="grid grid-cols-3 gap-4 place-items-center">
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

const OpenDialog = ({ model, handleClose, orderType }) => {
    const [openDialog, setOpenDialog] = useState("");

    const HandleCloseShelfModal = (value) => {
        const data = returnModelPr(value);
        setOpenDialog("");
        handleClose(data);
    }

    return <>

        {
            openDialog === "open"
            &&
            <ShelfContent
                open={true}
                handleClose={HandleCloseShelfModal}
                data_shelf={JSON.stringify(model)}
                view={orderType === 2 ? null : 'order'}
            />
        }

        <CmsButton
            color="primary"
            startIcon="edit"
            size="small"
            label="Chỉnh sửa tủ"
            onClick={() => setOpenDialog("open")}
        />
    </>

}

function ShelfProductContent({ img, HandleAddData, data, handleCloseDialog, handleSelectItem, formik, hs }) {
    const classes = useStyles();
    const [breadValue, setBreadValue] = useState('danh_sach_tu');
    const [model, setModel] = useState([]);
    const [item, setItem] = useState(null);
    const values = formik?.values;
    const check = useRef(true);
    const { orderType } = values;

    useEffect(() => {
        return () => {
            setBreadValue('danh_sach_tu')
            setModel([])
        }
    }, [])

    useEffect(() => {
        setBreadValue('danh_sach_tu')
        setModel([])
    }, [img])

    useEffect(() => {
        if (check.current && values?.id) {
            const productorder = values?.productorder[0]
            if (productorder && values?.id) {
                setBreadValue('chi_tiet_san_pham')
                setModel(productorder.model)
                setItem(productorder)
                check.current = false
            }
        }
    }, [values])

    const handleClickBread = useCallback((name, item) => {
        switch (name) {
            case 'danh_sach_tu':
                setBreadValue(name)
                setModel([])
                break
            case 'chi_tiet_san_pham':
                setBreadValue(name)
                setModel(JSON.parse(item.model) ? JSON.parse(item.model) : [])
                setItem(item)
                handleSelectItem(item)
                break
            default:
                break
        }
    }, [handleSelectItem])

    const handleClose = (value) => {
        setModel(value);
        handleCloseDialog(value, item);
    }

    return (
        <div className="w-full space-y-8">
            {breadValue === 'danh_sach_tu' &&
                <div className="w-full flex flex-wrap -mx-4">
                    {data?.map((item, index) =>
                    (<div className="px-4">
                        <DetailShelfContent
                            img={img}
                            value={item}
                            index={index}
                            key={`DetailShelf-${index}`}
                            HandleAddData={HandleAddData}
                            handleClickBread={() => handleClickBread('chi_tiet_san_pham', item)}
                            classes={classes}
                        />
                    </div>))}
                </div>}
            {breadValue === 'chi_tiet_san_pham' &&
                <div className="w-full space-y-8">
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <CmsButton
                                color="default"
                                startIcon="arrow_back"
                                size="small"
                                label="Danh sách tủ"
                                onClick={() => handleClickBread('danh_sach_tu')}
                            />
                        </div>
                        {
                            !Boolean(values?.id)
                            &&
                            <OpenDialog
                                handleClose={handleClose}
                                orderType={orderType}
                                model={model} />
                        }

                    </div>
                    <div className="max-h-384 overflow-y-auto flex flex-wrap justify-between -mx-8">
                        {model?.map((item, index) =>
                        (
                            <div className="max-w-500 m-auto w-1/2 px-8 mb-8" key={index}>
                                <DetailModelContent
                                    key={`DetailModelContent_${index}`}
                                    value={item}
                                    classes={classes}
                                    HandleAddData={HandleAddData}
                                />
                            </div>
                        ))}
                    </div>
                </div>}
        </div>)
}
export default React.memo(ShelfProductContent)