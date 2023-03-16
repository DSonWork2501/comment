import { CmsDialog } from "@widgets/components"
import React from "react"

function ChangeOderStatusContent({ entity, handleClose, open, handleSave }) {

    return (
        <CmsDialog
            title={`Chuyển trạng thái đơn hàng ID: ${entity?.id}`}
            handleClose={handleClose}
            handleSave={handleSave}
            open={open}
        // size={'xl'}
        >

        </CmsDialog>
    )
}
export default ChangeOderStatusContent