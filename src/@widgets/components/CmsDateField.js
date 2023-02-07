import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import * as PropTypes from 'prop-types';
/**
 * 
 * @description Component DateField
 */
function CmsDateField(props) {
    const { 
        startText, 
        endText, 
        onlyDate,
        ...otherProps
    } = props;

    return (
        <TextField
            {...otherProps}
            fullWidth
            variant="outlined"
            type={onlyDate ? "date" : "datetime-local"}
            InputProps={{
                startAdornment: startText && <InputAdornment position="start">{startText}</InputAdornment>,
                endAdornment: endText && <InputAdornment position="end">{endText}</InputAdornment>
            }}
            InputLabelProps={{ shrink: true }}
        />
    )
}

CmsDateField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    startText: PropTypes.string,
    endText: PropTypes.string,
    onlyDate: PropTypes.bool
}

CmsDateField.defaultProps = {
    startText: null,
    endText: null,
    onlyDate: false
}

export default React.memo(CmsDateField)
