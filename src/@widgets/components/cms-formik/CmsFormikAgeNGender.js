import React, { useEffect } from 'react';
import { CmsDialog, CmsFormikSelect, CmsIconButton, CmsLabel } from '@widgets/components'
import PropTypes from 'prop-types'
import { Chip, FormControl, makeStyles, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { age, gender} from '@widgets/metadatas'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
    formGroup: {
        position: 'relative',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 2,
        padding: '12px 12px 0 12px',
        margin: '24px 0 16px 0'
    },
    formGroupTitle: {
        position: 'absolute',
        top: -10,
        left: 8,
        padding: '0 4px',
        backgroundColor: theme.palette.background.paper
    },
    formControl: {
        margin: '6px 0',
        width: '100%',
        '&:last-child': {
            marginBottom: '6px'
        }
    },
    root: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
      },
    chip: {
        margin: theme.spacing(0.5),
    }
  }));
  const GetNameByID = (id, data) => {
    return id && data.find(i=> i.id === id) && data.find(i=> i.id === id).name ? data.find(i=> i.id === id).name : id
}
function CmsFormikAgeNGender(props){
    const classes = useStyles();
    const {name, className, formik, error, disabled, ...otherProps } = props
    const [chipData, setChipData] = React.useState([]);
    const [errorAlert, setErrorAlert] = React.useState(null);
    const [isOpenAddDialog, setIsOpenAddDialog] = React.useState(false);

    //input
    useEffect(()=>{
        if(formik.values && formik.values[name] && Array.isArray(formik.values[name])){
            setChipData( formik.values[name].length !== 0 
                ? formik.values[name].map(x=>({
                    id: x, 
                    gender: x.split(':')[0], 
                    age: x.split(':')[1], 
                    name: `${GetNameByID(x.split(':')[0], gender)}:${x.split(':')[1]}`}))
                : [])
        }
    },[formik.values, name])

    const handleDelete = (id) => () => {
        formik.setFieldValue(name, formik.values[name].filter(x=>x !== id))
      };

    const handleSubmitForm = (values) => {
        if(chipData.filter(x=>x.gender === values.gender && x.age === values.age).length > 0){
            setErrorAlert({classes:'text-red-900 bg-red-50 p-4', content:'giới tính - độ tuổi đã tồn tại!'})
            setIsOpenAddDialog(true)
        }
        else{
            setErrorAlert(null)
            // setIsOpenAddDialog(false)
            formik.setFieldValue(name, [...chipData.map(x=>(x.id)), `${values.gender}:${values.age}`])
        }
    }

    const formikAgeNGender = useFormik({
        initialValues: {age: '', gender: ''},
        onSubmit: handleSubmitForm,
        validationSchema: Yup.object({
            gender: Yup.string().nullable(false).required("Giới tính không được bỏ trống"),
            age: Yup.string().nullable(false).required("Độ tuổi không được bỏ trống")
        })
    })
    // // console.log('formikAgeNGender', formikAgeNGender)
    
    return (
        <div className={clsx(classes.formGroup, className, error && "border-red")}>
            <Typography className={classes.formGroupTitle} color={error ? "error" : "primary"}>Giới tính - độ tuổi</Typography>
            <FormControl component="fieldset" className={classes.formControl}>
                <Paper component="ul" className={clsx(classes.root, 'w-full items-center space-x-4')}>
                    {chipData.length === 0 ? 
                        <CmsLabel content="Không có dữ liệu" color="error"/> :
                        chipData.map(data => {
                            return (
                            <li key={data.id}>
                            {disabled ? <Chip {...otherProps} label={data.name} className={classes.chip} />
                            : <Chip {...otherProps} label={data.name} onDelete={handleDelete(data.id)} className={classes.chip} />}            
                                
                            </li>
                        );
                    })}
                    {!disabled && (<CmsIconButton size="small" tooltip="Thêm mới giới tính - độ tuổi" onClick={()=>setIsOpenAddDialog(true)} delay={50} icon="add" className="bg-green-500 text-white shadow-3  hover:bg-green-900"/>)}
                </Paper>
            </FormControl>
            <CmsDialog
                title="Thêm mới giới tính - độ tuổi"
                open={isOpenAddDialog}
                handleSave={formikAgeNGender.handleSubmit}
                handleClose={()=>setIsOpenAddDialog(false)}
                isCloseDialogSubmit={false}
                disabledSave={!(formikAgeNGender.dirty && formikAgeNGender.isValid)}
            >
                <div className="w-full flex space-x-4 my-4">
                    <CmsFormikSelect
                        label= "Giới tính"
                        name="gender"
                        data={gender}
                        formik={formikAgeNGender}
                    />
                    <CmsFormikSelect
                        label= "Độ tuổi"
                        name="age"
                        data={age}
                        formik={formikAgeNGender}
                    />
                </div>
                {errorAlert && (
                    <CmsLabel content={errorAlert.content} className={clsx(errorAlert.classes,"text-red-900 bg-red-50 p-8")}/>
                )}
            </CmsDialog>
        </div>
        
    )
}

CmsFormikAgeNGender.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    // value: PropTypes.any.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool,
    formik: PropTypes.any
}
CmsFormikAgeNGender.defaultProps = {
    required: true,
    disabled: false
}

export default React.memo(CmsFormikAgeNGender)