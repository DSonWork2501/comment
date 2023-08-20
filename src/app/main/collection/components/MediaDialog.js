import React from 'react';
import { CmsButtonProgress, CmsTextField } from '@widgets/components';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { baseurl } from '@connect/@connect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useMemo } from 'react';

function customLike(searchText, targetText) {
    // Escape special characters in the search text
    const escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regular expression with the escaped search text and the 'i' flag for case-insensitive matching
    const regex = new RegExp(escapedSearchText, 'i');

    // Test if the target text matches the regular expression
    return regex.test(targetText);
}

function MediaDialog({ entities, handleClose, open, classes }) {
    const [value, setValue] = useState('');
    const reEntities = useMemo(() => {
        if (entities?.data?.length) {
            return entities.data.filter(val => {
                return value ? (val.id === parseInt(value) || customLike(value, val.customermoblie)) : true
            })
        }
    }, [value, entities])

    return (
        <React.Fragment>
            <Dialog className={classes} open={open} fullWidth maxWidth="lg" tabIndex={1000}>
                <DialogTitle>
                    <CmsTextField
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        placeholder="Tìm kiếm bằng ID hoặc SĐT"
                        size="small"
                    />
                </DialogTitle>
                <DialogContent>
                    {
                        reEntities?.length && reEntities.map((val, index) => (
                            <div key={val.id}>
                                <div>
                                    <div>
                                        ID {val?.id}
                                    </div>
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

                            </div>
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