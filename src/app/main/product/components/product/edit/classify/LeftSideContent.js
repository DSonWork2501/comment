import { CmsBoxLine, CmsButton, CmsIconButton, CmsLabel } from "@widgets/components"
import React from "react"
import { Tooltip, makeStyles, styled } from "@material-ui/core"
import clsx from "clsx"

const BoxCustom = styled(CmsBoxLine)({
    "& .contain-stack": {
        border: "1px solid rgb(107 233 107)"
    },
    "& .contain-stack .head-stack": {
        "background": "rgb(107 233 107)",
        "margin": "0",
        "padding": "2px",
        "position": "relative",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "color": "white"
    },
    "& .contain-stack .close-stack": {
        "position": "absolute",
        "top": "-3px",
        "right": "-2px"
    },

    "& .item-card >div": {
        "box-shadow": " 1px 3px 7px #7e7e7e",
        "padding": "8px",
        "textAlign": "center",
        "position": "relative",
        "alignItems": "center",
        "display": "flex",
        "justifyContent": "center",
        "borderRadius": "5px",
        width: "100%",
        marginBottom: 8
    },
    "& .item-card .close-card": {
        "position": "absolute",
        "right": "2px",
        "top": "3px",
        opacity: 0,
        transition: "0.5"
    },
    "& .item-card:hover .close-card": {
        opacity: 1
    }
});

const useStyles = makeStyles(theme => ({
    chosen: {
        boxShadow: "3px 5px 10px #4e8fd3 !important",
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

    const handleChildClick = (e, stack_index, index) => {
        e.stopPropagation()
        HandleClickDetail(e, stack_index, index);
    }

    return data?.map((item, index) =>
    (
        <div className="flex flex-row-reverse  w-1/3 item-card px-4" key={`${index}_div_slot_5`}>
            <div key={`${index}_div_slot_0`}
                onClick={(e) => handleChildClick(e, stack_index, index)}
                className={clsx(CheckIndex('slot', stackIndex, slotIndex, stack_index, index) && classes.chosen)}
            //className={clsx("w-4/5 flex flex-row focus:shadow-outline cursor-pointer pl-6 justify-between  bg-green-300 hover:bg-green-500 text-white rounded-12", CheckIndex('slot', stackIndex, slotIndex, stack_index, index) && classes.chosen)}
            >
                <div className="close-card">
                    <CmsIconButton icon="close" onClick={() => HandleDeleteSlot(stack_index, index)} size="small" tooltip={'xóa slot'} className="text-red hover:shadow-2 border-red-500" key={`${index}_delete_slot`} />
                </div>
                {
                    !item?.item
                    &&
                    <div key={`${index}_div_1_slot`} className={clsx("flex items-center justify-items-start")}>
                        <CmsLabel content={item.name || 'New slot'} key={`${index}_name_slot`} />
                        {/* <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_type_slot`} /> */}
                        {/* <CmsLabel content={item.capacity ? `Dung tích: ${item.capacity}` : ''} key={`${index}_capacity_slot`} /> */}
                    </div>
                }

                {
                    item?.item
                    &&
                    <div key={`${index}_div_2_slot`}  >
                        <div className="h-84 text-center m-auto">
                            <img style={{ objectFit: 'contain', height: '100%', margin: 'auto' }} src={`${process.env.REACT_APP_BASE_URL}api/product/img/${item?.item?.img}`} alt="imageforitem" />
                        </div>
                        <div>
                            <Tooltip title={<>
                                <div>
                                    <b>
                                        Tên:
                                    </b>
                                    {item.item?.name}
                                </div>
                                <div>
                                    <b>
                                        Sku:
                                    </b>
                                    {item.item?.sku}
                                </div>
                            </>}>
                                <div className="w-full flex flex-row items-center">
                                    <CmsIconButton size="small" icon="info" className="" />
                                    <CmsLabel content={item.item?.name} className="text-10 w-88 truncate" />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                }

            </div>
        </div >

    ))
}

function LeftSideContent({ data = [], HandleAddStack, HandleAddSlot, HandleClickDetail, HandleDeleteStack, HandleDeleteSlot, stackIndex, slotIndex }) {
    const classes = useStyles()

    return (
        <BoxCustom label={'Thông tin tủ'}>
            <div className="w-full space-y-8" key={`div_stack_0`}>
                {data?.map((item, index) => (
                    <div key={`${index}_div_stack_1`} className={clsx("contain-stack w-full")} onClick={(e) => HandleClickDetail(e, index)}>
                        <div className="w-full flex flex-row space-x-4 head-stack" key={`${index}_div_stack_7`}>
                            <div
                                key={`${index}_div_2_stack`}
                            >
                                <div key={`${index}_div_3_stack`} className="flex items-center justify-center space-x-8">
                                    <CmsLabel content={item.name || 'Ngăn ' + (index + 1)} key={`${index}_stack_name`} />
                                    {/* <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_stack_type`} /> */}
                                </div>
                                {/* <div key={`${index}_div_4_stack`} className="flex items-center justify-end space-x-8">
                                </div> */}
                            </div>
                            <div className="close-stack">
                                <CmsIconButton icon="close" onClick={() => HandleDeleteStack(index)} size="small" tooltip={'xóa stack'} className="text-red " key={`${index}_delete_stack`} />
                            </div>
                        </div>
                        <div key={`${index}_div_5_stack`} className='w-full p-8 flex flex-wrap'>
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

        </BoxCustom>)
}
export default LeftSideContent