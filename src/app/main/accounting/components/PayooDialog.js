import React from 'react';
import { CmsDialog } from '@widgets/components';


function PayooDialog({ handleClose, detail, open, title = 'Thêm thuộc tính' }) {
    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                isCloseDialogSubmit={false}
                open={open}
                size='lg'
                disableEscapeKeyDown
                disableBackdropClick
            >
                <iframe title='payoo' src={detail?.url} height={550} width="100%" />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(PayooDialog);