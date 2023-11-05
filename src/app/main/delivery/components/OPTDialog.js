import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogContent, makeStyles } from '@material-ui/core';
import { CmsButtonProgress } from '@widgets/components';
import { showMessage } from 'app/store/fuse/messageSlice';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch } from 'react-redux';

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

const OPTDialog = ({ open, className, handleSave, handleClose, check, isOPT }) => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [fill, setFill] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    return <Dialog className={className} open={open} fullWidth maxWidth="md">
        <DialogContent className='text-11' style={{ paddingTop: 8 }}>
            {
                isOPT
                    ? <>
                        <div className='mb-8 flex justify-between items-center'>
                            <b>
                                Nhập OTP từ điện thoại
                            </b>
                            <div onClick={handleClose}>
                                <FontAwesomeIcon icon={faCircleXmark} className='mr-2 text-18' />
                            </div>
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
                    </>
                    : <>
                        <div className='mb-8 flex justify-between items-center'>
                            <b>
                                Nhập mã code F2A
                            </b>
                            <div onClick={handleClose}>
                                <FontAwesomeIcon icon={faCircleXmark} className='mr-2 text-18' />
                            </div>
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
                    </>
            }
            <div className='flex justify-between pt-8'>
                {/* <Button
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
                </Button> */}
                <div>
                    {
                        isOPT
                        &&
                        <Button
                            size='small'
                            variant='contained'
                            color='secondary'
                            onClick={() => {

                            }}
                        >
                            Gửi lại
                        </Button>
                    }
                </div>

                <CmsButtonProgress
                    loading={loading}
                    type="submit"
                    label={'Xác nhận'}
                    onClick={() => {
                        if (value.replace(' ', '')?.length === 6) {
                            handleSave(value.replace(' ', ''), setLoading)
                        } else {
                            setTimeout(() => {
                                dispatch(showMessage({ variant: "error", message: 'Nhập OTP' }))
                            }, 0);
                        }
                    }}
                    //startIcon='save_alt'
                    color='primary'
                    //className={clsx(file ? 'bg-green-500' : '')}
                    size="small" />


            </div>
        </DialogContent>
    </Dialog>
}

export default OPTDialog;