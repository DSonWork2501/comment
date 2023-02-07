import React, { useState, useEffect, useCallback } from 'react';
import { CmsTextField } from '@widgets/components'
import PropTypes from 'prop-types'
import { get } from 'lodash';

function CmsFormikTextField(props) {
    const { name, formik, onChange, clearBlur, onBlur, trimLeft, ...otherProps } = props
    const [value, setValue] = useState(null);

    useEffect(() => {
        setValue(get(formik.values, name))
    }, [formik.values, name])

    const handleSetFomrik = useCallback(() => {
        if (get(formik.values, name) !== value) {
            formik.setFieldTouched(name, true)
            formik.setFieldValue(name, value)
            onBlur && onBlur(name, value)
        }
    }, [value, name, formik, onBlur])

    return (
        <CmsTextField
            {...otherProps}
            name={name}
            value={props?.isNumber ? (value ? JSON.stringify(parseInt(value)) : 0) : (value || "")}
            //onChange={(event) => { setValue(event.target.value); onChange && onChange(event); clearBlur && formik.setFieldValue(name, event.target.value) }}
            onChange={(event) => { setValue((trimLeft && event.target.value) ? event.target.value.trimLeft() : event.target.value); onChange && onChange(event, name); clearBlur && formik.setFieldValue(name, (trimLeft && event.target.value) ? event.target.value.trimLeft() : event.target.value) }}
            onBlur={onBlur || handleSetFomrik}
            error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
            helperText={get(formik.touched, name) && get(formik.errors, name)}
        />
    )
}

CmsFormikTextField.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    trimLeft: PropTypes.bool
}

CmsFormikTextField.defaultProps = {
    required: true,
    onChange: null,
    trimLeft: false
}

export default React.memo(CmsFormikTextField)