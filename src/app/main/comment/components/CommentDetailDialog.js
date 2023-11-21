import React from 'react';
import { faArrowTurnDown, faChevronRight, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Icon } from '@material-ui/core';
import { CmsDialog, CmsFormikDateTimePicker, CmsFormikTextField } from '@widgets/components';
import CommentBox from '@widgets/components/CmsComment';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';

function CommentDetailDialog({ dataBackend }) {
    console.log(dataBackend)
    return (
        <div className='my-8 text-13' >
            <div>
                <div className='text-center font-600 text-grey-500 mb-8'>
                </div>
            </div>
            <div style={{ background: 'rgb(250,251,252)' }} className='p-8 relative mb-16'>
                <div className='mb-16 flex justify-between items-center'>
                    <div>
                        Comment
                        <FontAwesomeIcon icon={faChevronRight} className="text-11 text-gray-500 mx-4" /> <FontAwesomeIcon icon={faFile} className="text-13 text-gray-500 mr-8" />
                    </div>
                    <div className='mr-8'>
                        <FontAwesomeIcon
                            icon={faArrowTurnDown}
                            className='text-13 text-gray-500 border py-8 px-4 rounded-4 cursor-pointer hover:shadow-2'
                            style={{ transform: 'rotate(90deg)' }} />
                    </div>
                </div>
                <div className='flex space-x-4'>
                    <div style={{ width: 28 }}>
                        <img className='rounded-full' style={{ width: 25, margin: 'auto' }} alt='user' src='https://app.startinfinity.com/profile/avatar.svg?name=manhtc&quot' />
                    </div>
                    <div style={{ width: 'calc(100% - 28px)' }}>
                        <div className='mb-8'>
                            <div className='mb-4'>
                                <b>
                                </b>
                                <span className='text-12 text-gray-500 ml-4'>
                                </span>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentDetailDialog