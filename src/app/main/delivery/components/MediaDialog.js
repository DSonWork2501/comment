import React from 'react';
import { CmsButtonProgress } from '@widgets/components';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { baseurl } from '@connect/@connect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';


function MediaDialog({ entities, handleClose, open, classes }) {

    return (
        <React.Fragment>
            <Dialog className={classes} open={open} fullWidth maxWidth="lg" tabIndex={1000}>
                <DialogContent>
                    {
                        entities?.data?.length && entities?.data.map((val, index) => (
                            <>
                                <div>
                                    <div>
                                        <FontAwesomeIcon icon={faUser} className='mr-2' /> {val?.customername} - {val?.customermoblie}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className='mr-2' /> {val?.customeraddress}, {val?.customerward}, {val?.customerdistrict}, {val?.customercity}
                                    </div>
                                    {
                                        val?.shipping?.receiveimg
                                        &&
                                        <div>
                                            <div>
                                                Ảnh nhận hàng:
                                            </div>
                                            <div className='flex flex-wrap -mx-8'>
                                                {val.shipping?.receiveimg.split(',').map(val => (
                                                    val ? <div className='lg:w-1/3 md:w-1/2 px-8 pb-8'>
                                                        <img className='w-full' alt='val' src={`${baseurl}/common/files/${val}?application=3`} />
                                                    </div> : null
                                                ))}
                                            </div>
                                        </div>
                                    }

                                    {
                                        val?.shipping?.completeimg
                                        &&
                                        <div>
                                            <div>
                                                Ảnh giao hàng:
                                            </div>
                                            <div className='flex flex-wrap -mx-8'>
                                                {val.shipping.completeimg.split(',').map(val => (
                                                    val ? <div className='lg:w-1/3 md:w-1/2 px-8 pb-8'>
                                                        <img className='w-full' alt='val' src={`${baseurl}/common/files/${val}?application=3`} />
                                                    </div> : null
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>
                                {
                                    entities?.data?.length !== index + 1
                                    &&
                                    <hr className='my-8'>
                                    </hr>
                                }

                            </>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <div className='text-right'>
                        <CmsButtonProgress
                            label='Đóng'
                            onClick={handleClose}
                        >

                        </CmsButtonProgress>
                    </div>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default React.memo(MediaDialog);