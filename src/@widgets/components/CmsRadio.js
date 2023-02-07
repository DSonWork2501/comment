import React from 'react'
import {
    Radio,
    FormControlLabel
} from '@material-ui/core'
import * as PropTypes from 'prop-types';

/**
 * 
 * @description Component Radio
 */
function CmsRadio(props) {
    const { label, disabled, ...otherProps } = props;
    return (
        <React.Fragment>
        {disabled ? 
            (<FormControlLabel label={label} disabled {...otherProps} control={<Radio />}/>)
        :(<FormControlLabel label={label} {...otherProps} control={<Radio />}/>)} 
        </React.Fragment>
    )
}

CmsRadio.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    className: PropTypes.string
}

CmsRadio.defaultProps = {
    disabled: false
}

export default React.memo(CmsRadio)
