import { LabelInfo } from "@widgets/components/common/LabelInfo"
import React from "react"
import noImage from '@widgets/images/noImage.jpg';
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const InfoProductDetail = React.memo(({ data, index }) => {
    const {uniqueid, sku, img, name} = data
    const image = img ? `${baseurl}${img}` : noImage
    return (
        <div key={`InfoProductDetail_${index}_div_0`} className="h-full w-full flex flex-row space-x-16">
            <div>
                <img key={`InfoProductDetail_${index}_div_img`} src={image} alt="image_detail" className="h-92 min-w-52" />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'tên', className: 'min-w-min' }} info={{ content: name || '-' }} />
                <LabelInfo label={{ content: 'uniqueid', className: 'min-w-min' }} info={{ content: uniqueid || '-' }} />
                <LabelInfo label={{ content: 'sku', className: 'min-w-min' }} info={{ content: sku || '-' }} />
            </div>
        </div>
    )
})
export default React.memo(InfoProductDetail) 