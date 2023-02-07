import React from 'react';
import { CmsCheckbox } from '@widgets/components'
import PropTypes from 'prop-types'

function CmsFormikCheckbox(props){
    const {name, formik, disabled, ...otherProps } = props
    const ouputValue = (value) => {
        return typeof formik.values[name] ==='number' ? value.target.checked === true ? 1 : 0
            : value.target.checked === true ? '1' : '0'
    }
    return (
        <CmsCheckbox
            {...otherProps}
            name={name}
            checked={formik.values[name] === '1' || (!isNaN(parseInt(formik.values[name])) && parseInt(formik.values[name]) === 1) ? true : false }
            onChange={value => formik.setFieldValue(name, ouputValue(value) )}
            onBlur={() => formik.setFieldTouched(name, true)}
            // error={formik.touched[name] && Boolean(formik.errors[name])}
            disabled={disabled}
        />
    )
}

CmsFormikCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    formik: PropTypes.any.isRequired,
    disabled: PropTypes.bool
}
CmsFormikCheckbox.defaultProps = {
    required: true
}

export default React.memo(CmsFormikCheckbox)