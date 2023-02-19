import { CmsFormikTextField, CmsIconButton, CmsTableBasic, CmsTextField } from "@widgets/components"
import React, {  } from "react"
import noImage from '@widgets/images/noImage.jpg';
import { initColumn } from "@widgets/functions";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";

const columns = [
    new initColumn({ field: "stt", label: "STT", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "link", label: "Link Hình", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "image", label: "Hinh Ảnh", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-32'  }),
    new initColumn({ field: "thaotac", label: "Xóa", alignHeader: "left", alignValue: "left", sortable: false, classHeader: 'w-32' }),
]

function MutipleImagePathLink({ images, setImage }) {
    const [array, setArray] = useState([])

    useEffect(() => {
        setArray(images?.map(x => ({ link: x })) || [])
    }, [images])

    const formik = useFormik({
        initialValues: array,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        // onSubmit: handleSaveData
    })

    const handleAddImage = (event) => {
        const value = event.target.value
        formik.setValues([...formik.values, {link: value}])
    }
    const handleDelete = (index_item) => {
        formik.setValues([...formik.values.filter((x, index)=>index !== index_item)])
    }

    console.log('formik', formik.values)

    const data = [...formik.values?.map((x, index) => ({
        stt: index + 1,
        link: <CmsFormikTextField size="small" key={`path_key_${index}`} label="Image" formik={formik} name={`[${index}].link`} />,
        image: <img key={`image_key_${index}`} alt={`image_alt_${index}`} src={formik.values[index].link || noImage} className="max-h-32 max-w-32" />,
        thaotac: <CmsIconButton tooltip={"Xóa"} icon="close" onClick={() => handleDelete(index)} className="text-red" />
    })), {
        link: <CmsTextField onChange={handleAddImage} size="small" key={`path_key_add`} label="Image" value={""} />,
       
    }] || []

    return (
        <div>
            <CmsTableBasic
                columns={columns}
                data={data}
                isPagination={false}
            />
        </div>
    )
}
export default MutipleImagePathLink