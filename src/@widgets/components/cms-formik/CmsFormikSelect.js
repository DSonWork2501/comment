import React from 'react';
import { CmsSelect } from '@widgets/components'
import PropTypes from 'prop-types'

function CmsFormikSelect(props) {
    const { name, formik, required, onChange, setOptionLabel, handleChange, isNotShowError, ...otherProps } = props
    return (
        <CmsSelect
            {...otherProps}
            name={name}
            required={required}
            value={typeof formik.values[name] === 'number' ? formik.values[name] : (formik.values[name] || "")}
            onChange={onChange ? onChange : (event) => {
                formik.setFieldValue(name, event.target.value);
                handleChange && handleChange(event.target.value);
            }}
            onBlur={event => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={isNotShowError ? '' : (formik.touched[name] && formik.errors[name])}
            setOptionLabel={setOptionLabel}
        />
    )
}

CmsFormikSelect.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    onChange: PropTypes.func
}
CmsFormikSelect.defaultProps = {
    required: true
}

export default React.memo(CmsFormikSelect)