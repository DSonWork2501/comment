import React from 'react';
import { CmsTransferList } from '@widgets/components'
import PropTypes from 'prop-types'

function CmsFormikTransferList(props){
    const {name, formik, required, ...otherProps } = props
    return (
        <CmsTransferList 
            {...otherProps}
            name={name}
            required={required}
            value={formik.values[name] || ""}
            onChange={event => formik.setFieldValue(name, event)}
            onBlur={event => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}

CmsFormikTransferList.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool
}
CmsFormikTransferList.defaultProps = {
    required: true
}

export default React.memo(CmsFormikTransferList)