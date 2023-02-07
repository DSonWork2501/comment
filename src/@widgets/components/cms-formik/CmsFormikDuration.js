import React from 'react';
import PropTypes from 'prop-types'
import CmsDuration from '../CmsDuration';

function CmsFormikDuration(props){
    const {name, formik,disabled, ...otherProps } = props
    
    return (
        <CmsDuration
            {...otherProps}
            name={name}
            value={formik.values[name] || ""}
            onChange={value => formik.setFieldValue(name, parseInt(value))}
            onBlur={event => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            disabled={disabled}
        />
    )
}

CmsFormikDuration.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool
}

CmsFormikDuration.defaultProps = {
    required: true,
    disabled: false
}

export default React.memo(CmsFormikDuration)