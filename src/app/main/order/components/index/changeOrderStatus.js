import { CmsDialog, CmsFormikSelect } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"
import { orderStatus } from "../../model/status"

function ChangeOderStatusContent({ entity, handleClose, open, handleSave }) {

    const handleSaveData = (value) => {
        handleSave && handleSave(value)
    }

    const formik = useFormik({
        initialValues: entity ? { "id": entity?.id, "status": entity?.status, "cusID": entity?.cusId } : { "id": 0, "status": null, "cusID": 0 },
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
    })
    // console.log('formik', formik.values)
    return (
        <CmsDialog
            title={`Chuyển trạng thái đơn hàng ID: ${entity?.id || ''}`}
            handleClose={handleClose}
            handleSave={formik.handleSubmit}
            open={open}
            disabledSave={formik?.initialValues?.status === formik?.values?.status}
        // size={'xl'}
        >
            <CmsFormikSelect formik={formik} name="status" label="Trạng thái" data={Object.values(orderStatus).map(x => ({ ...x, id: parseInt(x.id) }))} />
        </CmsDialog>
    )
}
export default ChangeOderStatusContent