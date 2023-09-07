import { CmsDialog, CmsLabel, CmsSelect, CmsTextField } from "@widgets/components"
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
import { useSelector } from "react-redux"
import { keyStore } from "app/main/product/common"
import { useMemo } from "react"
import { Button } from "@material-ui/core"


function ShelfContent({ data_shelf, open, handleClose, handleSave, index, modalIndex, view }) {
    const [prefix, setPrefix] = useState('[0]')
    const [stackIndex, setStackIndex] = useState(0)
    const [slotIndex, setSlotIndex] = useState('')
    const currentShelf = useSelector(store => store[keyStore]?.product?.entity?.data || store?.orders?.product?.searchDetailEntities)
    const listTemp = useMemo(() => {
        if (currentShelf && currentShelf?.detail?.length) {
            return currentShelf.detail.filter((val, i) => i !== modalIndex).map(val => ({ ...val, id: val.uniqueid }))
        }
        return []
    }, [currentShelf, modalIndex])
    const [model, setModel] = useState(null);
    const [listCheckTemp, setListCheckTemp] = useState({});
    const [custom, setCustom] = useState({
        first: 0,
        second: 0
    });

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
        const leg = formik_shelf.values[stack_index]?.slots?.length || 0;

        var array = [...get(formik_shelf.values[stack_index], 'slots').map(x => Object.assign({}, initDetailModelSlot(x))), initDetailModelSlot({ name: `Vị trí ${stack_index + 1}.` + (leg + 1) })]

        formik_shelf.setFieldValue(`[${stack_index}].slots`, array)
    }

    const HandleClickDetail = (event, stack_index, slot_index) => {
        var data = !isNaN(parseInt(slot_index)) ? `[${stack_index}].slots[${slot_index}]` : `[${stack_index}]`
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
                <>
                    <div className={'w-full flex flex-row space-x-8'}>
                        <CmsLabel content={'Hướng dẫn:'} className="text-green-500" />
                        <CmsLabel content={'Tích chọn thông tin tủ, thông tin chi tiết sẽ hiển thị tương ứng'} className="" />

                    </div>

                    <div className="flex flex-wrap -mx-8">
                        <div className="w-1/5 px-8">
                            {
                                Boolean(listTemp?.length)
                                &&
                                <CmsSelect
                                    data={listTemp}
                                    size="small"
                                    setOptionLabel={(option) => option.subname}
                                    value={model}
                                    onChange={(e) => {
                                        try {
                                            setModel(e.target.value)
                                            let temp = JSON.parse(listTemp.find(val => val.id === e.target.value).model);
                                            console.log(temp);
                                            temp = temp.map(val => ({
                                                ...val,
                                                slots: val.slots.map(va => ({ ...va, item: null }))
                                            }))
                                            formik_shelf.setValues(temp)
                                        } catch (error) {

                                        }
                                    }}
                                    label="Model có sẵn"
                                />
                            }
                        </div>
                        {
                            view !== 'order'
                            &&
                            <div className="w-4/5 px-8 border-l">
                                <div className="flex flex-wrap -mx-8">
                                    <div className="px-8 w-88">
                                        <CmsTextField
                                            label="Số ngăn"
                                            name="totalPredict"
                                            size="small"
                                            value={custom.first}
                                            onChange={(e) => setCustom(prev => ({ ...prev, first: e.target.value }))}
                                            isNumberFormat={true} />
                                    </div>
                                    <div className="px-8 w-88">
                                        <CmsTextField
                                            label="Slot/ngăn"
                                            name="totalPredict"
                                            size="small"
                                            value={custom.second}
                                            onChange={(e) => setCustom(prev => ({ ...prev, second: e.target.value }))}
                                            isNumberFormat={true} />
                                    </div>
                                    <div className="px-8">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                textTransform: 'inherit',
                                                fontWeight: 400
                                            }}
                                            disabled={custom.first === 0 || custom.second === 0}
                                            onClick={() => {
                                                let data = [];
                                                for (let index = 1; index <= custom.first; index++) {
                                                    data.push(initDetailModel({ name: `Ngăn ${index}` }))
                                                    for (let indexJ = 1; indexJ <= custom.second; indexJ++) {
                                                        data[index - 1].slots.push(initDetailModelSlot({ name: `Vị trí ${index}.${indexJ}` }))
                                                    }
                                                }
                                                formik_shelf.setValues(data)
                                            }}
                                        >
                                            Custom tủ
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </>

            }
            contentClass={'overflow-y-auto space-y-16'}
            // disabledSave={imageLoading || snapshot_loading}
            handleClose={handleCloseModal}
            handleSave={handleSave}
            isCloseDialogSubmit={false}
            open={open}
            size="xl"
        >
            <div className={clsx(prefix && 'flex flex-row', "w-full space-x-8 relative")}>
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
                            listCheckTemp={listCheckTemp}
                            setListCheckTemp={setListCheckTemp}
                            view={view}
                        />
                    </div>
                </FuseAnimate>
                {prefix && <FuseAnimate animation="transition.slideLeftIn" delay={50}>
                    <div className="w-2/3 sticky top-0 max-h-320">
                        <RightSideContent
                            formik={formik_shelf}
                            prefix={prefix}
                            listCheckTemp={listCheckTemp}
                            setListCheckTemp={setListCheckTemp}
                        />
                    </div>
                </FuseAnimate>}
            </div>
        </CmsDialog>
    )

}
export default ShelfContent