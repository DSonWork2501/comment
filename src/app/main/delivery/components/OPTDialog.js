import { Dialog, DialogContent } from '@material-ui/core';
import React from 'react';

const OPTDialog = ({ open, className, saveFile, check }) => {

    return <Dialog className={className} open={open} fullWidth maxWidth="md">
        <DialogContent className='text-11' style={{ paddingTop: 8 }}>
            1234
        </DialogContent>
    </Dialog>
}

export default OPTDialog;