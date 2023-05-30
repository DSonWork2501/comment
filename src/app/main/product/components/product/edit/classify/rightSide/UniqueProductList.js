import { CmsButton, CmsLabel, CmsLoading } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { NumberWithCommas } from "@widgets/functions"
import { keyStore } from "app/main/product/common"
import { searchDetail } from "app/main/product/store/productSlice"
import React, { } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const DetailUniqueProductComponent = React.memo(({ item, index, skuItem, onClickChooseUniqueId }) => {
    const { img, name } = skuItem
    const price = NumberWithCommas(item?.price)
    const retailprice = NumberWithCommas(item?.retailprice)
    const wholesaleprice = NumberWithCommas(item?.wholesaleprice)
    return (<div
        className="flex flex-row p-10 shadow-2 hover:shadow-6 w-full cursor-pointer rounded-6 space-x-8 items-center"
        key={`${index}_div_DetailUniqueProductComponent`}
    >
        <div className="w-92">
            <img src={img} alt={`image_detail_${index}`} key={`${index}_img_DetailUniqueProductComponent`} />
        </div>
        <div className="w-full px-4 py-6 rounded-6 space-y-8">
            <CmsLabel content={name} className="text-16" key={`${index}_name_DetailUniqueProductComponent`}/>
            <div className="w-full flex flex-row space-x-8">
                <div className="w-full">
                    <LabelInfo label={{ content: 'IMEI' }} key={`${index}_unique_DetailUniqueProductComponent`} info={{ content: item?.uniqueid }} />
                    <LabelInfo label={{ content: 'giá' }} key={`${index}_price_DetailUniqueProductComponent`} info={{ content: price }} />
                    <LabelInfo label={{ content: 'màu' }} key={`${index}_color_DetailUniqueProductComponent`} info={{ content: item?.color }} />
                </div>
                <div className="w-full">
                    <LabelInfo label={{ content: 'giá bán lẻ' }} key={`${index}_retailprice_DetailUniqueProductComponent`} info={{ content: retailprice }} />
                    <LabelInfo label={{ content: 'kích cỡ' }} key={`${index}_sizename_DetailUniqueProductComponent`} info={{ content: item?.sizename }} />
                </div>
                <div className="w-full">
                    <LabelInfo label={{ content: 'tên phụ' }} key={`${index}_subname_DetailUniqueProductComponent`} info={{ content: item?.subname }} />
                    <LabelInfo label={{ content: 'giá bán sỉ' }} key={`${index}_wholesaleprice_DetailUniqueProductComponent`} info={{ content: wholesaleprice }} />
                </div>
            </div>
        </div>
        <div className="w-1/5 flex items-center">
            <CmsButton
                color="secondary"
                size="small"
                className="text-center"
                label="Chọn"
                onClick={() => onClickChooseUniqueId({ uniqueid: item?.uniqueid, skuItem, onClickChooseUniqueId, index })}
            />
        </div>
    </div>)
})

function UniqueProductListComponent({ sku, onClickView, skuItem, onClickChooseUniqueId }) {
    const key = window.location.pathname.split('/')[1] === 'order' ? 'orders' : keyStore;
    const dispatch = useDispatch()
    const entities = useSelector(store => store[key].product.searchDetailEntities)?.detail
    const loading = useSelector(store => store[key].product.searchDetailLoading)

    useEffect(() => {
        if (sku) {
            dispatch(searchDetail({ sku }))
        }
    }, [dispatch, sku])
    console.log('entities', entities)
    const data = entities || []
    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-row-reverse">
                <CmsButton startIcon="arrow_back" label="quay về danh sách sku" onClick={() => onClickView()} />
            </div>
            <CmsLoading loading={loading} />
            {data.length > 0 ?
                <div className="w-full">
                    {data.map((item, index) => (
                        <DetailUniqueProductComponent
                            item={item}
                            index={index}
                            key={`${index}_DetailUniqueProductComponent`}
                            skuItem={skuItem}
                            onClickChooseUniqueId={onClickChooseUniqueId}
                        />
                    ))}
                </div>
                : <CmsLabel className="text-center" content={'Không tìm thấy sản phẩm !'} />}
        </div>
    )
}
export default React.memo(UniqueProductListComponent)