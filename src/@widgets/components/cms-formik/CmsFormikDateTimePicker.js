import React from 'react';
import { CmsDateTimePicker } from '@widgets/components'
import PropTypes from 'prop-types'
import { ConvertSecondToTimeFormat } from '@widgets/functions/ConvertDateTime';
import { get } from 'lodash';

function CmsFormikDateTimePicker(props) {
    const { name, formik, onlyTime, handleChange, isSetValueOnChange, handleBlur, isNotShowError, ...otherProps } = props

    const value = onlyTime ? ConvertSecondToTimeFormat(get(formik.values, name)) : get(formik.values, name)

    const clearDate = () => {
        formik.setFieldValue(name, null)
    }

    return (
        <CmsDateTimePicker
            {...otherProps}
            name="planningTime"
            required={true}
            value={value || null}
            onChange={(date, strdate) => { isSetValueOnChange && formik.setFieldValue(name, date); handleChange && handleChange(date, name, strdate) }}
            onBlur={event => {
                !otherProps?.onlyMonthYear && formik.setFieldTouched(name, true);
                handleBlur && handleBlur(value)
            }}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={isNotShowError ? '' : (formik.touched[name] && formik.errors[name])}
            clearDate={clearDate}
        />
    )
}

CmsFormikDateTimePicker.propTypes = {
    name: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    onlyTime: PropTypes.bool,
    isSetValueOnChange: PropTypes.bool,
}

CmsFormikDateTimePicker.defaultProps = {
    required: true,
    format: "dd/MM/yyyy HH:mm:ss",
    onlyTime: false,
    isSetValueOnChange: true
}

export default React.memo(CmsFormikDateTimePicker)