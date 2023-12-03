import React, { useState } from 'react';
import { Button, Icon } from '@material-ui/core';
import { CmsDialog, CmsFormikDateTimePicker, CmsFormikTextField } from '@widgets/components';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import CommentBox from '@widgets/components/CmsComment';
import Comment from './Comment/Comment';
import Comments from './Comment/Comments';
import { id } from 'date-fns/locale';

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
    // console.log(">>> DATA", dataBackend)
    const dateFormat = new Intl.DateTimeFormat("en-us", {
        dateStyle: 'medium',
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

    const [acitveComment, setActiveComment] = useState(null)
    const [onDetail, setOnDetail] = useState(false)
    const [checkRoot, setCheckRoot] = useState(false)
    const rootComments = dataBackend.filter((el) => el.parentid === 0)
    const getReplies = (commendId) => {
        return dataBackend.filter(el =>
            el.parentid === commendId).sort((a, b) => new Date(a.datecreate).getTime() - new Date(b.datecreate).getTime())
    }
    const getRootCommentData = (commentId) => {
        return dataBackend.filter(el =>
            el.id === commentId)
    }
    const checkRootComment = (comment) => {
        rootComments.map(el => {
            if (comment.id === el.id) {
                setCheckRoot(true)
            }
        })
    }
    const handleOnDetail = () => {
        setOnDetail(true)
    }

    return (
        <CmsDialog
            //title={title}
            setOnDetail={setOnDetail}
            setActiveComment={setActiveComment}
            setCheckRoot={setCheckRoot}
            onDetail={onDetail}
            detailcomment
            handleClose={handleClose}
            isCloseDialogSubmit={false}
            open={open}
            size="lg"
        >
            {!onDetail
                ?
                <>
                    <Filter search={null} onSearch={() => { }} />
                    {
                        groupArrays.map(groupDate => {
                            return (
                                <div className='my-8 text-13' key={groupDate.date}>
                                    <div>
                                        <div className='text-center font-600 text-grey-500 mb-8'>
                                            {dateFormat.format(new Date(groupDate.date))}
                                        </div>
                                    </div>
                                    {groupDate.comments.length > 0 && groupDate.comments.map(el => {
                                        return (
                                            <Comment
                                                key={el.id}
                                                // acitveComment={acitveComment}
                                                setActiveComment={setActiveComment}
                                                checkRootComment={checkRootComment}
                                                comment={el}
                                                handleOnDetail={handleOnDetail}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </>
                :
                < div >
                    <CommentBox initialText={acitveComment.comment} />
                    {
                        checkRoot
                            ?
                            <>
                                <Comments
                                    replies={getReplies(acitveComment?.id)}
                                    dataBackend={dataBackend}
                                    comment={acitveComment}
                                />
                            </>
                            :
                            <>
                                <Comments
                                    replies={getReplies(acitveComment?.parentid)}
                                    dataBackend={dataBackend}
                                    comment={getRootCommentData(acitveComment.parentid)[0]}
                                />
                            </>
                    }
                </div>
            }
            <div className='flex justify-end bg-red-500'>
                Pagintaion
            </div>

        </CmsDialog >
    )
}

export default CommentDialog