import React from 'react'
import {
    Typography,
    FormControl,
    FormGroup,
    Hidden
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CmsCheckbox } from '@widgets/components'

/**
 * @description Định nghĩa css
 */
const useStyles = makeStyles(theme => ({
    formGroupTitle: {
        position: 'absolute',
        top: -10,
        left: 8,
        padding: '0 4px',
        backgroundColor: theme.palette.background.paper
    },
    formGroup: {
        position: 'relative',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 2,
        padding: '12px 12px 0 12px',
        margin: '24px 0 16px 0'
    },
    formControl: {
        margin: '6px 0',
        width: '100%',
        '&:last-child': {
            marginBottom: '6px'
        }
    }
}));

/**
 * 
 * @description Component Group Checkbox
 */
function CmsCheckboxGroup(props) {
    const classes = useStyles(props);
    const { 
        label, 
        data, 
        className, 
        vertical, 
        value, 
        onChange, 
        error,
        helperText,
        name,
        required,
        ...otherProps
    } = props
    
    const listData = data.map(item=>({...item, id: `${item.id}`}))
    const isChecked = id => {
        return [...value].includes(id)
    }

    const handleChange = event => {
        if(event.target.name === name){
            if (!onChange) return
            let listChecked = [...value].map(item=>item + "")
            if (event.target.checked) {
                listChecked = [...listChecked, event.target.value]
            } else {
                listChecked = [...listChecked].filter(item => item !== event.target.value)
            }
            let listResult = listData.filter(item => listChecked.includes(item.id)).map(item => item.id)
            onChange(listResult)
        }
    }

    return (
        <div className={clsx(classes.formGroup, className, error && "border-red")}>
            <Typography className={classes.formGroupTitle} color={error ? "error" : "primary"}>{required ? `${label} *` : label}</Typography>
            <FormControl component="fieldset" className={classes.formControl} >
                <FormGroup onChange={handleChange} value={value} {...otherProps}>
                    <Hidden mdDown>
                        {!vertical && (
                            <div className="flex flex-wrap">
                                {listData.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <CmsCheckbox name={name} label={item.name} value={item.id} checked={isChecked(item.id)} disabled={item.disabled}/>
                                        {item.children}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        {vertical && (
                            listData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <CmsCheckbox name={name} label={item.name} value={item.id} checked={isChecked(item.id)} disabled={item.disabled}/>
                                    {item.children}
                                </React.Fragment>
                            ))
                        )}
                    </Hidden>
                    <Hidden lgUp>
                        {listData.map((item, index) => (
                            <React.Fragment key={index}>
                                <CmsCheckbox name={name} label={item.name} value={item.id} checked={isChecked(item.id)} disabled={item.disabled}/>
                                {item.children}
                            </React.Fragment>
                        ))}
                    </Hidden>
                </FormGroup>
            </FormControl>
            {helperText && <Typography className="ml-16" variant="caption" component="p" color={error ? "error" : "primary"}>{helperText}</Typography>}
        </div>
    )
}

CmsCheckboxGroup.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.array,
    data: PropTypes.array,
    className: PropTypes.string,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.any,
    required: PropTypes.bool
}

CmsCheckboxGroup.defaultProps = {
    label: "",
    value: [],
    data: [],
    className: "",
    vertical: true,
    onChange: null,
    error: false,
    helperText: null,
    required: false
}

export default React.memo(CmsCheckboxGroup)
