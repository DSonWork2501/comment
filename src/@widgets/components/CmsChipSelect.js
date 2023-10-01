import React from 'react'
import * as PropTypes from 'prop-types';
import FuseChipSelect from '@fuse/core/FuseChipSelect'
import { uniq } from 'lodash';

/**
 * 
 * @description Component ChipSelect
 */
function CmsChipSelect(props) {
    const {
        label,
        name,
        value,
        onChange,
        onBlur,
        className,
        placeholder,
        error,
        helperText,
        required,
        charSplit,
        disabled,
        validateFc,
        variant
    } = props;
    let textFieldProps = {}
    if (name) {
        textFieldProps = { ...textFieldProps, name, variant }
    }

    const handleChange = value => {
        let arr = []
        value.forEach(item => {
            if (item.value) {
                let itemArr = item.value.split(charSplit)
                if (itemArr.length > 1)
                    itemArr.forEach(x => {
                        if ((validateFc ? validateFc(x) : true))
                            arr.push({ value: x ? x.trim() : x, label: x ? x.trim() : x })
                    });
                else {
                    if ((validateFc ? validateFc(item.label) : true))
                        arr.push(item)
                }
            }
        });

        arr = arr.map(item => item.value);
        onChange(uniq(arr))
    }

    return (
        <FuseChipSelect
            className={className}
            value={value.map(item => ({ value: item, label: item }))}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            textFieldProps={{
                ...textFieldProps,
                label: required ? `${label} *` : label,
                error: error,
                helperText: helperText,
                InputLabelProps: {
                    shrink: true
                },

            }}
            disabled={disabled}
            isMulti
        />
    )
}

CmsChipSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    variant: PropTypes.string
}

CmsChipSelect.defaultProps = {
    label: "",
    className: "",
    value: [],
    placeholder: "",
    onChange: null,
    onBlur: null,
    error: false,
    helperText: null,
    required: false,
    disabled: false,
    variant: 'filled'
}

export default React.memo(CmsChipSelect)
