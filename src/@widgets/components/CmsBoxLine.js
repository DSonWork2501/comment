import React from 'react'
import {
    Typography,
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

/**
 * @description Định nghĩa css
 */
const useStyles = makeStyles(theme => ({
    boxLine: {
        position: 'relative',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 2,
        padding: '12px 12px 0 12px',
        margin: '0 0 0 0'
    },
    boxLabel: {
        position: 'absolute',
        top: -10,
        left: 8,
        padding: '0 4px',
        backgroundColor: theme.palette.background.paper
    },
    boxContent: {
        margin: '6px 0',
        width: '100%',
        '&:last-child': {
            marginBottom: '6px'
        }
    }
}));

/**
 * 
 * @description Component Box line
 */
function CmsBoxLine(props) {
    const classes = useStyles(props);
    const { 
        label, 
        children,
        className,
        classNameLabel
    } = props

    return (
        <div className={clsx(classes.boxLine, className)}>
            <Typography className={clsx(classes.boxLabel, classNameLabel)} color="primary">{label}</Typography>
            <div className={classes.boxContent} >{children}</div>
        </div>
    )
}

CmsBoxLine.propTypes = {
    label: PropTypes.any,
    className: PropTypes.string,
    classNameLabel: PropTypes.string,
}

CmsBoxLine.defaultProps = {
    label: "",
    classNameLine: "",
    classNameLabel: ""
}


export default React.memo(CmsBoxLine)
