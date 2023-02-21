import { CmsButton, CmsTableBasic } from "@widgets/components"
import { LabelInfo } from "@widgets/components/common/LabelInfo"
import { initColumn } from "@widgets/functions"
import { initDetailModel } from "app/main/product/model/product/model"
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

    const [shelfIndex, setShelfIndex] = useState('')

    const formik_shelf = useFormik({
        initialValues: data_shelf || [],
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })
    const data = formik_shelf?.values.map((x, index) => (
        {
            stt: index + 1,
            info: shelfIndex !== index ? <InfoShelfContent formik={formik_shelf} /> : <EditShelfContent formik={formik_shelf} />
        }
    ))

    const HandleAddItem = () => {

    }

    return (
        <div className="w-full space-y-8">
            <CmsTableBasic
                data={data}
                columns={columns}
                isPagination={false}
            />
            <div className="w-full text-center m-0">
                <CmsButton label="Thêm mới" className="bg-yellow-700 hover:bg-yellow-900" onClick={() => HandleAddItem()} />
            </div>
        </div>
    )

}
export default ShelfContent