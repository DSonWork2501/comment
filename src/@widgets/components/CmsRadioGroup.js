import React from 'react'
import {
    Typography,
    FormControl,
    RadioGroup,
    Hidden
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CmsRadio } from '@widgets/components'

/**
 * @description Định nghĩa css
 */
const useStyles = makeStyles(theme => ({
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
    }
}));

/**
 * 
 * @description Component Group Radio
 */
function CmsRadioGroup(props) {
    const classes = useStyles(props);
    const {
        label,
        data,
        className,
        vertical,
        onChange,
        error,
        helperText,
        name,
        required,
        setLabel,
        ...otherProps
    } = props;

    const handleChange = event => {
        if (event.target.name === name) {
            if (!onChange) return
            onChange(event.target.value)
        }
    }

    const selectOption = (item) => setLabel
        ? setLabel(item)
        : item.name

    return (
        <div className={clsx(classes.formGroup, className, error && "border-red")} style={otherProps?.style || {}}>
            {label && <Typography className={classes.formGroupTitle} color={error ? "error" : "primary"}>{required ? `${label} *` : label}</Typography>}
            <FormControl component="fieldset" className={clsx(classes.formControl, otherProps?.fieldsetclass)}>
                <RadioGroup className="my-1"
                    {...otherProps}
                    onChange={handleChange}
                >
                    <Hidden mdDown>
                        {!vertical && (
                            <div className="md:flex">
                                {data.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <CmsRadio name={name} label={selectOption(item)} value={item.id} disabled={item.disabled} {...item.props} />
                                        {item.children}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        {vertical && (
                            data.map((item, index) => (
                                <React.Fragment key={index}>
                                    <CmsRadio name={name} label={selectOption(item)} value={item.id} disabled={item.disabled} {...item.props} />
                                    {item.children}
                                </React.Fragment>
                            ))
                        )}
                    </Hidden>
                    <Hidden lgUp>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <CmsRadio name={name} label={selectOption(item)} value={item.id} disabled={item.disabled} {...item.props} />
                                {item.children}
                            </React.Fragment>
                        ))}
                    </Hidden>
                </RadioGroup>
            </FormControl>
            {helperText && <Typography className="ml-16" variant="caption" component="p" color={error ? "error" : "primary"}>{helperText}</Typography>}
        </div>
    )
}

CmsRadioGroup.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    className: PropTypes.string,
    vertical: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.any,
    required: PropTypes.bool
}

CmsRadioGroup.defaultProps = {
    label: "",
    data: [],
    vertical: true,
    required: false
}

export default React.memo(CmsRadioGroup)
