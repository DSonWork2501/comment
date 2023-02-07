import React from 'react';
import { CmsAutocomplete } from '@widgets/components'
import PropTypes from 'prop-types'
import { get, isArray } from 'lodash';

function CmsFormikAutocomplete(props) {
    const { onChangeValue, value, multiple, required, name, data, formik, disabled, error, helperText, onChange, loading, onKeyPress, valueIsId, acceptZero, isNotShowError, ...otherProps } = props;
    let idConfig = {};

    if (valueIsId) {
        let valueContent = get(formik.values, name) || (multiple ? [] : null), keyName = typeof valueIsId === 'string' ? valueIsId : 'id';
        if (acceptZero && typeof get(formik.values, name) === 'number')
            valueContent = get(formik.values, name);
        if (!multiple) {
            let fieldValue = data.find(element => element[keyName] === valueContent) || null;
            idConfig = {
                value: fieldValue,
                onChange: (event, value) => {
                    formik.setFieldValue(name, value ? value[keyName] : null);
                    onChangeValue && onChangeValue(value);
                }
            }
        } else {
            let fieldValue = data.filter(element => {
                if (!isArray(valueContent)) {
                    valueContent = JSON.parse(valueContent);
                }
                return valueContent.includes(element[keyName]);
            });

            idConfig = {
                value: fieldValue,
                onChange: (event, value) => {
                    formik.setFieldValue(name, value.map((value) => value[keyName]));
                    onChangeValue && onChangeValue(value);
                }
            }
        }
    }

    return (
        <CmsAutocomplete
            {...otherProps}
            data={data}
            multiple={multiple}
            required={required}
            name={name}
            loading={loading}
            disabled={disabled}
            value={value ? value : get(formik.values, name) || null}
            onChange={(event, value) => onChange ? onChange(event, value, name) : formik.setFieldValue(name, value)}
            onKeyPress={onKeyPress}
            onBlur={event => formik.setFieldTouched(name, true)}
            error={error ? error : (get(formik.touched, name) && Boolean(get(formik.errors, name)))}
            helperText={isNotShowError ? '' : (helperText ? helperText : (get(formik.touched, name) && get(formik.errors, name)))}
            {...idConfig}
        />
    )
}

CmsFormikAutocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    loading: PropTypes.bool
}
CmsFormikAutocomplete.defaultProps = {
    required: true,
    disabled: false,
    error: false,
    helperText: "",
    value: null,
    onChange: null,
    onKeyPress: null,
    loading: null
}

export default React.memo(CmsFormikAutocomplete)