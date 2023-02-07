import React from 'react';
import { Box, styled, Icon, makeStyles, Button, Tooltip } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { updateUserSettings } from 'app/auth/store/userSlice';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

const LayoutCustom = styled(Box)({
    // position: "fixed",
    // bottom: 10,
    // right: 10,
    // zIndex: 9
});

const layoutSetting = [
    {
        "customScrollbars": true,
        "animations": true,
        "direction": "ltr",
        "theme": {
            "main": "light6",
            "navbar": "light6",
            "toolbar": "light6",
            "footer": "light6"
        },
        "layout": {
            "style": "layout3",
            "config": {}
        }
    },
    {
        "customScrollbars": true,
        "animations": true,
        "direction": "ltr",
        "theme": {
            "main": "light6",
            "navbar": "light6",
            "toolbar": "light6",
            "footer": "light6"
        },
        "layout": {
            "style": "layout1",
            "config": {}
        }
    }
];

const useStyles = makeStyles(theme => ({
    buttonWrapper: {
        position: 'absolute',
        right: 0,
        top: 160,
        display: 'flex',
        flexDirection: 'column',
        items: 'center',
        justify: 'center',
        overflow: 'hidden',
        opacity: 0.9,
        padding: 0,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        zIndex: 999,
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[500],
            opacity: 1
        }
    },
    button: {
        minWidth: 40,
        width: 40,
        height: 40,
        margin: 0
    },
    settingsButton: {
        '& $buttonIcon': {
            animation: '$rotating 3s linear infinite'
        }
    },
    schemesButton: {},
    '@keyframes rotating': {
        from: {
            transform: 'rotate(0deg)'
        },
        to: {
            transform: 'rotate(360deg)'
        }
    },
    buttonIcon: {
        fontSize: 20
    },
    dialogPaper: {
        position: 'fixed',
        width: 380,
        maxWidth: '90vw',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        top: 0,
        height: '100%',
        minHeight: '100%',
        bottom: 0,
        right: 0,
        margin: 0,
        zIndex: 1000,
        borderRadius: 0
    }
}));

const CustomChangeLayout = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const settings = useSelector(({ fuse }) => fuse.settings.current);

    const handleChangeLayout = () => {
        let newSettings = settings.layout.style === 'layout3' ? layoutSetting[1] : layoutSetting[0];
        dispatch(updateUserSettings(newSettings));
    }

    return <LayoutCustom>
        <div className={classes.buttonWrapper}>
            <Tooltip title={`${settings.layout.style === 'layout3' ? 'Click menu dọc' : 'Click menu ngang'}`}>
                <Button
                    className={clsx(classes.button, classes.settingsButton)}
                    variant="text"
                    color="inherit"
                    onClick={handleChangeLayout}
                >
                    <Icon className={classes.buttonIcon}>settings</Icon>
                </Button>
            </Tooltip>
        </div>
    </LayoutCustom >
}

export default CustomChangeLayout;