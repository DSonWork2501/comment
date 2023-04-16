import { Typography, makeStyles, Link } from "@material-ui/core"
import { CmsBoxLine } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import React from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import noImage from '@widgets/images/noImage.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        cursor: 'pointer'
    },
}));

function DetailShelfContent({ value, img, index, handleClickBread, classes, HandleAddData }) {
    return (
        <CmsBoxLine label={''}>
            <div className="flex flex-row">
                <Typography className={classes.root}>
                    <Link onClick={handleClickBread} color="secondary">
                        Thông tin chi tiết tủ
                    </Link>
                </Typography>
                <Typography className={classes.root}>
                    <Link onClick={handleClickBread} color="secondary">
                        Thông tin chi tiết tủ
                    </Link>
                </Typography>
            </div>
            <div key={`div-0-detai-${index}`} className="w-full grid justify-items-center space-y-8">
                <img src={img || noImage} alt="image_detail" className="h-128" />
                <div className="grid justify-items-start">
                    <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} />
                    <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                    <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min' }} info={{ content: value?.color || '-' }} />
                    <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng tồn', className: 'min-w-min' }} info={{ content: value?.quantity || '-' }} />
                </div>
            </div>
        </CmsBoxLine>
    )
}

function ShelfProductContent({img, HandleAddData, data}) {
    const classes = useStyles()
    const [breadValue, setBreadValue] = useState('')
    const handleClickBread = useCallback((event) => {
        console.log(event)
        event.preventDefault()
        // setBreadValue()
    },[])
    console.log('data_shelf', data)
    const DetailShelf =({value, index,key, HandleAddData })=> React.memo(DetailShelfContent({img, value, index, key, HandleAddData, classes}))
    return (
        <div className="w-full">
            <CmsBoxLine label={'Thông tin tìm kiếm'}>
                <Typography className={classes.root}>
                    <Link onClick={handleClickBread} color="secondary">
                        Danh sách tủ
                    </Link>
                </Typography>
                <div className="w-full">
                    {data.map((item, index) =>
                    (<DetailShelf
                        img={img}
                        value={item}
                        index={index}
                        key={`DetailShelf-${index}`}
                        HandleAddData={HandleAddData}
                        handleClickBread={handleClickBread}
                    />))}
                </div>
            </CmsBoxLine>
        </div>)
}
export default React.memo(ShelfProductContent)