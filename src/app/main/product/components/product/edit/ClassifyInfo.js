import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsAlert, CmsButton, CmsFormikAutocomplete, CmsFormikDateTimePicker, CmsFormikRadioGroup, CmsFormikTextField, CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { ConvertDateTime, initColumn } from "@widgets/functions"
import { ProductStatus } from "@widgets/metadatas/common/productStatus"
import { keyStore } from "app/main/product/common"
import { initDetail } from "app/main/product/model/product/model"
import { useFormik } from "formik"
import { get } from "lodash"
import React, { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import ShelfContent from "./classify/Shelf"
import { HomeSubscription } from "app/main/product/model/product/homeSubscription"
import * as Yup from 'yup'

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-32' }),
]

export const returnModelPr = (value) => {
    return value.map(x => ({
        ...x,
        capacity: parseInt(x.capacity),
        slots: x.slots.map(val => ({ ...val, capacity: parseInt(val?.capacity) || 0, heightlimit: parseInt(val?.heightlimit) || 0 }))
    }))
}

const EditRowContent = ({ index, formik, handleSaveData, handleCancelSetIndex, ishs }) => {
    const colorRes = useSelector(store => store[keyStore].product.color)
    const sizeRes = useSelector(store => store[keyStore].product.size)

    const handleSave = (values) => {
        handleSaveData(values, index)
    }

    const formik_item = useFormik({
        initialValues: formik.values.detail[index] || initDetail(),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
            capacity: Yup.number().when('$ishs', {
                is: (value) => {
                    return ishs === 1
                },
                then: Yup.number().nullable().required("Nhập sức chứa").min(1, "Nhập sức chứa").typeError("Nhập sức chứa")
            }),
            subname: Yup.string().nullable().required("Nhập tên sản phẩm"),
            price: Yup.number().when('$ishs', {
                is: (value) => {
                    return ishs === 2
                },
                then: Yup.number().nullable().required('Nhập giá').min(1,'Nhập giá'),
            }),

            retailprice: Yup.number().when('$ishs', {
                is: (value) => {
                    return ishs === 2
                },
                then: Yup.number().nullable().required('Nhập giá').min(1,'Nhập giá'),
            }),

            wholesaleprice: Yup.number().when('$ishs', {
                is: (value) => {
                    return ishs === 2
                },
                then: Yup.number().nullable().required('Nhập giá').min(1,'Nhập giá'),
            }),
        })
    })

    return (
        <div className="grid grid-cols-4 gap-10 w-11/12">
            <CmsFormikTextField key={`${index}_uniqueid`} size="small" name={`uniqueid`} formik={formik_item} label="uniqueid" />
            <CmsFormikTextField key={`${index}_subname`} size="small" name={`subname`} formik={formik_item} label="Tên Sub" />
            <CmsFormikTextField isNumberFormat key={`${index}_capacity`} isNumber size="small" name={`capacity`} formik={formik_item} label="Sức chứa" />
            {/* <CmsFormikTextField key={`${index}_nhanhid`} size="small" name={`nhanhid`} formik={formik_item} label="nhanhid" /> */}
            <CmsFormikAutocomplete
                valueIsId
                data={colorRes}
                key={`${index}_colorid`}
                size="small"
                name={`colorid`}
                formik={formik_item}
                label="màu"
                autocompleteProps={{
                    limitTags: 20,
                    getOptionLabel: (option) => option?.color || '',
                    renderOption: (option, { selected }) => option?.color
                }}
            />
            <CmsFormikAutocomplete
                valueIsId
                data={sizeRes}
                key={`${index}_sizeid`}
                size="small"
                name={`sizeid`}
                formik={formik_item}
                label="kích thước"
                autocompleteProps={{
                    limitTags: 20,
                    getOptionLabel: (option) => option?.sizename || '',
                    renderOption: (option, { selected }) => option?.sizename
                }}
            />
            <CmsFormikTextField key={`${index}_volume`} size="small" name={`volume`} formik={formik_item} label="thể tích" />
            <CmsFormikTextField key={`${index}_weight`} isNumber size="small" name={`weight`} formik={formik_item} label="cân nặng" />
            <CmsFormikTextField key={`${index}_height`} isNumber size="small" name={`height`} formik={formik_item} label="chiều cao" />
            <CmsFormikDateTimePicker key={`${index}_maketime`} size="small" name={`maketime`} formik={formik_item} label="ngày sản xuất" />
            <CmsFormikDateTimePicker key={`${index}_expiretime`} size="small" name={`expiretime`} formik={formik_item} label="ngày hết hạn" />
            {/* <CmsFormikTextField key={`${index}_code`} size="small" name={`Code`} formik={formik_item} label="mã Code" /> */}
            <CmsFormikTextField key={`${index}_sizename`} size="small" name={`sizename`} formik={formik_item} label="kích thước" />
            <br></br>
            <CmsFormikTextField isNumberFormat key={`${index}_price`} size="small" name={`price`} formik={formik_item} label="giá" />
            <CmsFormikTextField isNumberFormat key={`${index}_retailprice`} size="small" name={`retailprice`} formik={formik_item} label="giá bán lẻ" />
            <CmsFormikTextField isNumberFormat key={`${index}_wholesaleprice`} size="small" name={`wholesaleprice`} formik={formik_item} label="giá bán sỉ" />
            <CmsFormikTextField isNumberFormat key={`${index}_temporaryprice`} size="small" name={`temporaryprice`} formik={formik_item} label="giá tạm" />
            <div className="col-span-2 items-start">
                <CmsFormikRadioGroup fieldsetclass="m-0" className="border-0 m-0 p-0" vertical={false} key={`${index}_status`} size="small" name={`status`} formik={formik_item} label="" data={Object.values(ProductStatus)} />
            </div>
            <div className="col-span-4 flex flex-row space-x-12 items-start justify-end">
                <CmsButton type="button" size="small" label={"Lưu tạm"} startIcon="save" className="text-white bg-blue-500 hover:bg-green-700" onClick={() => formik_item.handleSubmit()} />
                <CmsButton size="small" label={"Hủy"} startIcon="cancel" className="text-white bg-grey-500 hover:bg-grey-700" onClick={() => {
                    handleCancelSetIndex();
                }} />
            </div>
        </div>

    )
}


const InfoContent = ({ index, formik }) => {
    const colorRes = useSelector(store => store[keyStore].product.color)
    const sizeRes = useSelector(store => store[keyStore].product.size)
    const { nhanhid, colorid, sizeid, volume, weight, height, maketime, expiretime, status, uniqueid, code,
        price, retailprice, wholesaleprice, capacity, subname ,temporaryprice} = formik.values.detail[index]
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-10" >
                <LabelInfo label={{ content: 'Unique ID' }} info={{ content: uniqueid }} />
                <LabelInfo label={{ content: 'Tên Sub' }} info={{ content: subname }} />
                <LabelInfo label={{ content: 'Sức chứa' }} info={{ content: capacity }} />
                <LabelInfo label={{ content: 'nhanhid' }} info={{ content: nhanhid }} />
                <LabelInfo label={{ content: 'màu' }} info={{ content: get(colorRes?.find(x => x.id === colorid), 'color') || '' }} />
                <LabelInfo label={{ content: 'Size ID' }} info={{ content: get(sizeRes?.find(x => x.id === sizeid), 'sizename') || '' }} />
                <LabelInfo label={{ content: 'thê tích' }} info={{ content: volume }} />
                <LabelInfo label={{ content: 'cân nặng' }} info={{ content: weight }} />
                <LabelInfo label={{ content: 'chiều cao' }} info={{ content: height }} />
                <LabelInfo label={{ content: 'ngày sản xuất' }} info={{ content: ConvertDateTime.DisplayDateTime(maketime) }} />
                <LabelInfo label={{ content: 'ngày hết hạn' }} info={{ content: ConvertDateTime.DisplayDateTime(expiretime) }} />
                <LabelInfo label={{ content: 'Code' }} info={{ content: code }} />
                {/* <LabelInfo label={{ content: 'kích thước' }} info={{ content: sizename }} /> */}
                <LabelInfo label={{ content: 'giá' }} info={{ content: !isNaN(parseInt(price)) ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                <LabelInfo label={{ content: 'giá bán lẻ' }} info={{ content: !isNaN(parseInt(retailprice)) ? retailprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                <LabelInfo label={{ content: 'giá bán sỉ' }} info={{ content: !isNaN(parseInt(wholesaleprice)) ? wholesaleprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                <LabelInfo label={{ content: 'giá tạm' }} info={{ content: !isNaN(parseInt(temporaryprice)) ? temporaryprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }} />
                <LabelInfo label={{ content: 'Trạng Thái' }} info={{ content: ProductStatus[status]?.name, className: ProductStatus[status]?.className }} />
            </div>
        </div>
    )

}

function ClassifyInfo({ formik }) {
    const { detail, sku } = formik.values
    const [editIndex, setEditIndex] = useState('')
    const [modalIndex, setModalIndex] = useState('')

    const { setSubmitting } = formik;
    useEffect(() => {
        setSubmitting(editIndex !== '')
    }, [setSubmitting, editIndex])


    const HandleAddItem = () => {
        if (!sku) {
            CmsAlert.fire({ heightAuto: false, text: 'Chưa nhập SKU !', icon: 'warning' })
        } 
        else {
            formik.setFieldValue(`detail[${formik.values.detail.length}]`,
                {
                    ...initDetail(),
                    uniqueid: `${sku}.${formik.values.detail.length + 1}`,
                    sku: sku
                })
            setEditIndex(formik.values.detail.length)
        }
    }

    const HandleDelete = (index_item) => {
        formik.setFieldValue(`detail`, formik.values.detail.filter((x, index) => index !== index_item))
    }

    const HandleSaveItem = (index_item, index) => {
        var items = {
            uniqueid: { value: index_item.uniqueid, label: 'Unique ID' },
            subname: { value: index_item.subname, label: 'Tên phụ' }
        }
        var check_items = Object.keys(items).filter(x => !items[x]?.value) || []
        if (check_items.length > 0) {
            CmsAlert.fire({
                heightAuto: false,
                icon: 'warning',
                text: `${Object.values(check_items.map(x => items[x].label)).join(', ')} Không được bỏ trống !`
            })
        } else {
            var item = Object.assign({}, index_item)
            var arr = [...formik.values.detail]
            arr[index] = item
            formik.setFieldValue(`detail`, arr)
            setEditIndex('')
        }

    }

    const HandleCloseShelfModal = (value) => {
        var model = returnModelPr(value);

        formik.setFieldValue(`detail[${parseInt(modalIndex)}].model`, JSON.stringify(model))
        setModalIndex('')
    }

    const model = formik?.values?.detail[modalIndex]?.model
    const ishs = parseInt(formik?.values?.ishs) && parseInt(formik?.values?.ishs)
    const data = detail?.map((x, index) => ({
        stt: index + 1,
        info: editIndex === index ? <EditRowContent index={index} formik={formik} ishs={ishs} handleSaveData={HandleSaveItem} handleCancelSetIndex={() => setEditIndex('')} /> : <InfoContent index={index} formik={formik} />,
        thaotac:
            <div className="flex flex-row space-x-8">
                {editIndex !== index &&
                    <CmsButton size="small" label={"Sửa"} className="text-white bg-green-500 hover:bg-green-700" onClick={() => {
                        setEditIndex(index);
                    }} />
                }
                {ishs === parseInt(HomeSubscription[1].id) && <CmsButton size="small" label={"Ngăn/tủ"} className="text-white bg-blue-500 hover:bg-blue-700" onClick={() => { setModalIndex(index) }} />}
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
                    <CmsButton label="Thêm mới" disabled={formik.isSubmitting} className="bg-yellow-700 hover:bg-yellow-900" onClick={() => {
                        HandleAddItem()
                    }} />
                </div>
            </div>
            {!isNaN(parseInt(modalIndex)) &&
                <ShelfContent
                    open={!isNaN(parseInt(modalIndex))}
                    handleClose={HandleCloseShelfModal}
                    data_shelf={model}
                    index={editIndex}
                    modalIndex={modalIndex}
                />}
        </FuseAnimateGroup>
    )
}
export default React.memo(ClassifyInfo)