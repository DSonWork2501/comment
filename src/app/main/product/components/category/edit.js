import { keyStore } from "../../common"
import React from "react"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import * as Yup from 'yup'
const { CmsDialog, CmsFormikTextField, CmsFormikSelect } = require("@widgets/components")

const initData = (id, data) => {
    if (id) {
        return {
            "id": data?.id || 0,
            "name": data?.name || "",
            "type": data?.type || 0,
            "status": data?.status || 0
        }
    } else {
        return {
            "id": 0,
            "name": "",
            "type": 0,
            "status": 0
        }
    }
}

function EditCateContent({ id, open, handleClose, handleSave }) {
    const entity = useSelector(store => store[keyStore].category.entity)

    const handleSaveData = (values) => {
        handleSave && handleSave(values)
        handleClose && handleClose()
    }

    const formik = useFormik({
        initialValues: initData(id, entity),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        validationSchema: Yup.object({
            name: Yup.string().required("Chưa nhập tên thể loại"),
        })
    })

    return (
        <CmsDialog
            title={`${formik?.values?.id === 0 ? 'Thêm mới thể loại' : 'Cập nhật thể loại'}`}
            open={open}
            handleClose={handleClose}
            handleSave={formik.handleSubmit}
            isCloseDialogSubmit={false}
        >
            <div className="w-full space-y-16">
                <CmsFormikTextField name="name" formik={formik} label="Tên thể loại" />
                <CmsFormikSelect name="type" formik={formik} label="Loại" data={[{ id: '0', name: 'thường' }, { id: '1', name: 'Home subcription' }]} />
            </div>
        </CmsDialog>

    )
}

export default EditCateContent