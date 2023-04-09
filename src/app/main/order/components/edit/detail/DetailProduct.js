import { CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
import { useFormik } from "formik"
import React from "react"
import noImage from '@widgets/images/noImage.jpg';
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "center", alignValue: "left", sortable: false, classHeader: 'w-56' }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-56' }),
]

const InfoProductDetail = React.memo(({ data, index }) => {
    const { uniqueid, capacity, imei_hs, image } = data

    return (
        <div key={`InfoProductDetail_${index}_div_0`} className="w-full flex flex-row">
            <div>
                <img key={`InfoProductDetail_${index}_div_img`} src={image ? `${baseurl}${image}`: noImage} alt="image_detail" className="h-128" />
            </div>
            <div className="w-full self-center">
                <LabelInfo label={{ content: 'Hình ảnh' }} info={{ content: image }} />
                <LabelInfo label={{ content: 'uniqueid' }} info={{ content: uniqueid }} />
                <LabelInfo label={{ content: 'Dung tích' }} info={{ content: capacity }} />
                <LabelInfo label={{ content: 'imei hs' }} info={{ content: imei_hs }} />
            </div>
        </div>
    )
})

export default function DetailProductContent({ index, formik }) {
    const { productorder } = formik.values
    const data = productorder?.map((x, index) => ({
        stt: index + 1,
        info: <InfoProductDetail data={x} index={index} />
    }))
    return (
        <div className="w-full flex flex-row space-x-8 p-20">
            <CmsTableBasic
                className="overflow-hidden"
                columns={columns}
                data={data}
                isPagination={false}
            />
        </div>
    )
}