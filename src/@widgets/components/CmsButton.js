import React, { } from 'react'
import {
    Button,
    Icon,
    makeStyles,
    Tooltip,
    Typography
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    customWidth: {
      maxWidth: 500,
    },
    noMaxWidth: {
      maxWidth: 'none',
    },
  }));

/**
 * 
 * @description Component Button
 */
function CmsButton(props) {
    const classes = useStyles();
    var {
        label,
        className,
        startIcon,
        endIcon,
        tooltip,
        tooltipClass,
        ...otherProps
    } = props;

    if (startIcon) {
        otherProps = { ...otherProps, startIcon: <Icon>{startIcon}</Icon> }
    }

    if (endIcon) {
        otherProps = { ...otherProps, endIcon: <Icon>{endIcon}</Icon> }
    }

    if (tooltip) {
        return (
            <Tooltip 
            classes={{ tooltip: clsx(tooltipClass, classes.customWidth) }}
            title={ typeof tooltip === 'string' ? <Typography variant="caption">{tooltip}</Typography> : tooltip}>
                <Button
                    {...otherProps}
                    className={clsx("normal-case font-normal", className)}
                > {label} </Button>
            </Tooltip>
        )
    } else {
        return (
            <Button
                {...otherProps}
                className={clsx("normal-case font-normal", className)}
            > {label} </Button>
        )
    }


}

CmsButton.propTypes = {
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
    tooltip: PropTypes.any,
    tooltipClass: PropTypes.string,
}

CmsButton.defaultProps = {
    label: "",
    variant: "contained",
    color: "secondary",
    size: "medium",
    tooltip: null,
    tooltipClass: "",
}

export default React.memo(CmsButton)
