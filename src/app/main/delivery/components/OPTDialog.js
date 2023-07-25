import { Button, Dialog, DialogContent, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const useStyles = makeStyles((theme) => ({
    googleAuthInputContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
    },
    googleAuthInput: {
        border: 'none',
        outline: 'none',
        fontSize: 33,
        width: '100%',
        textAlign: 'center',
        boxShadow: '1px 1px 3px #b3adad',
        borderRadius: 4,
        ':placeholder': {
            fontSize: 50, // Adjust the placeholder font size here
        },
    },
}));

const OPTDialog = ({ open, className, handleSave, check }) => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [fill, setFill] = useState(true);

    return <Dialog className={className} open={open} fullWidth maxWidth="md">
        <DialogContent className='text-11' style={{ paddingTop: 8 }}>
            <div className='mb-8'>
                <b>
                    Nhập mã code F2A
                </b>
            </div>
            <div className={classes.googleAuthInputContainer}>
                <InputMask
                    mask="*** ***"
                    maskChar=""
                    value={value}
                    onFocus={() => {
                        if (fill) {
                            const clipboardData = window.navigator.clipboard.readText();
                            clipboardData.then((text) => {
                                if (text.length === 6) {
                                    setValue(text)
                                    setFill(false)
                                }
                            });
                        }
                    }}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    className={classes.googleAuthInput}
                    placeholder="000 000"
                />
            </div>
            <Button
                size='small'
                variant='contained'
                color='primary'
                className='mt-8'
                onClick={() => {
                    if (value?.length === 7)
                        handleSave(value.replace(' ', ''))
                }}
            >
                Xác nhận
            </Button>
        </DialogContent>
    </Dialog>
}

export default OPTDialog;