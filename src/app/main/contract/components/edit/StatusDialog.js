import { CmsDialog, CmsFormikSelect } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"
import * as Yup from 'yup'
import { useDispatch } from "react-redux"
import { statusContract } from "app/main/contract/store/contractSlice"
import { ContractStatus } from "../../model/status"

function StatusDialogComponent({ open, handleClose, item = null }) {
    const dispatch = useDispatch()

    const handleSaveData = async (value) => {
        const data = [{ ...value, type: parseInt(value.type), status: parseInt(value.status) }]
        dispatch(statusContract(data))
        handleClose && handleClose()
    }

    const formik = useFormik({
        initialValues: item,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        validationSchema: Yup.object({
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

                <CmsFormikSelect
                    data={Object.values(ContractStatus).map(x => ({ ...x, id: parseInt(x.id) }))}
                    formik={formik}
                    label="Trạng thái"
                    name="status"
                />
            </div>
        </CmsDialog>
    )
}
export default React.memo(StatusDialogComponent)