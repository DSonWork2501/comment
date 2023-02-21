import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsButton, CmsFormikDateTimePicker, CmsFormikRadioGroup, CmsFormikTextField, CmsIconButton, CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
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
            <CmsFormikTextField key={`${index}_lotid`} size="small" name={`lotid`} formik={formik_item} label="lotid" />
            <CmsFormikTextField key={`${index}_colorid`} size="small" name={`colorid`} formik={formik_item} label="Color" />
            <CmsFormikTextField key={`${index}_sizeid`} size="small" name={`sizeid`} formik={formik_item} label="Size" />
            <CmsFormikTextField key={`${index}_volume`} size="small" name={`volume`} formik={formik_item} label="Volume" />
            <CmsFormikTextField key={`${index}_weight`} size="small" name={`weight`} formik={formik_item} label="Weight" />
            <CmsFormikTextField key={`${index}_height`} size="small" name={`height`} formik={formik_item} label="Height" />
            <CmsFormikDateTimePicker key={`${index}_maketime`} size="small" name={`maketime`} formik={formik_item} label="Maketime" />
            <CmsFormikDateTimePicker key={`${index}_expiretime`} size="small" name={`expiretime`} formik={formik_item} label="Expiretime" />
            <div className="col-span-2 items-start">
                <CmsFormikRadioGroup fieldsetclass="m-0" className="border-0 m-0 p-0" vertical={false} key={`${index}_status`} size="small" name={`status`} formik={formik_item} label="" data={Object.values(ProductStatus)} />
            </div>
            <div className="col-span-4 items-start">
                <ShelfContent data_shelf={formik_item?.values?.Model} index={index}/>
            </div>
            <div className="flex flex-row space-x-12 items-start">
                <CmsButton size="small" label={"Lưu"} startIcon="save" className="text-white bg-blue-500 hover:bg-green-700" onClick={() => handleSaveData(formik_item.values, index)} />
                <CmsButton size="small" label={"Hủy"} startIcon="cancel" className="text-white bg-grey-500 hover:bg-grey-700" onClick={() => handleCancelSetIndex()} />
            </div>
        </div>

    )
}

const InfoContent = ({ index, formik }) => {
    const { lotid, colorid, sizeid, volume, weight, height, model, maketime, expiretime, status } = formik.values.detail[index]
    return (
        <div className="grid grid-cols-3 gap-10" >
            <LabelInfo label={{ content: 'Lot ID' }} info={{ content: lotid }} />
            <LabelInfo label={{ content: 'Color ID' }} info={{ content: colorid }} />
            <LabelInfo label={{ content: 'Size ID' }} info={{ content: sizeid }} />
            <LabelInfo label={{ content: 'Volume' }} info={{ content: volume }} />
            <LabelInfo label={{ content: 'Weight' }} info={{ content: weight }} />
            <LabelInfo label={{ content: 'Height' }} info={{ content: height }} />
            <LabelInfo label={{ content: 'Model' }} info={{ content: model }} />
            <LabelInfo label={{ content: 'Maketime' }} info={{ content: maketime }} />
            <LabelInfo label={{ content: 'Expiretime' }} info={{ content: expiretime }} />
            <LabelInfo label={{ content: 'Trạng Thái' }} info={{ content: ProductStatus[status]?.name, className: ProductStatus[status]?.className }} />
            
        </div>
    )

}

function ClassifyInfo({ formik }) {
    const { detail } = formik.values
    const [editIndex, setEditIndex] = useState('')

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

    console.log('detail', formik.values.detail)
    // console.log('editIndex', editIndex)
    const data = detail?.map((x, index) => ({
        stt: index + 1,
        info: editIndex === index ? <EditRowContent index={index} formik={formik} handleSaveData={HandleSaveItem} handleCancelSetIndex={() => setEditIndex('')} /> : <InfoContent index={index} formik={formik} />,
        thaotac:
            <div className="flex flex-row space-x-8">
                {editIndex !== index &&
                    <CmsIconButton size="small" tooltip={"Chỉnh sửa"} icon="edit" className="text-white bg-green-500 hover:bg-green-700" onClick={() => setEditIndex(index)} />
                }
                {editIndex !== index &&
                    <CmsIconButton size="small" tooltip={"Xóa"} icon="close" className="text-white bg-red-500 hover:bg-red-700" onClick={() => HandleDelete(index)} />
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
        </FuseAnimateGroup>
    )
}
export default React.memo(ClassifyInfo)