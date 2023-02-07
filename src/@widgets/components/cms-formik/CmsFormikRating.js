import React from 'react';
import { CmsRating } from '@widgets/components'
import PropTypes from 'prop-types'

function CmsFormikRating(props){
    const {name, formik,...otherProps } = props
    return (
        <CmsRating
            {...otherProps}
            name={name}
            value={parseFloat(formik.values[name]) || 0}
            onChange={(event, value) => formik.setFieldValue(name, value)}
            onBlur={event => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}

CmsFormikRating.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    max: PropTypes.number
    
}
CmsFormikRating.defaultProps = {
    required: true,
    max: 5
}

export default React.memo(CmsFormikRating)