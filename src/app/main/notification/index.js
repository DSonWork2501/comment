import React from 'react';
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
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useRef } from 'react';
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
            padding: '0 8px',
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
        }
    },
}));

const items = [
    { id: 1, text: 'Unread Item 1', unread: true },
    { id: 2, text: 'Read Item 2', unread: false },
    { id: 3, text: 'Unread Item 3', unread: true },
    { id: 4, text: 'Read Item 4', unread: false },
];

function Notification({
    countUnread = 0,
    loadingFetchData = false,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [numberUnread, setNumberUnread] = useState(null);
    const pageFresh = useRef(true);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Notification'), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(data);
            if (pageFresh.current) {
                pageFresh.current = false;
                return;
            }
            setNumberUnread(prev => prev ? prev + 1 : 1);
            dispatch(showMessage({ variant: "success", message: 'Có một thông báo mới' }))
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

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
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'}>
                        <span
                            style={{
                                fontSize: '13px'
                            }}
                            className='underline text-blue-400 cursor-pointer'>
                            Xem tất cả
                        </span>
                    </Box>
                    <Box position={'absolute'}
                        bottom={0}
                        left={0}
                        width={1}>
                        {loadingFetchData && <LinearProgress />}
                    </Box>
                    <List>
                        {items.map((item) => (
                            <ListItem
                                key={item.id}
                                button
                                divider
                                className='flex justify-between items-center'
                            >
                                <div
                                    style={{
                                        width: 'calc(100% - 20px)'
                                    }}
                                >
                                    <span className='font-bold mr-2'>
                                        Trương công mạnh
                                    </span>
                                    <span style={{ color: 'gray' }}>
                                        đã tạo 1 đơn hàng
                                    </span>
                                    <div className={`${item.unread ? 'text-blue-400' : 'text-gray-500'}`} style={{ lineHeight: 1 }}>
                                        <span style={{ fontSize: '11px' }}>
                                            1 giờ trước
                                        </span>
                                    </div>
                                </div>

                                {item.unread ? (
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

export default Notification;
