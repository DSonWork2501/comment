import React from 'react'
import {
    Checkbox,
    FormControlLabel
} from '@material-ui/core'
import * as PropTypes from 'prop-types';

/**
 * 
 * @description Component Checkbox
 */
function CmsCheckbox(props) {
    const { label, disabled, ...otherProps } = props;
    return (
        label
            ? <FormControlLabel
                label={label}
                control={disabled ? <Checkbox {...otherProps} disabled/>: <Checkbox {...otherProps}/>}
            />
            : disabled ? <Checkbox {...otherProps} disabled/> : <Checkbox {...otherProps}/>
    )
}

CmsCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.any,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool
}

CmsCheckbox.defaultProps = {
    label: "",
    disabled: false
}

export default React.memo(CmsCheckbox)
