import React from 'react';
import { CmsRadioGroup } from '@widgets/components'
import PropTypes from 'prop-types'
import { get } from 'lodash-es';

function CmsFormikRadioGroup(props) {
    const { name, formik, onChange, handleChange, ...otherProps } = props
    const isValueNumber = (value) => {
        // let value = formik.values[name]
        if (value === null) {
            return true
        } else {
            return !isNaN(parseInt(value))
            // return Number.isInteger(value)
        }
    }
    return (
        <CmsRadioGroup
            {...otherProps}
            name={name}
            value={isValueNumber(get(formik.values, name)) ? parseInt(get(formik.values, name)) : get(formik.values, name)}
            onChange={onChange ? onChange : value => {
                formik.setFieldValue(name, isValueNumber(value) ? parseInt(value) : value);
                handleChange && handleChange(isValueNumber(value) ? parseInt(value) : value)
            }}
            onBlur={() => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}

CmsFormikRadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    onChange: PropTypes.func
}

CmsFormikRadioGroup.defaultProps = {
    required: true
}

export default React.memo(CmsFormikRadioGroup)