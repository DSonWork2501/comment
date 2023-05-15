import { CmsDialog, CmsFormikSelect, CmsFormikTextField } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"
import { ContractType } from 'app/main/contract/model/type'
import * as Yup from 'yup'
import { useDispatch } from "react-redux"
import { editContract } from "app/main/contract/store/contractSlice"

const initData = (item) => {
    if (item) {
        return item
    }
    else {
        return {
            "id": 0,
            "title": "",
            "content": "",
            "status": 1,
            "type": 1
        }
    }
}

function EditDialogComponent({ open, handleClose, item = null }) {
    const dispatch = useDispatch()

    const handleSaveData = async (value) => {
        const data = [{ ...value, type: parseInt(value.type), status: parseInt(value.status) }]
        dispatch(editContract(data))
        handleClose && handleClose()
    }

    const formik = useFormik({
        initialValues: initData(item),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        validationSchema: Yup.object({
            title: Yup.string().typeError("Tiêu đề không được bỏ trống !").required("Tiêu đề không được bỏ trống !"),
            content: Yup.string().typeError("Nội dung không được bỏ trống !").required("Nội dung không được bỏ trống !"),
        })
    })
    console.log('formik', formik)
    return (
        <CmsDialog
            open={open}
            title={item === null ? 'Thêm mới hợp đồng' : 'Cập nhật hợp đồng'}
            handleClose={handleClose}
            handleSave={formik.handleSubmit}
            isCloseDialogSubmit={false}

        >
            <div className="w-full space-y-8">
                <CmsFormikTextField formik={formik} label="Tiêu đề" name="title" />
                <CmsFormikTextField formik={formik} label="Nội dung" name="content" />
                <CmsFormikSelect
                    data={Object.values(ContractType)}
                    formik={formik}
                    label="Loại"
                    name="type"
                />
                {/* {item && <CmsFormikSelect
                    data={Object.values(ContractStatus).map(x=>({...x, id: parseInt(x.id)}))}
                    formik={formik}
                    label="Trạng thái"
                    name="status"
                />} */}
            </div>
        </CmsDialog>
    )
}
export default React.memo(EditDialogComponent)