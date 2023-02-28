import { CmsDialog } from "@widgets/components"
import { useFormik } from "formik"
import { CheckStringIsJson } from "@widgets/functions/Common"
import React from "react"
import LeftSideContent from "./LeftSideContent"
import RightSideContent from "./RightSideContent"
import { useState } from "react"
import { initDetailModel, initDetailModelSlot } from 'app/main/product/model/product/model'
import { get } from "lodash"

function ShelfContent({ data_shelf, open, handleClose, handleSave, index }) {

    const [prefix, setPrefix] = useState('')

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

    const HandleAddStack = () => {
        var array = [...get(formik_shelf, 'values'), initDetailModel()]
        formik_shelf.setValues(array)
    }
    const HandleAddSlot = (stack_index) => {
        console.log('formik_shelf.values[stack_index].slots', formik_shelf.values[stack_index].slots)
        var array = [...get(formik_shelf.values[stack_index], 'slots').map(x => Object.assign({}, x)), initDetailModelSlot()]
        formik_shelf.setFieldValue(`[${stack_index}].slots`, array)
    }

    const HandleClickDetail = (stack_index, slot_index) => {
        var data = !isNaN(parseInt(slot_index)) ? `[${stack_index}].slots[${slot_index}]` : `[${stack_index}]`
        setPrefix(data)
    }

    const HandleDeleteSlot = (stack_index, slot_index) => {
        var array = get(formik_shelf.values[stack_index], 'slots').filter((x, index)=> slot_index !== index)
        formik_shelf.setFieldValue(`[${stack_index}].slots`, array)
    }

    const HandleDeleteStack = (stack_index) => {
        var array = formik_shelf.values.filter((x, index)=> index !== stack_index)
        formik_shelf.setValues(array)
    }

    return (
        <CmsDialog
            title={"Thông tin tủ hàng"}
            contentClass={'overflow-y-auto'}
            // disabledSave={imageLoading || snapshot_loading}
            handleClose={handleClose}
            handleSave={handleSave}
            isCloseDialogSubmit={false}
            open={open}
            size="lg"
        >
            <div className="w-full flex flex-row space-x-4">
                <div className="w-1/3">
                    <LeftSideContent
                        data={data}
                        HandleAddStack={HandleAddStack}
                        HandleAddSlot={HandleAddSlot}
                        HandleClickDetail={HandleClickDetail}
                        HandleDeleteSlot={HandleDeleteSlot}
                        HandleDeleteStack={HandleDeleteStack}
                    />
                </div>
                <div className="w-2/3">
                    <RightSideContent
                        formik={formik_shelf}
                        prefix={prefix}

                    />
                </div>
            </div>
        </CmsDialog>
    )

}
export default ShelfContent