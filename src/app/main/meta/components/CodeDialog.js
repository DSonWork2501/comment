import React from 'react';
import { CmsDialog } from '@widgets/components';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

function CodeDialog({ handleClose, code, open, title = 'Thêm thuộc tính' }) {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                open={open}
            >
                <div>
                    <b className='mr-4'>
                        Tên:
                    </b>
                    {code?.name}
                </div>
                <div className='flex'>
                    <b className='mr-4'>
                        Key:
                    </b>
                    <div className='truncate hover:text-orange-500 cursor-pointer' onClick={() => {
                        navigator.clipboard.writeText(code.key).then(() => {
                            dispatch(showMessage({ variant: "success", message: 'Copy thành công' }))
                        })
                    }}>
                        {code?.key}
                    </div>
                </div>
                <div>
                    <img src={code?.urlImage} width={150} className='m-auto' alt='qrcode' />
                </div>
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(CodeDialog);