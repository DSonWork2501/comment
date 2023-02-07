import React from 'react';
import { CmsChipSelect } from '@widgets/components'
import PropTypes from 'prop-types'

function CmsFormikChipSelect(props){
    const {name, formik, ...otherProps } = props
    return (
        <CmsChipSelect
            {...otherProps}
            name={name}
            value={formik.values[name] || []}
            onChange={value => formik.setFieldValue(name, value)}
            onBlur={() => formik.setFieldTouched(name, true)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}

CmsFormikChipSelect.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool
}
CmsFormikChipSelect.defaultProps = {
    required: true
}

export default React.memo(CmsFormikChipSelect)