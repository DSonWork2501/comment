import React from 'react'

const CmsFormikDate = ({ formik, name, ...props }) => {

    return <CmsDateField label="Thời gian Từ:"
        onlyDate={true}
        value={search.fromDate}
        onChange={event => (setSearch({ ...search, fromDate: event.target.value }))}
        {...props} />

        // <CmsDateTimePicker
        // {...otherProps}
        // name="planningTime" 
        // required={true}
        // value={formik.values[name] || null}
        // onChange={(date, strdate) => {formik.setFieldValue(name, date)}}
        // onBlur={event=>formik.setFieldTouched(name, true)}
        // error={formik.touched[name] && Boolean(formik.errors[name])}
        // helperText={formik.touched[name] && formik.errors[name]}
        // />
}

export default CmsFormikDate