import { CmsDialog, CmsTableBasic } from "@widgets/components"
import { initColumn, NumberWithCommas } from "@widgets/functions"
import React from "react"
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`
const columns = [
    new initColumn({ field: "uniqueid", label: "uniqueid", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "sku", label: "SKU", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "name", label: "Tên Sản Phẩm", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "image", label: "Hình ảnh", alignHeader: "center", alignValue: "center", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "quantity", label: "Số lượng", classHeader: "w-128", sortable: false }),
    new initColumn({ field: "price", label: "Giá tiền", classHeader: "w-128", sortable: false }),
]
function OrderDetailContent({ entity, handleClose, open }) {

    const data = entity?.productorders?.map(x => ({
        id: x.id,
        uniqueid: x.uniqueid,
        sku: x.sku,
        name: x.name,
        quantity: x.quantity,
        price: NumberWithCommas(x.price),
        image: <img className="max-h-52 max-w-52 ml-auto mr-auto" src={`${baseurl}${x.image}`} alt={`${x.sku}_image`} />
    })) || []

    const totalPrice = NumberWithCommas(entity?.moneytotal) || 0

    return (
        <CmsDialog
            title="Thông tin đơn hàng"
            handleClose={handleClose}
            open={open}
            size={'xl'}
        >
            <CmsTableBasic
                className="w-full h-full"
                isServerSide={false}
                data={data}
                columns={columns}
                isPagination={false}
                footerData={{quantity: 'Tổng tiền', price: totalPrice}}
            />
        </CmsDialog>
    )
}
export default OrderDetailContent