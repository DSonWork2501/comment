import React from 'react';
import { CmsButtonGroup } from '@widgets/components'
import PropTypes from 'prop-types'

function CmsFormikButtonGroup(props){
    const {name, formik, onChange, ...otherProps } = props
    return (
        <CmsButtonGroup
            {...otherProps}
            name={name}
            value={formik.values[name] || ""}
            onChange={onChange ? onChange : (event, value) => formik.setFieldValue(name, value)}
            onBlur={() => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}

CmsFormikButtonGroup.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    onChange: PropTypes.func
}

export default React.memo(CmsFormikButtonGroup)