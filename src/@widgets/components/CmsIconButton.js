import React from 'react'
import {
    IconButton,
    Icon,
    Tooltip,
    Typography
} from '@material-ui/core'
import FuseAnimate from '@fuse/core/FuseAnimate'
import * as PropTypes from 'prop-types';

/**
 * 
 * @description Component IconButton
 */
function CmsIconButton(props) {
    const { 
        tooltip, 
        icon, 
        delay, 
        disabled,
        ...otherProps
    } = props;
    return (
        <FuseAnimate animation="transition.slideLeftIn" delay={delay}>
            {tooltip && !disabled ? (
                <Tooltip title={ typeof tooltip === 'string' ? <Typography variant="caption">{tooltip}</Typography> : tooltip}>
                    <IconButton {...otherProps} disabled={disabled}>
                        <Icon>{icon}</Icon>
                    </IconButton>
                </Tooltip>
            ): (
                <IconButton {...otherProps} disabled={disabled}>
                    <Icon>{icon}</Icon>
                </IconButton>
            )}
        </FuseAnimate>
    )
}

CmsIconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    tooltip: PropTypes.any,
    className: PropTypes.string,
    delay: PropTypes.number,
    onClick: PropTypes.func,
    color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
    size: PropTypes.oneOf(["medium", "small"]),
    disabled: PropTypes.bool
}

CmsIconButton.defaultProps = {
    delay: 200,
    color: "primary",
    size: "medium",
    disabled: false
}

export default React.memo(CmsIconButton)
