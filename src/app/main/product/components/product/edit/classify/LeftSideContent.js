import { CmsBoxLine, CmsButton, CmsLabel } from "@widgets/components"
import React from "react"

function SlotContent({ data = [] }) {

    return data?.map((item, index) =>
    (
        <div key={`${index}_div_0`} className="w-2/3 flex flex-row p-6 justify-start space-x-4 bg-green-300 hover:bg-green-500 text-white rounded-12">
            <div key={`${index}_div_1`} className="flex items-center justify-items-center space-x-8">
                <CmsLabel content={item.name} key={`${index}_name`} />
                <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_type`} />
            </div>
            <div key={`${index}_div_2`} className="flex items-center justify-end space-x-8">
            </div>
        </div>
    ))
}

function LeftSideContent({ data = [], HandleAddItem }) {
    return (
        <CmsBoxLine label={'Thông tin tủ'}>
            <div className="w-full space-y-8" key={`div_0`}>
                {data?.map((item, index) => (
                    <div className="w-full space-y-4" key={`${index}_div_1`}>
                        <div key={`${index}_div_2`} className="flex flex-row p-6 justify-between space-x-4 bg-blue-300 hover:bg-blue-500 text-white rounded-12">
                            <div key={`${index}_div_3`} className="flex items-center justify-items-start space-x-8">
                                <CmsLabel content={item.name} key={`${index}_stack_name`} />
                                <CmsLabel content={item.type ? `(${item.type})` : ''} key={`${index}_type_name`} />
                            </div>
                            <div key={`${index}_div_4`} className="flex items-center justify-end space-x-8">
                            </div>
                        </div>
                        <div key={`${index}_div_5`} className='w-full space-y-4'>
                            <SlotContent data={item.slots || []} key={`${index}_slots`} />
                        </div>
                    </div>
                ))}
                <div className="w-full text-center m-0">
                    <CmsButton label="Thêm mới" className="bg-yellow-700 hover:bg-yellow-900" onClick={() => HandleAddItem()} />
                </div>
            </div>

        </CmsBoxLine>)
}
export default LeftSideContent