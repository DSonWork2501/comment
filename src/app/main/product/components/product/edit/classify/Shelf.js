import { CmsBoxLine, CmsButton, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
import { CheckStringIsJson } from "@widgets/functions/Common"
// import { initDetailModel } from "app/main/product/model/product/model"
import { useFormik } from "formik"
import React from "react"
import { useState } from "react"
const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "info", label: "Thông tin", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "thaotac", label: "Thao tác", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-32' }),
]

const InfoShelfContent = ({ formik }) => {
    const { parentid, name, type, active, capacity, heightlimit } = formik.values
    return (
        <div className="grid grid-cols-3 gap-10" >
            <LabelInfo label={{ content: 'Lot ID' }} info={{ content: parentid }} />
            <LabelInfo label={{ content: 'Color ID' }} info={{ content: name }} />
            <LabelInfo label={{ content: 'Size ID' }} info={{ content: type }} />
            <LabelInfo label={{ content: 'Volume' }} info={{ content: active }} />
            <LabelInfo label={{ content: 'Weight' }} info={{ content: capacity }} />
            <LabelInfo label={{ content: 'Height' }} info={{ content: heightlimit }} />
        </div>
    )
}

const EditShelfContent = () => {

}

function ShelfContent({ data_shelf, index }) {

    const [shelfIndex] = useState('')

    const formik_shelf = useFormik({
        initialValues: CheckStringIsJson(data_shelf) ? JSON.parse(data_shelf) : [],
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })
    const data = formik_shelf.values?.map((x, index) => (
        {
            stt: index + 1,
            info: shelfIndex !== index ? <InfoShelfContent formik={formik_shelf} /> : <EditShelfContent formik={formik_shelf} />
        }
    )) || []

    const HandleAddItem = () => {

    }

    return (
        <CmsBoxLine label={'Model'} >
            <div className="flex flex-row p-6 justify-between space-x-4 bg-blue-500 text-white rounded-12">
                <div className="flex items-center justify-items-start space-x-8">
                    <CmsLabel content={'Ngăn trên'} />
                    <CmsLabel content={'(stack)'} />
                </div>
                <div className="flex items-center justify-end space-x-8">
                    {/* <CmsIconButton size="small" icon="edit" tooltip={'Cập nhật'} className={'bg-green-500 hover:bg-green-700 text-white'} /> */}
                </div>
        </div>
        </CmsBoxLine>
    )

}
export default ShelfContent