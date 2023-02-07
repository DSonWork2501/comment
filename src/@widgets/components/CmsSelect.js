import React from 'react'
import {
    TextField,
    MenuItem,
    InputAdornment,
    Divider
} from '@material-ui/core'
import * as PropTypes from 'prop-types';

/**
 * 
 * @description Component Select
 */
function CmsSelect(props) {
    const {
        data, 
        startText, 
        endText, 
        startNode, 
        endNode,
        disabled,
        readOnly,
        required,
        label,
        setOptionLabel,
        keyValue,
        ...otherProps
    } = props;

    return (
        <TextField
            {...otherProps}
            label={required ? `${label ? label + '*' : ''} ` : label}
            select
            variant="outlined"
            fullWidth
            InputProps={{
                startAdornment: (startText || startNode) && (
                    <div className="flex items-center">
                        {startNode && <React.Fragment>{startNode}<Divider className="h-40 mx-8" orientation="vertical" /></React.Fragment>}
                        {startText && <InputAdornment position="start">{startText}</InputAdornment>}
                    </div>),
                endAdornment: (endText || endNode) && (
                    <div className="flex items-center">
                        {endText && <InputAdornment position="end">{endText}</InputAdornment>}
                        {endNode && <React.Fragment><Divider className="h-40 mx-8" orientation="vertical" />{endNode}</React.Fragment>}
                    </div>),
                disabled: disabled,
                readOnly: readOnly
            }}
        >
            {data.map((item, index) => (
                <MenuItem key={index} value={item[keyValue ? keyValue : 'id']} disabled={item.disabled}>
                    {setOptionLabel ?
                        setOptionLabel(item)
                        : item.name
                    }
                </MenuItem>
            ))}
        </TextField>
    )
}

CmsSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    startText: PropTypes.string,
    endText: PropTypes.string,
    startNode: PropTypes.node,
    endNode: PropTypes.node,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.any,
    placeholder: PropTypes.string
}

CmsSelect.defaultProps = {
    data: [],
    startText: null,
    endText: null,
    startNode: null,
    endNode: null,
    disabled: false,
    readOnly: false,
    required: false
}

export default React.memo(CmsSelect)
