import { CmsBoxLine, CmsButton, CmsIconButton, CmsLabel } from "@widgets/components"
import React from "react"

function SlotContent({ data = [], HandleClickDetail, HandleDeleteSlot, stack_index }) {
    return data?.map((item, index) =>
    (
        <div key={`${index}_div_0`} className="pl-6 w-full flex flex-row justify-between space-x-4 bg-green-300 hover:bg-green-500 text-white rounded-12">
            <div key={`${index}_div_1`} onClick={() => HandleClickDetail(item, index)} className="flex items-center justify-items-start space-x-8">
                <CmsLabel content={item.name} key={`${index}_name`} />
                <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_type`} />
            </div>
            <div key={`${index}_div_2`} className="flex items-center justify-items-center space-x-8">

            </div>
            <div key={`${index}_div_3`} className="flex items-center justify-end space-x-8">
                <CmsIconButton icon="close" onClick={() => HandleDeleteSlot(stack_index, index)} size="small" tooltip={'xóa slot'} className="text-red hover:shadow-2" key={`${index}_delete_slot`} />
            </div>
        </div>
    ))
}

function LeftSideContent({ data = [], HandleAddStack, HandleAddSlot, HandleClickDetail, HandleDeleteStack, HandleDeleteSlot }) {
    return (
        <CmsBoxLine label={'Thông tin tủ'}>
            <div className="w-full space-y-8" key={`div_0`}>
                {data?.map((item, index) => (
                    <div className="w-full space-y-4" key={`${index}_div_1`}>
                        <div key={`${index}_div_2`} className="pl-6 flex flex-row justify-between space-x-4 bg-blue-300 hover:bg-blue-500 text-white rounded-12">
                            <div key={`${index}_div_3`} onClick={() => HandleClickDetail(item, index)} className="flex items-center justify-items-start space-x-8">
                                <CmsLabel content={item.name || 'Click vào đây, chỉnh sửa bên thông tin chi tiết'} key={`${index}_stack_name`} />
                                <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_type_name`} />
                            </div>
                            <div key={`${index}_div_4`} className="flex items-center justify-end space-x-8">
                                <CmsIconButton icon="close" onClick={() => HandleDeleteStack(index)} size="small" tooltip={'xóa stack'} className="text-red hover:shadow-2" key={`${index}_delete_stack`} />
                            </div>
                        </div>
                        <div key={`${index}_div_5`} className='w-full space-y-4'>
                            <SlotContent
                                data={item.slots || []}
                                key={`${index}_slots`}
                                stack_index={index}
                                stack_id={index}
                                HandleClickDetail={HandleClickDetail}
                                HandleDeleteSlot={HandleDeleteSlot}
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