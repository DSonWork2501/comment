import React from 'react';
import { CmsSwitch } from '@widgets/components'
import PropTypes from 'prop-types'
import { get } from 'lodash';

function CmsFormikSwitch(props){
    const {name, formik, disabled, ...otherProps } = props
    const ouputValue = (value) => {
        return typeof get(formik.values,name) ==='number' ? value.target.checked === true ? 1 : 0
            : value.target.checked === true ? '1' : '0'
    }
    return (
        <CmsSwitch
            {...otherProps}
            name={name}
            checked={get(formik.values,name) === '1' || (!isNaN(parseInt(get(formik.values,name))) && parseInt(get(formik.values,name)) === 1) ? true : false }
            onChange={value => formik.setFieldValue(name, ouputValue(value) )}
            onBlur={() => formik.setFieldTouched(name, true)}
            // error={get(formik.touched,name) && Boolean(get(formik.errors,name))}
            disabled={disabled}
        />
    )
}

CmsFormikSwitch.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    formik: PropTypes.any.isRequired,
    disabled: PropTypes.bool
}
CmsFormikSwitch.defaultProps = {
    required: true
}

export default React.memo(CmsFormikSwitch)