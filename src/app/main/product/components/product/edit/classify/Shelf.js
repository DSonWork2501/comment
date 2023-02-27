import { CmsDialog } from "@widgets/components"
import { useFormik } from "formik"
import { CheckStringIsJson } from "@widgets/functions/Common"
import React from "react"
import LeftSideContent from "./LeftSideContent"
import RightSideContent from "./RightSideContent"
import { useState } from "react"

function ShelfContent({ data_shelf, open, handleClose, handleSave, index }) {

    const [item, setItem] = useState()

    const formik_shelf = useFormik({
        initialValues: CheckStringIsJson(data_shelf) ? JSON.parse(data_shelf) : [],
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
    })
    const data = formik_shelf.values?.map((x, index) => (
        {
            stt: index + 1,
            ...x
        }
    )) || []

    console.log('data_shelf', data_shelf)

    // const HandleAddItem = () => {

    // }

    return (
        <CmsDialog
            title={"Thông tin tủ hàng"}
            contentClass={'overflow-hidden'}
            // disabledSave={imageLoading || snapshot_loading}
            handleClose={handleClose}
            handleSave={handleSave}
            isCloseDialogSubmit={false}
            open={open}
            size="lg"
        >
            <div className="w-full flex flex-row space-x-4">
                <div className="w-1/3">
                    <LeftSideContent data={data} />
                </div>
                <div className="w-2/3">
                    <RightSideContent item={item} setItem={setItem} />
                </div>
            </div>
        </CmsDialog>
    )

}
export default ShelfContent