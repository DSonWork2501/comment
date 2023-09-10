import React from "react"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { CmsBoxLine, CmsButton, CmsLabel } from "@widgets/components"
import { useState } from "react"
import noImage from '@widgets/images/noImage.jpg';
import FuseAnimate from "@fuse/core/FuseAnimate/FuseAnimate";
import { HomeSubscription } from "app/main/product/model/product/homeSubscription";
import ShelfProductContent from './ShelfProduct'
// export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function DetailProduct({ value, index, HandleAddData, img }) {
    const [quantity] = useState(1)
    return (
        <CmsBoxLine label={''}>
            <div key={`div-0-detai-${index}`} className="w-full grid justify-items-center space-y-8">
                <div className="h-64 text-center m-auto">
                    <img src={img || noImage} alt="image_detail" className="object-center w-full h-full" />
                </div>
                <div className="grid justify-items-start">
                    <CmsLabel content={value?.uniqueid || '-'} className="text-10" />
                    {/* <LabelInfo key={`uniqueid-${index}-labelInfo`} label={{ content: 'mã', className: 'min-w-min' }} info={{ content: value?.uniqueid || '-' }} /> */}
                    <LabelInfo key={`price-${index}-labelInfo`} label={{ content: 'giá', className: 'min-w-min text-10' }} info={{ content: !isNaN(parseInt(value?.price)) ? value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0, className: 'text-10' }} />
                    <LabelInfo key={`color-${index}-labelInfo`} label={{ content: 'màu', className: 'min-w-min text-10' }} info={{ content: value?.color || '-', className: 'text-10' }} />
                    <LabelInfo key={`quantity-${index}-labelInfo`} label={{ content: 'tồn', className: 'min-w-min text-10' }} info={{ content: value?.quantity || '-', className: 'text-10' }} />
                </div>

                <div className="flex flex-col space-y-8">
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

function LisProductContent({ data, HandleAddData, img, hs, handleCloseDialog, handleSelectItem, formik }) {
    console.log(img);
    return (
        <FuseAnimate animation="transition.expandIn" delay={500}>
            <div>
                {hs === parseInt(HomeSubscription[2].id) &&
                    <CmsBoxLine label={'Thông tin sản phẩm'}>
                        <div className="grid grid-cols-3 gap-4 place-items-start">
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
                            handleSelectItem={handleSelectItem}
                            handleCloseDialog={handleCloseDialog}
                            img={img}
                            HandleAddData={HandleAddData}
                            data={data}
                            formik={formik}
                        />
                    </div>
                }
            </div>
        </FuseAnimate>
    )
}

export default React.memo(LisProductContent)