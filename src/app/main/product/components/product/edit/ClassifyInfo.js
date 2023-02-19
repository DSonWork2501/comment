import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsButton, CmsFormikDateTimePicker, CmsFormikTextField, CmsIconButton, CmsTableBasic } from "@widgets/components"
import { initColumn } from "@widgets/functions"
import { initDetail } from "app/main/product/model/product/model"
import React from "react"

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-32' }),
]

const InfoRowContent = ({ index, formik }) => (
    <td className="grid grid-cols-3 gap-10">
        <CmsFormikTextField key={`${index}_lotid`} size="small" name={`details[${index}].lotid`} formik={formik} label="lotid" />
        <CmsFormikTextField key={`${index}_colorid`} size="small" name={`details[${index}].colorid`} formik={formik} label="Color" />
        <CmsFormikTextField key={`${index}_sizeid`} size="small" name={`details[${index}].sizeid`} formik={formik} label="Size" />
        <CmsFormikTextField key={`${index}_volume`} size="small" name={`details[${index}].volume`} formik={formik} label="Volume" />
        <CmsFormikTextField key={`${index}_weight`} size="small" name={`details[${index}].weight`} formik={formik} label="Weight" />
        <CmsFormikTextField key={`${index}_height`} size="small" name={`details[${index}].height`} formik={formik} label="Height" />
        <CmsFormikTextField key={`${index}_model`} size="small" name={`details[${index}].model`} formik={formik} label="Model" />
        <CmsFormikDateTimePicker key={`${index}_maketime`} size="small" name={`details[${index}].maketime`} formik={formik} label="Maketime" />
        <CmsFormikDateTimePicker key={`${index}_expiretime`} size="small" name={`details[${index}].expiretime`} formik={formik} label="Expiretime" />
    </td>
)

function ClassifyInfo({ formik }) {
    const { details } = formik.values

    const HandleAddItem = () => {
        formik.setFieldValue(`details[${formik.values.details.length}]`, initDetail())
    }
    console.log('details', formik.values.details)
    const data = details.map((x, index)=> ({
        stt: index + 1,
        info: <InfoRowContent index={index} formik={formik}/>,
        thaotac: <CmsIconButton icon="close" className="text-red"/>
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