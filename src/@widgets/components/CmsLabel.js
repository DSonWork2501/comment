import React from 'react'
import { Typography } from '@material-ui/core'
import * as PropTypes from 'prop-types';

/**
 * 
 * @description Component Label
 */
function CmsLabel(props) {
    const { 
            content, 
            variant,
            ...otherProps
    } = props;

    return (
        <Typography {...otherProps} variant={variant}>{content}</Typography>
    )
}

CmsLabel.propTypes = {
    content: PropTypes.any,
    variant: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.oneOf([
        'initial',
        'inherit',
        'primary',
        'secondary',
        'textPrimary',
        'textSecondary',
        'error'
    ]),
    component: PropTypes.any,
    to: PropTypes.string
}

CmsLabel.defaultProps = {
    content: "",
    variant: "body1",
}

export default React.memo(CmsLabel)
