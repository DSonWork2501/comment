import { makeStyles } from "@material-ui/core"
import { CmsButton } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import noImage from '@widgets/images/noImage.jpg';
import clsx from "clsx"
import { Link } from 'react-router-dom'

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
            <div key={`div-0-detai-${index}`}
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

function DetailShelfProductContent({ value, img, index, handleClickBread, classes, HandleAddData }) {
    return (
        <div
            key={`div-0-detai-${index}`}
            className={clsx("w-full flex flex-row shadow-2 hover:shadow-4 py-4", classes.shelf)}
        >
            <img src={img || noImage} alt="image_detail" className="h-128" />
            <div className="w-full self-center space-y-16">
                <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} />
                <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min' }} info={{ content: value?.color || '-' }} />
                <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng', className: 'min-w-min' }} info={{ content: value?.quantity || '-' }} />
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

    console.log('data_shelf', data)
    return (
        <div className="w-full space-y-8">
            {breadValue === 'danh_sach_tu' &&
                <div className="w-full grid grid-cols-3 gap-4 place-items-start">
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
                                component={Link}
                                color="default"
                                startIcon="arrow_back"
                                label="Danh sách tủ"
                                onClick={() => handleClickBread('danh_sach_tu')}
                            />
                        </div>

                    </div>
                    {model?.map((item, index) =>
                    (<DetailShelfProductContent
                        img={img}
                        value={item}
                        index={index}
                        key={`DetailShelf-${index}`}
                        HandleAddData={HandleAddData}
                        handleClickBread={handleClickBread}
                        classes={classes}
                    />))}
                </div>}
        </div >)
}
export default React.memo(ShelfProductContent)