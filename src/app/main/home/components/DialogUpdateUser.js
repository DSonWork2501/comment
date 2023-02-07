import React, { useState, useEffect } from 'react'
import {
    CmsDialog,
    CmsSelect,
    CmsAlert,
    CmsTextField
} from '@widgets/components'
import * as PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {updateUserSimpleInfo} from '@widgets/store/userSlice'
import {colors} from '@material-ui/core'
import { logoutUser } from 'app/auth/store/userSlice';
import history from '@history'
import { useForm } from '@fuse/hooks'

function DialogUpdateUser(props) {
    const dispatch = useDispatch()
    const { open, handleClose } = props
    const user = useSelector(({ auth }) => auth.user.user)
    const { form, setForm, handleChange } = useForm(null)
    const [errors, setErrors] = useState({})
    const listDepartment = useSelector(({widgets})=>widgets.department.entities)
    const departments = listDepartment && listDepartment.length > 0 ? [{ id: 0, departmentName: "Chọn phòng", descr: ""}, ...listDepartment] : [{ id: 0, departmentName: "Chọn phòng", descr: ""}]
    
    useEffect(() => {
        if ((!form && user) || (form && form.id && user && user.id && form.id !== user.id)) {
            setForm(user)
        }
    }, [form, user, setForm])

    const handleError = (name, message) => () => {
        if (form[name] === "" || form[name] === 0){
            setErrors({ ...errors, [name]: message })
        }
    }
    const handleSave = () => {
        if (user) {
            CmsAlert.fire({
                text: "Bạn có chắc chắn muốn lưu?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: colors.green[500],
                cancelButtonColor: colors.red[500],
                confirmButtonText: "Đòng ý",
                cancelButtonText: "Hủy",
                heightAuto: false
            }).then(result => {
                if (result.isConfirmed) {
                    try {
                        let model = {
                            id: form.id,
                            fullName: form.fullName,
                            departmentID: form.departmentID,
                        }
                        dispatch(updateUserSimpleInfo(model))
                    } catch (error) {
                        console.error(error)
                    }
                }
            })
        }
    }

    const isDisabled = () => {
        return form && (!form.departmentID || form.departmentID === 0 || !form.fullName || form.fullName === "")
    }
    
    if(!form){
        return null
    }

    return (
        <CmsDialog
            title="Cập nhật thông tin"
            handleSave={handleSave}
            handleClose={handleClose}
            handleCalcel={()=>{
                dispatch(logoutUser())
                history.push("/login")
            }}
            open={open}
            disabledSave={isDisabled()}
            disableCloseOutSite={true}
        >
            <CmsTextField
                className="my-16"
                label="Họ và tên"
                name="fullName"
                value={form.fullName || ""}
                onChange={handleChange}
                onBlur={handleError("fullName", "Họ và tên không được trống")}
                helperText={errors.fullName || ""}
                required={true}
                error={errors.fullName && errors.fullName !== ""}

            />
            <CmsSelect
                data={departments ? departments.map(item => ({ id: item.id, name: item.departmentName })) : []}
                label="Phòng ban"
                name="departmentID"
                value={form.departmentID || 0}
                onChange={handleChange}
                onBlur={handleError("departmentID", "Họ và tên không được trống")}
                helperText={errors.departmentID || ""}
                required={true}
                error={errors.departmentID && errors.departmentID !== 0}
            />
        </CmsDialog>
    )
}

DialogUpdateUser.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
}

DialogUpdateUser.defaultProps = {
    open: false,
    handleClose: null
}

export default DialogUpdateUser