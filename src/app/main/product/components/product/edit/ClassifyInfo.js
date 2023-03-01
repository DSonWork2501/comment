import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsButton, CmsFormikDateTimePicker, CmsFormikRadioGroup, CmsFormikTextField, CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { ConvertDateTime, initColumn } from "@widgets/functions"
import { ProductStatus } from "@widgets/metadatas/common/productStatus"
import { initDetail } from "app/main/product/model/product/model"
import { useFormik } from "formik"
import React from "react"
import { useState } from "react"
import ShelfContent from "./classify/Shelf"

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-32' }),
]

const EditRowContent = ({ index, formik, handleSaveData, handleCancelSetIndex }) => {
    const formik_item = useFormik({
        initialValues: formik.values.detail[index] || initDetail(),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        // onSubmit: handleSaveData
    })
    return (
        <div className="grid grid-cols-4 gap-10 w-11/12">
            <CmsFormikTextField key={`${index}_uniqueid`} size="small" name={`uniqueid`} formik={formik_item} label="uniqueid" />
            <CmsFormikTextField key={`${index}_lotid`} size="small" name={`lotid`} formik={formik_item} label="lotid" />
            <CmsFormikTextField key={`${index}_colorid`} size="small" name={`colorid`} formik={formik_item} label="Color" />
            <CmsFormikTextField key={`${index}_sizeid`} size="small" name={`sizeid`} formik={formik_item} label="Size" />
            <CmsFormikTextField key={`${index}_volume`} size="small" name={`volume`} formik={formik_item} label="Volume" />
            <CmsFormikTextField key={`${index}_weight`} size="small" name={`weight`} formik={formik_item} label="Weight" />
            <CmsFormikTextField key={`${index}_height`} size="small" name={`height`} formik={formik_item} label="Height" />
            <CmsFormikDateTimePicker key={`${index}_maketime`} size="small" name={`maketime`} formik={formik_item} label="Maketime" />
            <CmsFormikDateTimePicker key={`${index}_expiretime`} size="small" name={`expiretime`} formik={formik_item} label="Expiretime" />
            <CmsFormikTextField key={`${index}_code`} size="small" name={`Code`} formik={formik_item} label="Code" />
            <CmsFormikTextField key={`${index}_sizename`} size="small" name={`sizename`} formik={formik_item} label="sizename" />
            <CmsFormikTextField key={`${index}_price`} size="small" name={`price`} formik={formik_item} label="price" />
            <CmsFormikTextField key={`${index}_retailprice`} size="small" name={`retailprice`} formik={formik_item} label="retailprice" />
            <CmsFormikTextField key={`${index}_wholesaleprice`} size="small" name={`wholesaleprice`} formik={formik_item} label="wholesaleprice" />
            <div className="col-span-2 items-start">
                <CmsFormikRadioGroup fieldsetclass="m-0" className="border-0 m-0 p-0" vertical={false} key={`${index}_status`} size="small" name={`status`} formik={formik_item} label="" data={Object.values(ProductStatus)} />
            </div>
            <div className="col-span-4 flex flex-row space-x-12 items-start justify-end">
                <CmsButton size="small" label={"Lưu"} startIcon="save" className="text-white bg-blue-500 hover:bg-green-700" onClick={() => handleSaveData(formik_item.values, index)} />
                <CmsButton size="small" label={"Hủy"} startIcon="cancel" className="text-white bg-grey-500 hover:bg-grey-700" onClick={() => handleCancelSetIndex()} />
            </div>
        </div>

    )
}

const InfoContent = ({ index, formik }) => {
    const { lotid, colorid, sizeid, volume, weight, height, maketime, expiretime, status, uniqueid, code, sizename,
        price, retailprice, wholesaleprice } = formik.values.detail[index]
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-10" >
                <LabelInfo label={{ content: 'Unique ID' }} info={{ content: uniqueid }} />
                <LabelInfo label={{ content: 'Lot ID' }} info={{ content: lotid }} />
                <LabelInfo label={{ content: 'Color ID' }} info={{ content: colorid }} />
                <LabelInfo label={{ content: 'Size ID' }} info={{ content: sizeid }} />
                <LabelInfo label={{ content: 'Volume' }} info={{ content: volume }} />
                <LabelInfo label={{ content: 'Weight' }} info={{ content: weight }} />
                <LabelInfo label={{ content: 'Height' }} info={{ content: height }} />
                <LabelInfo label={{ content: 'Maketime' }} info={{ content: ConvertDateTime.DisplayDateTime(maketime) }} />
                <LabelInfo label={{ content: 'Expiretime' }} info={{ content: ConvertDateTime.DisplayDateTime(expiretime) }} />
                <LabelInfo label={{ content: 'Code' }} info={{ content: code }} />
                <LabelInfo label={{ content: 'SizeName' }} info={{ content: sizename }} />
                <LabelInfo label={{ content: 'Price' }} info={{ content: !isNaN(parseInt(price)) ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                <LabelInfo label={{ content: 'RetailPrice' }} info={{ content: !isNaN(parseInt(retailprice)) ? retailprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                <LabelInfo label={{ content: 'WholeSalePrice' }} info={{ content: !isNaN(parseInt(wholesaleprice)) ? wholesaleprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0 }} />
                <LabelInfo label={{ content: 'Trạng Thái' }} info={{ content: ProductStatus[status]?.name, className: ProductStatus[status]?.className }} />
            </div>
        </div>
    )

}

function ClassifyInfo({ formik }) {
    const { detail } = formik.values
    const [editIndex, setEditIndex] = useState('')
    const [modalIndex, setModalIndex] = useState('')

    const HandleAddItem = () => {
        formik.setFieldValue(`detail[${formik.values.detail.length}]`, initDetail())
    }

    const HandleDelete = (index_item) => {
        formik.setFieldValue(`detail`, formik.values.detail.filter((x, index) => index !== index_item))
    }

    const HandleSaveItem = (index_item, index) => {
        console.log('index_item', index_item)
        var item = Object.assign({}, index_item)
        var arr = [...formik.values.detail]
        arr[index] = item
        formik.setFieldValue(`detail`, arr)
        setEditIndex('')
    }

    const HandleCloseShelfModal = (value) => {
        formik.setFieldValue(`detail[${parseInt(modalIndex)}].model`, JSON.stringify(value))
        setModalIndex('')
    }

    console.log('detail', formik.values.detail)
    const model = formik?.values?.detail[modalIndex]?.model
    const data = detail?.map((x, index) => ({
        stt: index + 1,
        info: editIndex === index ? <EditRowContent index={index} formik={formik} handleSaveData={HandleSaveItem} handleCancelSetIndex={() => setEditIndex('')} /> : <InfoContent index={index} formik={formik} />,
        thaotac:
            <div className="flex flex-row space-x-8">
                {editIndex !== index &&
                    <CmsButton size="small" label={"Sửa"} className="text-white bg-green-500 hover:bg-green-700" onClick={() => { setEditIndex(index) }} />
                }
                {<CmsButton size="small" label={"Model"} className="text-white bg-blue-500 hover:bg-blue-700" onClick={() => { setModalIndex(index) }} />}
                {editIndex !== index &&
                    <CmsButton size="small" label={"Xóa"} className="text-white bg-red-500 hover:bg-red-700" onClick={() => HandleDelete(index)} />
                }
            </div>
    }))
    return (
        <FuseAnimateGroup className="flex flex-wrap p-20 overflow-hidden w-full h-full" enter={{ animation: 'transition.slideUpBigIn' }}>
            <div className="w-full space-y-8">
                <CmsTableBasic
                    columns={columns}
                    data={data}
                    isPagination={false}
                />
                <div className="w-full text-center m-0">
                    <CmsButton label="Thêm mới" className="bg-yellow-700 hover:bg-yellow-900" onClick={() => HandleAddItem()} />
                </div>
            </div>
            {!isNaN(parseInt(modalIndex)) &&
                <ShelfContent
                    open={!isNaN(parseInt(modalIndex))}
                    handleClose={HandleCloseShelfModal}
                    data_shelf={model}
                    index={editIndex}
                />}
        </FuseAnimateGroup>
    )
}
export default React.memo(ClassifyInfo)