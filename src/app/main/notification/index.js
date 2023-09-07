import React, { useMemo } from 'react';
import {
    Badge,
    Box,
    Divider,
    IconButton,
    LinearProgress,
    ListItem,
    Popover,
    Typography,
    List,
    makeStyles,
    Paper,
} from "@material-ui/core";
import { Notifications } from '@material-ui/icons';
import { useEffect } from 'react';
import { database } from 'firebase';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { ref, onValue, off } from 'firebase/database';
import { useRef } from 'react';
import { getTimeAgo, keyStore } from './common';
import reducer, { notify } from './store';
import withReducer from 'app/store/withReducer';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { alertInformation } from '@widgets/functions';
// import {Waypoint} from "react-waypoint";

const useStyles = makeStyles((theme) => ({
    popover: {
        overflow: 'visible',
        marginTop: theme.spacing(1.5),
        width: '350px',
        //filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        boxShadow: 'none',
        padding: '0px 8px',
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            marginLeft: -0.5,
            marginRight: theme.spacing(1),
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: theme.spacing(2),
            width: 10,
            height: 10,
            backgroundColor: theme.palette.background.paper,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
        '& ul>div': {
            padding: '2px 8px',
            borderBottom: 'none',
            marginBottom: 8
        },
        '& ul span': {
            fontSize: '13px'
        },
        '& .number-unread': {
            position: 'absolute',
            top: 1,
            left: 0,
            background: 'cadetblue',
            color: 'white',
            fontSize: 13,
            height: 20,
            width: 20,
            textAlign: 'center',
            borderRadius: '50%',
            lineHeight: '20px'
        },
        '& .cus': {
            fontSize: '13px',
            color: 'gray',
            overflow: 'hidden', /* Hide any overflow content */
            textOverflow: 'ellipsis', /* Add ellipsis (...) for text that overflows */
            height: 35
        },
        '& .cus-info': {
            fontWeight: 700,
            color: 'black'
        },
        '& .title': {
            fontWeight: 700,
            fontSize: '13px'
        }
    },
}));

const TimeRender = ({ time }) => {
    const [state, setState] = useState(0);

    useEffect(() => {
        // Initialize the interval and store its ID
        const intervalId = setInterval(() => {
            setState(prev => prev + 1);
        }, 60000);

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [])

    console.log(state);

    return getTimeAgo(new Date(), new Date(time));
}

function Notification({
    countUnread = 0,
    loadingFetchData = false,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const entities = useSelector(store => store[keyStore].entities?.data);
    const pageFresh = useRef(true);
    const classes = useStyles();
    const dispatch = useDispatch();
    const numberUnread = useMemo(() => {
        let count = 0;
        if (entities?.length)
            entities.forEach(element => {
                if (element?.status === 1)
                    count = count + 1;
            });
        return count;
    }, [entities])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getList = useCallback((search) => {
        dispatch(notify.getList(search));
    }, [dispatch]);

    useEffect(() => {
        getList();
    }, [getList])

    useEffect(() => {
        // const unsubscribe = onSnapshot(collection(db, 'Notification'), (snapshot) => {
        //     const data = snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data(),
        //     }));
        //     console.log(data);
        //     if (pageFresh.current) {
        //         pageFresh.current = false;
        //         return;
        //     }
        //     setNumberUnread(prev => prev ? prev + 1 : 1);
        //     dispatch(showMessage({ variant: "success", message: 'Có một thông báo mới' }))
        // });

        // return () => {
        //     unsubscribe();
        // };

        const databaseRef = ref(database, 'cms');

        // Attach an event listener to watch for changes
        const onDataChange = (snapshot) => {
            const newData = snapshot.val();
            if (pageFresh.current) {
                pageFresh.current = false;
                return;
            }
            console.log(newData);
            dispatch(showMessage({ variant: "success", message: 'Có một thông báo mới' }))
            getList();
        };

        onValue(databaseRef, onDataChange);

        // Cleanup by detaching the listener when the component unmounts
        return () => {
            off(databaseRef, onDataChange);
        };
    }, [dispatch, getList]);

    const handleRead = async (values) => {
        const resultAction = await dispatch(notify.read(values))
        unwrapResult(resultAction);
        getList();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClick}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Badge
                    badgeContent={countUnread}
                    color="error">
                    <Notifications />
                </Badge>
                {
                    Boolean(numberUnread)
                    &&
                    <div style={{
                        position: 'absolute',
                        top: 1,
                        left: -8,
                        background: 'rgb(170 0 10)',
                        color: 'white',
                        fontSize: 13,
                        height: 24,
                        width: 24,
                        textAlign: 'center',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0px 1px 3px 1px #000000ad'
                    }}>
                        {numberUnread}
                    </div>
                }

            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Paper className={classes.popover}>
                    <Typography
                        style={{
                            fontSize: '20px',
                            fontWeight: 700
                        }}
                        variant={'h1'}>
                        Thông báo
                    </Typography>
                    {
                        Boolean(entities?.length)
                        &&
                        <Box
                            display={'flex'}
                            justifyContent={'flex-end'}>
                            <span
                                style={{
                                    fontSize: '13px'
                                }}
                                onClick={() => {
                                    alertInformation({
                                        text: `Xác nhận thao tác`,
                                        data: {},
                                        confirm: async () => {
                                            try {
                                                const resultAction = await dispatch(notify.deleteAll())
                                                unwrapResult(resultAction);
                                                getList();
                                            } catch (error) { } finally {
                                            }
                                        },
                                    });
                                }}
                                className='underline text-red-400 cursor-pointer mr-8'>
                                Xóa hết
                            </span>
                            <span
                                style={{
                                    fontSize: '13px'
                                }}
                                onClick={() => {
                                    alertInformation({
                                        text: `Xác nhận thao tác`,
                                        data: {},
                                        confirm: async () => {
                                            try {
                                                const resultAction = await dispatch(notify.read(entities.map(val => ({ id: val.id }))))
                                                unwrapResult(resultAction);
                                                getList();
                                            } catch (error) { } finally {
                                            }
                                        },
                                    });
                                }}
                                className='underline text-blue-400 cursor-pointer'>
                                Đọc tất cả
                            </span>
                        </Box>
                    }

                    <Box position={'absolute'}
                        bottom={0}
                        left={0}
                        width={1}>
                        {loadingFetchData && <LinearProgress />}
                    </Box>
                    <List>
                        {Boolean(entities?.length) && entities.map((item) => (
                            <ListItem
                                key={item.id}
                                button
                                divider
                                className='flex justify-between items-center rounded-4'
                                onClick={() => handleRead([{ id: item.id }])}
                            >
                                <div style={{ width: 40 }}>
                                    <div className='rounded-full bg-grey-300 flex items-center justify-center' style={{ height: 40, width: 40 }} >
                                        <FontAwesomeIcon className='text-pink-300' icon={faGift} />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: 'calc(100% - 60px)'
                                    }}
                                >
                                    <div className={`${item.status === 1 ? 'text-blue-400' : 'text-gray-500'} title`}>
                                        {item.title}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                                    <div className={`${item.status === 1 ? 'text-blue-400' : 'text-gray-500'}`} style={{ lineHeight: 1 }}>
                                        <span style={{ fontSize: '11px' }}>
                                            <TimeRender time={item.datecreate} />
                                            {/* 1 giờ trước */}
                                        </span>
                                    </div>
                                </div>

                                {item.status === 1 ? (
                                    <span
                                        style={{
                                            background: 'rgb(24 118 242)',
                                            height: 10,
                                            width: 10,
                                            borderRadius: '50%'
                                        }}
                                    >

                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            height: 10,
                                            width: 10,
                                            borderRadius: '50%'
                                        }}
                                    >

                                    </span>
                                )
                                }
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Divider />
                {/* <List sx={{ width: '100%', height: '400px', bgcolor: 'background.paper', borderRadius: '5px', px: 2, overflow: 'auto' }}>
                    {data.map((notification, index) => (
                        <Fragment key={notification.id}>
                            <ListItem
                                divider
                                sx={{justifyContent: 'center!important', mb: 1, flexDirection: 'column'}}
                                className={unreadMap[notification.id] ? 'bg-sky-50' : ''}
                            >
                                <Box display={'flex'}
                                    alignItems={'center'}>
                                    <ListItemIcon>
                                        {iconMessage}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {notification.description}
                                            </Typography>
                                        }
                                    />
                                </Box>
                                <Box display={'flex'}
                                     justifyContent={'space-between'}
                                     alignItems={'flex-start'}
                                     my={1}
                                     width={'100%'}>
                                    <Box>
                                        {getTags(notification).map((tag, index) => (
                                            <Button variant={'outlined'}
                                                    key={index}
                                                    sx={{...notiBtnStyle, mr: 1}}
                                                    size={'small'}>
                                                {tag.title}
                                            </Button>
                                        ))}
                                    </Box>
                                    {unreadMap[notification.id] &&
                                        <Button variant={'outlined'}
                                                sx={notiBtnStyle}
                                                onClick={() => onRead(notification.id)}
                                                size={'small'}>read</Button>}
                                </Box>
                                <Box width={'100%'}>
                                    <span className={'text-xs text-slate-500'}>
                                        <DateFormatted isAgo={true}
                                                       date={notification.created_time} />
                                    </span>
                                </Box>
                            </ListItem>
                            {index === data.length - 1 && <Waypoint onEnter={() => onScrollEnd && onScrollEnd()}/>}
                        </Fragment>
                    ))}
                </List> */}
            </Popover>
        </>
    );
}

export default withReducer(keyStore, reducer)(Notification);