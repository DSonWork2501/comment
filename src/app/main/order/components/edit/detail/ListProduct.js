import React from "react"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { CmsBoxLine, CmsButton, CmsTextField } from "@widgets/components"
import { useState } from "react"
import noImage from '@widgets/images/noImage.jpg';
import FuseAnimate from "@fuse/core/FuseAnimate/FuseAnimate";
import { HomeSubscription } from "app/main/product/model/product/homeSubscription";
import ShelfProductContent from './ShelfProduct'
// export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function DetailProduct({ value, index, HandleAddData, img }) {
    const [quantity, setQuantity] = useState(0)
    return (
        <CmsBoxLine label={''}>
            <div key={`div-0-detai-${index}`} className="w-full grid justify-items-center space-y-8">
                <img src={img || noImage} alt="image_detail" className="h-128" />
                <div className="grid justify-items-start">
                    <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} />
                    <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                    <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min' }} info={{ content: value?.color || '-' }} />
                    <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'S/lượng tồn', className: 'min-w-min' }} info={{ content: value?.quantity || '-' }} />
                </div>
                <div className="flex flex-row space-x-8">
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
        </CmsBoxLine>
    )
}

function LisProductContent({ data, HandleAddData, img, hs }) {

    console.log('data', data)
    return (
        <FuseAnimate animation="transition.expandIn" delay={500}>
            <>
                {hs === parseInt(HomeSubscription[2].id) &&
                    <CmsBoxLine label={'Thông tin sản phẩm'}>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-start">
                            {data.map((item, index) =>
                            (<DetailProduct
                                img={img}
                                value={item}
                                index={index}
                                key={`DetailProduct-${index}`}
                                HandleAddData={HandleAddData}
                            />))}
                        </div>
                    </CmsBoxLine>}
                {hs === parseInt(HomeSubscription[1].id) &&
                    <div className="w-full">
                        <ShelfProductContent
                            img={img}
                            HandleAddData={HandleAddData}
                            data={data}
                        />
                    </div>
                }
            </>
        </FuseAnimate>
    )
}

export default React.memo(LisProductContent)