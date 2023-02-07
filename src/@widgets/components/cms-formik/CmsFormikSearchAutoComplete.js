import React, { useEffect, useState } from 'react';
import { CmsFormikAutocomplete } from "@widgets/components"
import PropTypes from 'prop-types'
import { get } from 'lodash-es';

/**
 * @description component select chip autocomplete 
 * @author vinhtq24
 * @param {*} props 
 * @returns 
 */
function CmsFormikSearchAutoComplete(props) {
    const { required, formik, label, name, disabled, onKeyPress, loading, data, error, helperText, multiple, valueIsId, ...otherProps } = props
    const [timer, setTimer] = useState()
    const [itemData, setItemData] = useState(null)
    useEffect(() => {
        if (Array.isArray(data)) {
            const array = multiple ? data?.filter(x => !get(formik.values, name)?.map(x => (x.id)).includes(x.id))
                : data
            setItemData(array)
        }
    }, [data, formik.values, name, multiple])

    const handleKeyPress = (value) => {
        if (value) {
            clearTimeout(timer);  //clear any running timeout on key up
            setTimer(setTimeout(function () { //then give it a second to see if the user is finished
                //do .post ajax request //then do the ajax call
                onKeyPress && onKeyPress(value, data, setItemData)
            }, 700))
        }
    }
    const filtered_array = !itemData || itemData.length <= 0 ? [{ id: 'nhập ít nhất 3 từ', name: 'nhập ít nhất 3 từ...', disabled: true }] : itemData
    return (
        <CmsFormikAutocomplete
            valueIsId={valueIsId}
            onKeyPress={(e) => { handleKeyPress(e.target.value) }}
            loading={loading}
            multiple={multiple}
            required={required}
            formik={formik}
            name={name}
            label={label}
            data={filtered_array}
            disabled={disabled}
            onBlur={event => formik.setFieldTouched(name, true)}
            error={error ? error : (formik.touched[name] && Boolean(formik.errors[name]))}
            helperText={helperText ? helperText : (formik.touched[name] && formik.errors[name])}
            {...otherProps}
        />
    )
}
CmsFormikSearchAutoComplete.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.any.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    onKeyPress: PropTypes.func,
    loading: PropTypes.bool,
    valueIsId: PropTypes.bool
}
CmsFormikSearchAutoComplete.defaultProps = {
    required: true,
    disabled: false,
    error: false,
    helperText: "",
    value: null,
    onChange: null,
    onKeyPress: null,
    loading: null,
    valueIsId: false
}

export default React.memo(CmsFormikSearchAutoComplete)