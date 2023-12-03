import React from 'react';
import {
    Badge, IconButton
} from "@material-ui/core";
import { Chat } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keyStore } from './common';

import { notify } from '../notification/store/index';
import withReducer from 'app/store/withReducer';
import { useCallback } from 'react';
import CommentDialog from './components/CommentDialog';
import reducer, { comment } from './store';
// import {Waypoint} from "react-waypoint";

function Comment() {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState('');
    const rawEntities = useSelector(store => store[keyStore]?.entities?.data);
    const search = useSelector(store => store[keyStore]?.search)

    const getList = useCallback((search) => {
        dispatch(notify.getList(search));
        dispatch(comment.getList(search))
    }, [dispatch]);

    useEffect(() => {
        getList(search);
    }, [search])

    const handleCloseDialog = () => {
        setOpenDialog("");
    }

    return (
        <>
            {
                openDialog === 'comment'
                &&
                <CommentDialog
                    dataBackend={rawEntities}
                    open={openDialog === 'comment'}
                    handleClose={handleCloseDialog}
                    title={'Danh sách comment'}
                />
            }
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                    setOpenDialog('comment')
                }}
            >
                <Badge
                    color="error">
                    <Chat />
                </Badge>
            </IconButton>
        </>
    );
}

export default withReducer(keyStore, reducer)(Comment);