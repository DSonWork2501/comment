import { CmsBoxLine, CmsButton, CmsTableBasic, CmsTextField } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
import React, { } from "react"
import noImage from '@widgets/images/noImage.jpg';
import CreateDetailProduct from "./detail/CreateDetailProduct";
import { get } from "lodash";
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "center", alignValue: "left", sortable: false, classHeader: 'w-56' }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "quantity", label: "Số lượng", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "totalprice", label: "Tổng Giá", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-88', classValue: 'w-88' }),
]

const InfoProductDetail = React.memo(({ data, index }) => {
    const { uniqueid, price, imei_hs, image, name } = data

    return (
        <div key={`InfoProductDetail_${index}_div_0`} className="w-full flex flex-row space-x-16">
            <div>
                <img key={`InfoProductDetail_${index}_div_img`} src={image || noImage} alt="image_detail" className="h-80 min-w-52" />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'uniqueid', className: 'min-w-min' }} info={{ content: uniqueid || '-' }} />
                <LabelInfo label={{ content: 'tên', className: 'min-w-min' }} info={{ content: name || '-' }} />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'giá', className: 'min-w-min' }} info={{ content: !isNaN(parseInt(price)) ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 || '-' }} />
                <LabelInfo label={{ content: 'imei hs', className: 'min-w-min' }} info={{ content: imei_hs || '-' }} />
            </div>
        </div>
    )
})

export default function DetailProductContent({ formik }) {
    const { productorder, moneytotal } = formik.values
    // console.log('productorder', productorder)

    const HandleDelete = (index_item) => {
        formik.setFieldValue('productorder', productorder.filter((x, index) => index !== index_item))
    }

    const data = productorder?.map((x, index) => ({
        stt: index + 1,
        info: <InfoProductDetail data={x} index={index} />,
        totalprice: (parseInt(x?.quantity || 0) * parseInt(x?.price || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        quantity: <CmsTextField
            inputProps={{ inputProps: { min: 0, max: 1000 } }}
            isNumber
            key={`${index}_quantity_detail_edit`}
            name={`productorder[${index}].quantity`}
            value={get(formik.values, `productorder[${index}].quantity` || 0)}
            onChange={formik.handleChange}
            label=""
            variant="standard"
            className="w-44"
        />,
        thaotac: <div className="w-full flex flex-row">
            <CmsButton label="xóa" className="bg-red-500 hover:bg-red-700 hover:shadow-2" onClick={() => HandleDelete(index)} />
        </div>
    }))
    return (
        <div className="w-full space-y-16 p-20 pb-40">
            <CmsBoxLine label={"Tìm kiếm sản phẩm"}>
                <CreateDetailProduct
                    formik={formik}
                />
            </CmsBoxLine>
            <div className="flex flex-row-reverse">
            </div>
            <CmsBoxLine label={'Danh sách chi tiết sản phẩm'}>
                <CmsTableBasic
                    tableClassName="overflow-hidden"
                    // className=""
                    columns={columns}
                    data={data}
                    isPagination={false}
                    footerData={data?.length > 0 ? { quantity: 'Tổng tiền', totalprice: !isNaN(parseInt(moneytotal)) ? moneytotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 || '-' } : null}
                />
            </CmsBoxLine>
        </div>
    )
}