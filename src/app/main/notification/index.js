import React, {Fragment} from 'react';
import {
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    LinearProgress,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
    List
} from "@material-ui/core";
import { Notifications } from '@material-ui/icons';
// import {Waypoint} from "react-waypoint";

const fieldCheck = [
    {
        title: 'Order',
        prop: 'order_id',
        redirect: '/ecommerce/orders/edit',
    },
    {
        title: 'Support Case',
        prop: 'support_case_id',
        redirect: '/ecommerce/support-case/dialog-case'
    },
    {
        title: 'Task',
        prop: 'task_id',
        redirect: '/ecommerce/tasks/detail',
        permission: 'TASK_TAB',
        redirect_2: '/ecommerce/task-support/detail',
    },
    {
        title: 'Customer',
        prop: 'target_id',
        redirect: '/ecommerce/customers/edit',
        permission: 'CUSTOMER_READ',
        redirect_2: '/ecommerce/customer-support/edit',
    }
];

 const getTags = (notification) => {
     const listTags = [];

     fieldCheck.forEach(field => {
         if (notification[field.prop]) {
             const id = notification[field.prop]
             listTags.push({
                 ...field,
                 title: field.title + ' ' + id,
                 redirect: field.redirect,
                 id
             })
         }
     })

     return listTags;
 }

const notiBtnStyle = {
    padding: '3px 4px!important',
    fontSize: '0.6rem!important'
};

function Notification({
      label = '',
      icon,
      iconMessage,
      data = [],
      countUnread = 0,
      unreadMap = {},
      loadingFetchData = false,
      onReadAll,
      onScrollEnd,
      onRead
    }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClick}
            >
                <Badge badgeContent={countUnread} color="error">
                    <Notifications/>
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: '350px',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 18,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{p: 2, pb: 0, position: 'relative'}}>
                    <Typography
                        variant={'h6'}
                        textAlign={'center'}>
                        {label}
                    </Typography>
                    <Typography
                        fontSize={'0.8rem'}
                        textAlign={'center'}>
                        ({countUnread} unread)
                    </Typography>
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'}>
                        <Button
                            size={'small'}
                            variant={'text'}
                            type={'button'}
                            onClick={() => onReadAll && onReadAll()}
                        >Read all</Button>
                    </Box>
                    <Box position={'absolute'}
                        bottom={0}
                        left={0}
                        width={1}>
                        {loadingFetchData && <LinearProgress />}
                    </Box>
                </Box>
                <Divider/>
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
