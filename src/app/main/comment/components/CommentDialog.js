import React from 'react';
import { faArrowTurnDown, faChevronRight, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Icon } from '@material-ui/core';
import { CmsDialog, CmsFormikDateTimePicker, CmsFormikTextField } from '@widgets/components';
import CommentBox from '@widgets/components/CmsComment';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import CommentDetailDialog from './CommentDetailDialog';
import { useState } from 'react';
const Filter = ({ onSearch, search, namePage }) => {

    const initialValues = {
        page: 1,
        limit: 10,
        phone: '',
        fromDate: null,
        toDate: null
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    })
    const { setFieldValue } = formik;

    useEffect(() => {
        if (search) {
            for (const key in initialValues) {
                if (search[key] !== initialValues[key]) {
                    let value = search[key];
                    setFieldValue(key, value);
                }
            }
        }
    }, [search, setFieldValue, initialValues])

    function handleSubmit(value) {
        let values = { ...value };
        if (values?.fromDate)
            values.fromDate = format(new Date(values.fromDate), 'yyyy-MM-dd')
        if (values?.toDate)
            values.toDate = format(new Date(values.toDate), 'yyyy-MM-dd')
        onSearch(values);
    }

    return <div className="bg-white">
        <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start space-x-8 px-8 w-2/3" >
            <CmsFormikTextField
                label={`Người nhắc`}
                name="phone"
                className="my-8"
                size="small"
                clearBlur
                formik={formik} />
            <CmsFormikDateTimePicker
                format="dd/MM/yyyy"
                className="my-8"
                name="fromDate"
                formik={formik}
                size="small"
                isOpenKeyBoard={false}
                label="Từ ngày" />
            <CmsFormikDateTimePicker
                format="dd/MM/yyyy"
                className="my-8"
                name="toDate"
                formik={formik}
                size="small"
                isOpenKeyBoard={false}
                label="Đến ngày" />
            <Button
                style={{
                    background: '#FF6231',
                    color: 'white',
                    height: 36,
                    position: 'relative',
                    top: -1
                }}
                size='small'
                variant="contained"
                type='submit'
            >
                <Icon>
                    search
                </Icon>
            </Button>
            <Button
                style={{
                    color: 'black',
                    height: 36,
                    position: 'relative',
                    top: -1
                }}
                size='small'
                variant="contained"
                type='submit'
                onClick={() => formik.handleReset()}
            >
                <Icon>
                    refresh
                </Icon>
            </Button>
        </form>
    </div>
}

function CommentDialog({ detail, open, handleClose, title, dataBackend }) {
    console.log(">>> DATA", dataBackend)
    const [onDetail, setOnDetail] = useState(false)
    const dateFormat = new Intl.DateTimeFormat("en-us", {
        dateStyle: 'medium',
    })
    const timeFormat = new Intl.DateTimeFormat("en-us", {
        timeStyle: 'short',
    })

    // this gives an object with dates as keys
    const groups = dataBackend.reduce((groups, game) => {
        const date = game.datecreate.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(game);
        return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
        return {
            date,
            comments: groups[date]
        };
    });

    return (
        <CmsDialog
            //title={title}
            handleClose={handleClose}
            isCloseDialogSubmit={false}
            open={open}
            size="lg"
        >
            {
                !onDetail
                    ?
                    <>
                        <Filter search={null} onSearch={() => { }} />
                        {
                            groupArrays.map(groupDate => {
                                return (
                                    <div className='my-8 text-13' key={groupDate.date}>
                                        <div>
                                            <div className='text-center font-600 text-grey-500 mb-8'>
                                                {/* {console.log("Date :", groupDate.date)} */}
                                                {dateFormat.format(new Date(groupDate.date))}
                                            </div>
                                        </div>
                                        {groupDate.comments.length > 0 && groupDate.comments.map(el => {
                                            console.log("Check >>> ", el)
                                            return (
                                                <div style={{ background: 'rgb(250,251,252)' }} className='p-8 relative mb-16'>
                                                    <div className='mb-16 flex justify-between items-center'>
                                                        <div>
                                                            Comment
                                                            <FontAwesomeIcon icon={faChevronRight} className="text-11 text-gray-500 mx-4" /> <FontAwesomeIcon icon={faFile} className="text-13 text-gray-500 mr-8" />
                                                            {el.type}
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
                                                                    <b className='cursor-pointer' onClick={() => setOnDetail(true)}>
                                                                        {el.usercreate}
                                                                    </b>
                                                                    <span className='text-12 text-gray-500 ml-4'>
                                                                        {timeFormat.format(new Date(el.datecreate))}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    {el.comment}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                )
                            })
                        }
                    </>
                    :
                    <>
                        <CommentDetailDialog
                            dataBackend={dataBackend}
                        />
                    </>
            }
        </CmsDialog>
    )
}

export default CommentDialog