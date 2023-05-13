import { CmsDialog, CmsFormikAutocomplete, CmsFormikTextField } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"
import { ContractType } from 'app/main/contract/model/type'
import { keyStore } from "../../common"
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { editContract } from "app/main/signed-contract/store/signedContractSlice"

const initData = (id, entity) => {
    if (id) {
        return entity
    }
    else {
        return {
            "id": 0,
            "title": "",
            "content": "",
            "status": 1,
            "type": '1'
        }
    }
}

function EditDialogComponent({ open, handleClose, id = '0' }) {
    const dispatch = useDispatch()
    const entity = useSelector(store => store[keyStore].signedContract.entity)

    const handleSaveData = async(value) => {
       dispatch(editContract([value])) 
    }

    const formik = useFormik({
        initialValues: initData(entity, id),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        validationSchema: Yup.object({
            title: Yup.string().typeError("Tiêu đề không được bỏ trống !").required("Tiêu đề không được bỏ trống !"),
            content: Yup.string().typeError("Nội dung không được bỏ trống !").required("Nội dung không được bỏ trống !"),
        })
    })

    return (
        <CmsDialog
            open={open}
            title={id = '0' ? 'Thêm mới hợp đồng' : 'Cập nhật hợp đồng'}
            handleClose={handleClose}
            handleSave={formik.handleSubmit}
            isCloseDialogSubmit={false}

        >
            <div className="w-full space-y-8">
                <CmsFormikTextField formik={formik} label="Tiêu đề" name="title" />
                <CmsFormikTextField formik={formik} label="Nội dung" name="content" />
                <CmsFormikAutocomplete valueIsId data={Object.values(ContractType)} formik={formik} label="Loại" name="type" />
            </div>
        </CmsDialog>
    )
}
export default React.memo(EditDialogComponent)