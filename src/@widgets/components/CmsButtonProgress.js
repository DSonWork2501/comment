import React from 'react'
import {
    Button,
    Icon
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        // margin: theme.spacing(1),
        position: 'relative',
    },
    progress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
/**
 * 
 * @description Component CmsButtonProgress
 */
function CmsButtonProgress(props) {
    const classes = useStyles();
    var { 
        label,
        className, 
        startIcon, 
        endIcon,
        disabled,
        loading,
        ...otherProps
    } = props;
    
    if(startIcon){
        otherProps ={...otherProps, startIcon: <Icon>{startIcon}</Icon>}
    }

    if(endIcon){
        otherProps={...otherProps, endIcon: <Icon>{endIcon}</Icon>}
    }
    
    return (
        <div className={classes.wrapper}>
            <Button
                {...otherProps}
                className={clsx("normal-case font-normal", className)}
                disabled={loading || disabled}
            > 
                {label} 
            </Button>
            {loading && <CircularProgress size={24} className={classes.progress} />}
        </div>
    )
}

CmsButtonProgress.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.oneOf(["contained", "outlined", "text"]),
    component: PropTypes.any,
    to: PropTypes.string,
    startIcon: PropTypes.string,
    endIcon: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
    onClick: PropTypes.func,
    size: PropTypes.oneOf(["large", "medium", "small"]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
}

CmsButtonProgress.defaultProps = {
    label: "",
    variant: "contained",
    color: "secondary",
    size: "medium",
    loading: false
}

export default React.memo(CmsButtonProgress)
