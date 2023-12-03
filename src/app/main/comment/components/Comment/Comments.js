import React, { memo, useState } from 'react';
import { faArrowTurnDown, faChevronRight, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CmsDialog, CmsFormikDateTimePicker, CmsFormikTextField } from '@widgets/components';
import CommentBox from '@widgets/components/CmsComment';

const Comments = ({ comment, dataBackend, replies }) => {
    const timeFormat = new Intl.DateTimeFormat("en-us", {
        timeStyle: 'short',
    })


    return (
        <div style={{ background: 'rgb(250,251,252)' }} className='py-8 relative mb-16'>
            <div>
                <div className='mb-16 flex justify-between items-center'>
                    <div>
                        Comment
                        <FontAwesomeIcon icon={faChevronRight} className="text-11 text-gray-500 mx-4" /> <FontAwesomeIcon icon={faFile} className="text-13 text-gray-500 mr-8" />
                        {comment?.type}
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
                        <div className='mb-8' >
                            <div className='mb-4 '>
                                <b >
                                    {comment?.usercreate}
                                </b>
                                <span className='text-12 text-gray-500 ml-4'>
                                    {comment?.usercreate && timeFormat.format(new Date(comment?.datecreate))}
                                </span>
                            </div>
                            <div>
                                {comment?.comment}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ml-40'>
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map(reply => (
                            <Comments
                                key={reply.id}
                                comment={reply}
                                replies={[]}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default memo(Comments)