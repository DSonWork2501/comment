import { CmsDialog } from '@widgets/components';
import React from 'react';

function ShowListProduct({ handleClose, onSave, detail, open, title = 'Thêm thuộc tính', status }) {
    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                open={open}
                size='md'
            >
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='text-left py-4 border-b'>
                                Sản phẩm
                            </th>
                            <th className='text-right py-4 border-b w-92'>
                                Số lượng
                            </th>
                            <th className='text-right py-4 border-b w-92'>
                                Giá
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detail.map(val => {
                                return <tr>
                                    <td className='py-4 border-b'>
                                        {val.name}
                                    </td>
                                    <td className='py-4 border-b text-right'>
                                        {val.numberPR ? val.numberPR.toLocaleString('en-US') : '0'}
                                    </td>
                                    <td className='py-4 border-b text-right'>
                                        {val.temporaryprice ? val.temporaryprice.toLocaleString('en-US') : '0'}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className='py-4 border-b text-left' colSpan={2}>
                                Tạm tính
                            </th>
                            <th className='py-4 border-b text-right'>
                                {detail.reduce((sum, currentItem) => sum + currentItem.price, 0).toLocaleString('en-US')}
                            </th>
                        </tr>
                    </tfoot>
                </table>

            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(ShowListProduct);