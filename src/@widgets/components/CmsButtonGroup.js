import React from 'react'
import { Icon, Typography } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import * as PropTypes from 'prop-types';
import clsx from 'clsx'

/**
 * 
 * @description Component ButtonGroup
 */
function CmsButtonGroup(props) {
    const {
        data,
        error,
        helperText,
        className,
        ...otherProps
    } = props;
    return (
        <div className="w-full">
            <ToggleButtonGroup
                {...otherProps}
                exclusive
                className={clsx("flex-none", className)}
            >
                {data.map((item, index) => (
                    <ToggleButton key={index} value={item.id} className="normal-case" disabled={item.disabled} onClick={item.onClick && item.onClick}>
                        {item.icon && <Icon className="mx-2" color="primary">{item.icon}</Icon>}
                        <Typography color={error ? "error" : "primary"}>{item.name}</Typography>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            {helperText && <Typography className="ml-16" variant="caption" component="p" color={error ? "error" : "primary"}>{helperText}</Typography>}
        </div>
    )
}

CmsButtonGroup.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    size: PropTypes.oneOf(["large", "medium", "small"]),
    error: PropTypes.bool,
    helperText: PropTypes.any
}

CmsButtonGroup.defaultProps = {
    data: [],
    size: "medium",
}

export default React.memo(CmsButtonGroup)
