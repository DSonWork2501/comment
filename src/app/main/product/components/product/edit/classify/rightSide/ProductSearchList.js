import { CmsIconButton, CmsLabel, CmsLoading, CmsTableBasic } from "@widgets/components"
import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import noImage from '@widgets/images/noImage.jpg';
import { initColumn } from "@widgets/functions";

export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`
//chi tiết sản phẩm
// const DetailSkuProduct = React.memo(({ item, index, onClickSku }) => {
//     const img = item.image ? `${baseurl}${item.image}` : noImage
//     const price = item.price ?
//         item.price.split('-').length === 2 ? item.price.split('-').map(x => (NumberWithCommas(x?.trim()))).join(' - ') : NumberWithCommas(item.price || 0)
//         : 0
//     return (
//         <Tooltip title={
//             price !== 0 ? <CmsLabel content={`Giá: ${price}`} key={`${index}_price_DetailSkuProduct`} className="text-12" />
//                 : ''
//         }>
//             <div
//                 className="shadow-2 hover:shadow-6 w-96 cursor-pointer rounded-6"
//                 key={`${index}_div_DetailSkuProduct`}
//                 onClick={(event) => onClickSku(event, item)}
//             >
//                 <img src={img} alt={`image_detail_${index}`} key={`${index}_img_DetailSkuProduct`} />
//                 <div className="flex flex-col px-4 py-6 bg-green-600 text-white rounded-6 justify-items-center">
//                     <CmsLabel content={item.name} key={`${index}_name_DetailSkuProduct`} className="text-12 text-center" />
//                 </div>
//             </div>
//         </Tooltip>
//     )
// })

const turnStorePath = (keyStore, store) => {
    if (keyStore === "cusShelf")
        return store[keyStore].cusShelf;
    return store[keyStore].product;
}

// danh sách sản phẩm
function ProductSearchListComponent({ keyStore, onClickSku, setSearch }) {
    const key = window.location.pathname.split('/')[1] === 'order' ? 'orders' : keyStore;

    const loading = useSelector(store => turnStorePath(key, store).hsLoading);
    const entities = useSelector(store => turnStorePath(key, store).productPopup);

    const columns = [
        new initColumn({ field: "sku", label: "SKU", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "name", label: "Tên S/P", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "shortname", label: "Tên Ngắn", alignHeader: "left", alignValue: "left", sortable: false }),
        new initColumn({ field: "image", label: "Hình Ảnh", alignHeader: "center", alignValue: "center", sortable: false }),
        new initColumn({ field: "price", label: "Giá", alignHeader: "center", alignValue: "center", sortable: false }),
    ]

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        name: item.name,
        shortname: item.shortname,
        image: (<img style={{ height: 50, margin: '0 auto' }} src={`${item.image ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item?.image}` : noImage}`} alt={item?.img} />),
        sku: item.sku,
        price: item.price,
        action: (
            <div className="flex flex-row">
                <CmsIconButton
                    tooltip={<CmsLabel content={"Chọn"} className="text-10" />}
                    icon="done"
                    className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white"
                    onClick={(event) => onClickSku(event, item)}
                />
            </div>
        ) || []
    })), [entities, onClickSku])

    return (
        <div className="flex flex-col content-start shadow-4 rounded-6 h-320 overflow-y-auto ">
            <CmsLoading loading={loading} />

            <CmsTableBasic
                className="w-full h-full"
                isServerSide={true}
                data={data}
                columns={columns}
                loading={loading}
                setSearch={setSearch}
                pagination={entities?.pagination}
            />

            {/* {data.length === 0 ? <CmsLabel content={'Không tìm thấy sản phẩm !'} className="text-black" />
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
                </div>} */}
        </div>
    )
}
export default React.memo(ProductSearchListComponent)