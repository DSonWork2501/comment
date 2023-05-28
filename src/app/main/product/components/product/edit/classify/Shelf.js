import { CmsDialog, CmsLabel } from "@widgets/components"
import { useFormik } from "formik"
import { CheckStringIsJson } from "@widgets/functions/Common"
import React from "react"
import LeftSideContent from "./LeftSideContent"
import RightSideContent from "./RightSideContent"
import { useState } from "react"
import { initDetailModel, initDetailModelSlot } from 'app/main/product/model/product/model'
import { get } from "lodash"
import clsx from "clsx"
import FuseAnimate from "@fuse/core/FuseAnimate"
import * as Yup from 'yup'


function ShelfContent({ data_shelf, open, handleClose, handleSave, index }) {
    const [prefix, setPrefix] = useState('[0]')
    const [stackIndex, setStackIndex] = useState(0)
    const [slotIndex, setSlotIndex] = useState('')

    const formik_shelf = useFormik({
        initialValues: data_shelf !== "[]" && CheckStringIsJson(data_shelf) ? JSON.parse(data_shelf) : [initDetailModel({ name: "Ngăn 1" })],
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        validationSchema: Yup.object({

        })
    })

    const { values } = formik_shelf;

    const data = formik_shelf.values?.map((x, index) => (
        {
            stt: index + 1,
            ...x
        }
    )) || []

    const HandleAddStack = () => {
        const leg = values?.length;
        var array = [...get(formik_shelf, 'values') || [], initDetailModel({ name: 'Ngăn ' + (leg + 1) })]
        formik_shelf.setValues(array)
    }

    const HandleAddSlot = (stack_index) => {
        console.log('formik_shelf.values[stack_index].slots', formik_shelf.values[stack_index].slots)
        var array = [...get(formik_shelf.values[stack_index], 'slots').map(x => Object.assign({}, x)), initDetailModelSlot()]
        formik_shelf.setFieldValue(`[${stack_index}].slots`, array)
    }

    const HandleClickDetail = (event, stack_index, slot_index) => {
        var data = !isNaN(parseInt(slot_index)) ? `[${stack_index}].slots[${slot_index}]` : `[${stack_index}]`
        console.log({ data, stack_index, slot_index });
        setPrefix(data)
        setStackIndex(stack_index)
        setSlotIndex(slot_index)
    }

    const HandleDeleteSlot = (stack_index, slot_index) => {
        var array = get(formik_shelf.values[stack_index], 'slots').filter((x, index) => slot_index !== index)
        formik_shelf.setFieldValue(`[${stack_index}].slots`, array)
    }

    const HandleDeleteStack = (stack_index) => {
        var array = formik_shelf.values.filter((x, index) => index !== stack_index)
        formik_shelf.setValues(array)
    }

    const handleCloseModal = () => {
        handleClose(formik_shelf.values)
    }

    return (
        <CmsDialog
            className="w-full h-full"
            title={"Thông tin tủ hàng"}
            text={
                <div className={'w-full flex flex-row space-x-8'}>
                    <CmsLabel content={'Hướng dẫn:'} className="text-green-500" />
                    <CmsLabel content={'Tích chọn thông tin tủ, thông tin chi tiết sẽ hiển thị tương ứng'} className="" />
                </div>
            }
            contentClass={'overflow-y-auto space-y-16'}
            // disabledSave={imageLoading || snapshot_loading}
            handleClose={handleCloseModal}
            handleSave={handleSave}
            isCloseDialogSubmit={false}
            open={open}
            size="xl"
        >
            <div className={clsx(prefix && 'flex flex-row', "w-full space-x-8")}>
                <FuseAnimate animation="transition.slideLeftIn" delay={50}>
                    <div className={prefix ? 'w-1/3' : 'w-full'}>
                        <LeftSideContent
                            data={data}
                            HandleAddStack={HandleAddStack}
                            HandleAddSlot={HandleAddSlot}
                            HandleClickDetail={HandleClickDetail}
                            HandleDeleteSlot={HandleDeleteSlot}
                            HandleDeleteStack={HandleDeleteStack}
                            stackIndex={stackIndex}
                            slotIndex={slotIndex}
                        />
                    </div>
                </FuseAnimate>
                {prefix && <FuseAnimate animation="transition.slideLeftIn" delay={50}>
                    <div className="w-2/3">
                        <RightSideContent
                            formik={formik_shelf}
                            prefix={prefix}
                        />
                    </div>
                </FuseAnimate>}
            </div>
        </CmsDialog>
    )

}
export default ShelfContent