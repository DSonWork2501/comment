import { CmsButton, CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
import React, { useState } from "react"
import noImage from '@widgets/images/noImage.jpg';
import { InitProductOrder } from "app/main/order/model/modal";
import EditDetailProductContent from "./detail/EditDetailProduct";
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "center", alignValue: "left", sortable: false, classHeader: 'w-56' }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-88', classValue: 'w-88' }),
]

const InfoProductDetail = React.memo(({ data, index }) => {
    const { uniqueid, capacity, imei_hs, image, name, price, quantity } = data

    return (
        <div key={`InfoProductDetail_${index}_div_0`} className="w-full flex flex-row space-x-16">
            <div>
                <img key={`InfoProductDetail_${index}_div_img`} src={image || noImage} alt="image_detail" className="h-92" />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'uniqueid' }} info={{ content: uniqueid || '-' }} />
                <LabelInfo label={{ content: 'Tên' }} info={{ content: name || '-' }} />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'Dung tích' }} info={{ content: capacity || '-' }} />
                <LabelInfo label={{ content: 'imei hs' }} info={{ content: imei_hs || '-' }} />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'Số lượng' }} info={{ content: quantity }} />
                <LabelInfo label={{ content: 'Giá' }} info={{ content: price || '0' }} />
            </div>
        </div>
    )
})

export default function DetailProductContent({ formik }) {
    const { productorder } = formik.values
    const [open, setOpen] = useState('')
    const [info, setInfo] = useState(null)
    const [editIndex, setEditIndex] = useState(null)

    const data = productorder?.map((x, index) => ({
        stt: index + 1,
        info: <InfoProductDetail data={x} index={index} />,
        thaotac: <div className="w-full flex flex-row">
            {/* <CmsIconButton /> */}
        </div>
    }))

    const HandleAddDetail = () => {
        setInfo(InitProductOrder())
        setOpen('edit')
        setEditIndex(null)
    }

    return (
        <div className="w-full space-y-16 p-20">
            <div className="flex flex-row-reverse">
                <CmsButton
                    startIcon="add"
                    label="Tạo mới"
                    tooltip={'Tạo mởi chi tiết đơn hàng'}
                    onClick={() => HandleAddDetail()}
                    className="bg-green-500 hover:bg-green-700"
                />
                {open && <EditDetailProductContent
                    open={open === 'edit'}
                    HandleClose={() => setOpen('')}
                    data={info}
                    formik={formik}
                    // prefix={`productorder[${editIndex}]`}
                    editIndex={editIndex}
                />}
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