import { CmsLabel, CmsLoading } from "@widgets/components"
import React from "react"
import { useSelector } from "react-redux"
import noImage from '@widgets/images/noImage.jpg';
import { NumberWithCommas } from "@widgets/functions";
import { Tooltip } from "@material-ui/core";

export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`
//chi tiết sản phẩm
const DetailSkuProduct = React.memo(({ item, index, onClickSku }) => {
    const img = item.image ? `${baseurl}${item.image}` : noImage
    const price = item.price ?
        item.price.split('-').length === 2 ? item.price.split('-').map(x => (NumberWithCommas(x?.trim()))).join(' - ') : NumberWithCommas(item.price || 0)
        : 0
    return (
        <Tooltip title={
            price !== 0 ? <CmsLabel content={`Giá: ${price}`} key={`${index}_price_DetailSkuProduct`} className="text-12"/>
            : ''
        }>
            <div
                className="shadow-2 hover:shadow-6 w-96 cursor-pointer rounded-6"
                key={`${index}_div_DetailSkuProduct`}
                onClick={(event) => onClickSku(event, item)}
            >
                <img src={img} alt={`image_detail_${index}`} key={`${index}_img_DetailSkuProduct`} />
                <div className="flex flex-col px-4 py-6 bg-green-600 text-white rounded-6 justify-items-center">
                    <CmsLabel content={item.name} key={`${index}_name_DetailSkuProduct`} className="text-12 text-center" />
                </div>
            </div>
        </Tooltip>
    )
})
// danh sách sản phẩm
function ProductSearchListComponent({ keyStore, onClickSku }) {
    const product_entities = useSelector(store => store[keyStore].product.hsEntities)?.data
    const loading = useSelector(store => store[keyStore].product.hsLoading)

    const data = React.useMemo(() => product_entities || [], [product_entities])

    return (
        <div className="flex flex-col content-start shadow-4 rounded-6 h-320 overflow-y-auto ">
            <CmsLoading loading={loading} />
            {data.length === 0 ? <CmsLabel content={'Không tìm thấy sản phẩm !'} className="text-black" />
                :
                <div className="grid grid-cols-6 gap-4 p-10 ">
                    {data.map((item, index) => (
                        <DetailSkuProduct
                            item={item}
                            index={index}
                            key={`${index}_DetailSkuProduct`}
                            onClickSku={onClickSku}
                        />
                    ))}
                </div>}
        </div>
    )
}
export default React.memo(ProductSearchListComponent)