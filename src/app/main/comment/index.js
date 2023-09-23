import React from 'react';
import {
    Badge, IconButton
} from "@material-ui/core";
import { Chat } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { keyStore } from './common';
import reducer, { notify } from './store';
import withReducer from 'app/store/withReducer';
import { useCallback } from 'react';
import CommentDialog from './components/CommentDialog';
// import {Waypoint} from "react-waypoint";

function Comment() {
    //const rawEntities = useSelector(store => store[keyStore].entities?.data);
    const [openDialog, setOpenDialog] = useState('');
    const dispatch = useDispatch();

    const handleCloseDialog = () => {
        setOpenDialog("");
    }

    const getList = useCallback((search) => {
        dispatch(notify.getList(search));
    }, [dispatch]);

    useEffect(() => {
        getList();
    }, [getList])

    return (
        <>
            {
                openDialog === 'comment'
                &&
                <CommentDialog
                    open={openDialog === 'comment'}
                    handleClose={handleCloseDialog}
                    title={'Danh sách comment'}
                //detail={detail}
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