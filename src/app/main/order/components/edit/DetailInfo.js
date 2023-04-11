import { CmsBoxLine, CmsButton, CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
import React, {  } from "react"
import noImage from '@widgets/images/noImage.jpg';
import CreateDetailProduct from "./detail/CreateDetailProduct";
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "center", alignValue: "left", sortable: false, classHeader: 'w-56' }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "price", label: "Giá", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "quantity", label: "Số lượng", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-88', classValue: 'w-88' }),
]

const InfoProductDetail = React.memo(({ data, index }) => {
    const { uniqueid, capacity, imei_hs, image, name } = data

    return (
        <div key={`InfoProductDetail_${index}_div_0`} className="w-full flex flex-row space-x-16">
            <div>
                <img key={`InfoProductDetail_${index}_div_img`} src={image || noImage} alt="image_detail" className="h-92 min-w-44" />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'uniqueid' }} info={{ content: uniqueid || '-' }} />
                <LabelInfo label={{ content: 'Tên' }} info={{ content: name || '-' }} />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'Dung tích' }} info={{ content: capacity || '-' }} />
                <LabelInfo label={{ content: 'imei hs' }} info={{ content: imei_hs || '-' }} />
            </div>
        </div>
    )
})

export default function DetailProductContent({ formik, keyStore }) {
    const { productorder } = formik.values
    // console.log('productorder', productorder)
    const data = productorder?.map((x, index) => ({
        stt: index + 1,
        info: <InfoProductDetail data={x} index={index} />,
        price: !isNaN(parseInt(x?.price)) ? x?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
        quantity: x.quantity || 0,
        thaotac: <div className="w-full flex flex-row">
            <CmsButton label="xóa" className="bg-red-500 hover:bg-red-700 hover:shadow-2" onClick={()=>{}}/>
        </div>
    }))
    return (
        <div className="w-full space-y-16 p-20">
            <CmsBoxLine label={"Tìm kiếm sản phẩm"}>
                <CreateDetailProduct 
                    formik={formik}
                />
            </CmsBoxLine>
            <div className="flex flex-row-reverse">
            </div>
            <CmsTableBasic
                tableClassName="overflow-hidden"
                // className=""
                columns={columns}
                data={data}
                isPagination={false}
            />
        </div>
    )
}