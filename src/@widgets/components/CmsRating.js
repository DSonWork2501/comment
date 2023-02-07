import React from 'react'
import { Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import * as PropTypes from 'prop-types';
import clsx from 'clsx'
/**
 * 
 * @description Component Rating
 */
function CmsRating(props) {
    const { 
        label, 
        className,
        error,
        helperText,
        required,
        ...otherProps
    } = props;
    
    return (
        <div className={clsx("w-full" ,className)}>
            <Typography component="legend" className="mb-3" color={error ? "error" : "primary"}>{required ? `${label} *` : label}</Typography>
            <Rating
                {...otherProps}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                className="w-full"
                size="large"
            />
            {helperText && <Typography className="ml-16" variant="caption" color={error && "error"}>{helperText}</Typography>}
        </div>
    )
}

CmsRating.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    precision: PropTypes.number,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    max: PropTypes.number
}

CmsRating.defaultProps = {
    label: "",
    className: "",
    precision: 0.5,
    required: false,
    max: 5
}

export default React.memo(CmsRating)
