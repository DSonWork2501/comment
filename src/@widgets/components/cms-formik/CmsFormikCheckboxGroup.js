import React from 'react';
import { CmsCheckboxGroup } from '@widgets/components'
import PropTypes from 'prop-types'

function CmsFormikCheckboxGroup(props){
    const {name, formik, disabled, ...otherProps } = props
    return (
        <CmsCheckboxGroup
            {...otherProps}
            name={name}
            value={formik.values[name] || []}
            onChange={value => formik.setFieldValue(name, value)}
            onBlur={() => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            disabled={disabled}
        />
    )
}

CmsFormikCheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool
}
CmsFormikCheckboxGroup.defaultProps = {
    required: true
}

export default React.memo(CmsFormikCheckboxGroup)