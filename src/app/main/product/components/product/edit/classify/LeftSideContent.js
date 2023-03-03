import { CmsBoxLine, CmsButton, CmsIconButton, CmsLabel } from "@widgets/components"
import React from "react"

import { makeStyles } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
    chosen: {
        border: '3px solid #DC143C',
    }
}))

const CheckIndex = (type, stack, slot, stack_index, slot_index) => {
    if (type === 'stack') {
        return !isNaN(parseInt(stack)) && isNaN(parseInt(slot)) && stack === stack_index
    } else {
        return !isNaN(parseInt(stack)) && !isNaN(parseInt(slot)) && slot === slot_index && stack_index === stack
    }
}

function SlotContent({ data = [], HandleClickDetail, HandleDeleteSlot, stack_index, slotIndex, stackIndex, classes }) {
    return data?.map((item, index) =>
    (
        <div className="flex flex-row-reverse space-x-4">
            <CmsIconButton icon="close" onClick={() => HandleDeleteSlot(stack_index, index)} size="small" tooltip={'xóa slot'} className="text-red hover:shadow-2 border-red-500" key={`${index}_delete_slot`} />
            <div key={`${index}_div_slot_0`}
                onClick={() => HandleClickDetail(stack_index, index)}
                className={clsx("w-4/5 flex flex-row focus:shadow-outline cursor-pointer pl-6 justify-between space-x-4 bg-green-300 hover:bg-green-500 text-white rounded-12", CheckIndex('slot', stackIndex, slotIndex, stack_index, index) && classes.chosen)}>
                <div key={`${index}_div_1_slot`} className="flex items-center justify-items-start space-x-8">
                    <CmsLabel content={item.name || 'New slot'} key={`${index}_name`} />
                    <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_type`} />
                </div>
                <div key={`${index}_div_2`} className="flex items-center justify-items-center space-x-8">

                </div>
                <div key={`${index}_div_3`} className="flex items-center justify-end space-x-8">

                </div>
            </div>
        </div>

    ))
}

function LeftSideContent({ data = [], HandleAddStack, HandleAddSlot, HandleClickDetail, HandleDeleteStack, HandleDeleteSlot, stackIndex, slotIndex }) {
    const classes = useStyles()
    return (
        <CmsBoxLine label={'Thông tin tủ'}>
            <div className="w-full space-y-8" key={`div_0`}>
                {data?.map((item, index) => (
                    <div className="w-full space-y-4" key={`${index}_div_stack_1`}>
                        <div className="w-full flex flex-row space-x-4">
                            <div
                                key={`${index}_div_2`}
                                onClick={() => HandleClickDetail(index)}
                                className={clsx("focus:shadow-outline cursor-pointer w-full pl-6 flex flex-row justify-between space-x-4 bg-blue-300 hover:bg-blue-500 text-white rounded-12", CheckIndex('stack', stackIndex, slotIndex, index) && classes.chosen)}
                            >
                                <div key={`${index}_div_3`} className="flex items-center justify-items-start space-x-8">
                                    <CmsLabel content={item.name || 'New stack'} key={`${index}_stack_name`} />
                                    <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_type_name`} />
                                </div>
                                <div key={`${index}_div_4`} className="flex items-center justify-end space-x-8">
                                </div>
                            </div>
                            <CmsIconButton icon="close" onClick={() => HandleDeleteStack(index)} size="small" tooltip={'xóa stack'} className="text-red hover:shadow-2" key={`${index}_delete_stack`} />
                        </div>
                        <div key={`${index}_div_5`} className='w-full space-y-4'>
                            <SlotContent
                                data={item.slots || []}
                                key={`${index}_slots`}
                                stack_index={index}
                                stack_id={index}
                                HandleClickDetail={HandleClickDetail}
                                HandleDeleteSlot={HandleDeleteSlot}
                                stackIndex={stackIndex}
                                slotIndex={slotIndex}
                                classes={classes}
                            />
                            <div className="w-full text-center m-0">
                                <CmsButton size="small" startIcon="add" label="Slot" className="bg-yellow-700 hover:bg-yellow-900" onClick={() => HandleAddSlot(index)} />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="w-full text-center m-0">
                    <CmsButton size="small" startIcon="add" label="stack" className="bg-orange-700 hover:bg-orange-900" onClick={() => HandleAddStack()} />
                </div>
            </div>

        </CmsBoxLine>)
}
export default LeftSideContent