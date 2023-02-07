import React from 'react'
import { TextField, InputAdornment, Divider } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
/**
 * 
 * @description Component TextField
 */
function CmsTextField(props) {
    const {
        startText,
        endText,
        startNode,
        endNode,
        isNumber,
        isSearch,
        disabled,
        readOnly,
        required,
        label,
        variant,
        type,
        inputProps,
        isNumberFormat,
        ...otherProps
    } = props;
    const NumberFormatComponent = isNumberFormat ? { inputComponent: NumberFormatCustom } : {}

    return (
        <TextField
            {...otherProps}
            fullWidth
            label={required ? `${label ? label + '*' : ''}` : label}
            variant={variant}
            type={isNumber ? "number" : isSearch ? "search" : type}
            InputProps={{
                ...inputProps,
                ...NumberFormatComponent,
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
        />
    )
}

CmsTextField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    startText: PropTypes.string,
    endText: PropTypes.string,
    startNode: PropTypes.node,
    endNode: PropTypes.node,
    isNumber: PropTypes.bool,
    isSearch: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onClick: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.any,
    variant: PropTypes.oneOf([
        'outlined',
        'filled',
        'standard'
    ]),
    type: PropTypes.string,
    inputProps: PropTypes.object,
    isNumberFormat: PropTypes.bool
}

CmsTextField.defaultProps = {
    startText: null,
    endText: null,
    startNode: null,
    endNode: null,
    isNumber: false,
    isSearch: false,
    multiline: false,
    rows: 3,
    disabled: false,
    readOnly: false,
    required: false,
    variant: 'outlined',
    type: "text",
    inputProps: {},
    isNumberFormat: false
}

export default React.memo(CmsTextField)

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value
                    }
                });
            }}
            thousandSeparator={","}
            decimalSeparator={"."}
            isNumericString
        />
    );
}