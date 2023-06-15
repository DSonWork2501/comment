import { CmsBoxLine, CmsButton, CmsTableBasic, CmsTextField } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
import React, { } from "react"
import noImage from '@widgets/images/noImage.jpg';
import CreateDetailProduct from "./detail/CreateDetailProduct";
import { get } from "lodash";
import ContractInfo from "./basic/ContractInfo";
import { ProductType } from "app/main/product/model/product/homeSubscription";
import { OrderContext } from "../../context/OrderContext";
import { useState } from "react";
import LisProductContent from './detail/ListProduct'
import { keyStore } from "../../common";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "center", alignValue: "left", sortable: false, classHeader: 'w-12' }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "quantity", label: "Số lượng", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "totalprice", label: "Tổng Giá", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-88', classValue: 'w-88' }),
]

const InfoProductDetail = React.memo(({ data, index }) => {
    const { uniqueid, price, imei_hs, image, name } = data

    return (
        <div key={`InfoProductDetail_${index}_div_0`} className="w-full flex flex-row space-x-16">
            <div className="w-96">
                <img key={`InfoProductDetail_${index}_div_img`} src={image || noImage} alt="image_detail" />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'uniqueid', className: 'min-w-min text-10' }} info={{ content: uniqueid || '-', className: 'text-10' }} />
                <LabelInfo label={{ content: 'tên', className: 'min-w-min text-10' }} info={{ content: name || '-', className: 'text-10' }} />
            </div>
            <div className="w-full self-center space-y-16">
                <LabelInfo label={{ content: 'giá', className: 'min-w-min text-10' }} info={{ content: !isNaN(parseInt(price)) ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 || '-', className: 'text-10' }} />
                <LabelInfo label={{ content: 'imei hs', className: 'min-w-min text-10' }} info={{ content: imei_hs || '-', className: 'text-10' }} />
            </div>
        </div>
    )
})

export default function DetailProductContent({ formik }) {
    const { productorder, moneytotal } = formik.values
    const { hs } = React.useContext(OrderContext) || null;
    const [showTb, setShowTb] = useState(true);
    const detail_entities = useSelector(store => store[keyStore].product.searchDetailEntities)?.detail || [];
    const product_entities = useSelector(store => store[keyStore].product.searchDetailEntities);
    const [selected, setSelected] = useState(null);


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
    const isContract = parseInt(ProductType[3].type['1'].id) === hs;
    const handleSelectItem = (value) => {
        setSelected(value);
        if (value.ishs === 1)
            setShowTb(false);
    }

    useEffect(() => {
        setShowTb(false)
    }, [hs])

    const handleCloseDialog = (crModal, product) => {
        const data = {
            uniqueid: product.uniqueid,
            sku: product_entities.sku,
            name: product_entities.name,
            imei_hs: product_entities.ishs,
            model: JSON.stringify(crModal),
            quantity: 1,
            capacity: product.capacity,
            price: product.retailprice
        }

        formik.setFieldValue('productorder', [data])
    }

    const handleSelectItemInList = (value) => {
        const data = {
            uniqueid: value.uniqueid,
            sku: product_entities.sku,
            name: product_entities.name,
            imei_hs: product_entities.ishs,
            model: value.model,
            quantity: 1,
            capacity: value.capacity,
            price: value.retailprice
        }

        formik.setFieldValue('productorder', [data])
    }

    return (
        <div className="flex flex-row p-20 pb-40 space-x-8">
            <div className="w-4/12 space-y-16">
                <CmsBoxLine label={'Tìm kiếm sản phẩm'}>
                    <CreateDetailProduct formik={formik} handleSelectItem={handleSelectItem} />
                </CmsBoxLine>
            </div>
            <div className="w-8/12 space-y-8">
                {isContract && <CmsBoxLine label={"Thông tin hợp đồng"}>
                    <ContractInfo formik={formik} />
                </CmsBoxLine>}
                {
                    showTb
                    &&
                    <CmsBoxLine label={'Danh sách chi tiết sản phẩm'}>
                        <div className="space-y-8">
                            <CmsTableBasic
                                tableClassName="overflow-hidden"
                                // className=""
                                columns={columns}
                                data={data}
                                isPagination={false}
                                footerData={data?.length > 0 ? { quantity: 'Tổng tiền', totalprice: !isNaN(parseInt(moneytotal)) ? moneytotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 || '-' } : null}
                            />
                        </div>
                    </CmsBoxLine>
                }
                <LisProductContent
                    handleSelectItem={handleSelectItemInList}
                    handleCloseDialog={handleCloseDialog}
                    data={detail_entities}
                    img={selected?.image || ''}
                    hs={hs}
                />
            </div>
        </div>
    )
}