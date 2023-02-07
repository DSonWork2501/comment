import React, { useEffect, useState } from 'react'
import { TextField, InputAdornment, Divider, makeStyles, Typography, FormControl, Tooltip } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import CmsLabel from './CmsLabel';
import clsx from 'clsx';

/**
 * @description Định nghĩa css
 */
const useStyles = makeStyles(theme => ({
    formGroup: {
        position: 'relative',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 2,
        padding: '8px 12px 0 12px',
        margin: '24px 0 16px 0'
    },
    formGroupTitle: {
        fontSize: '1.2rem',
        position: 'absolute',
        top: -10,
        left: 8,
        padding: '0 4px',
        backgroundColor: theme.palette.background.paper
    },
    formControl: {
        // margin: '6px 0',
        width: '100%',
        '&:last-child': {
            marginBottom: '6px'
        }
    }
}));

/**
 * 
 * @description Component TextField
 */
function CmsDuration(props) {
    const classes = useStyles(props);
    const {
        onChange,
        value,
        startText,
        endText,
        startNode,
        endNode,
        isSearch,
        disabled,
        readOnly,
        label,
        variant,
        className,
        error,
        isSeconds,
        tooltip,
        ...otherProps
    } = props;
    /**
     * @description chuyển số phút sang dạng HH:MM
     */
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const timeType = {
        hours: 'hours',
        minutes: 'minutes'
    }

    useEffect(() => {
        if (value) {
            setHours(Math.floor((parseInt(value) || 0) / 60))
            setMinutes(Math.floor((parseInt(value) || 0) % 60))
        } else {
            setHours(0)
            setMinutes(0)
        }
    }, [value])
    const handleChangeValue = (e, type) => {
        let nums = e.target.value && parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0
        onChange(type === timeType.hours ? Math.floor(nums * 60 + minutes) : Math.floor(hours * 60 + nums))
    }
    return (
        <div className={clsx(classes.formGroup, className, error && "border-red")}>
            <Typography className={classes.formGroupTitle} color={error ? "error" : "primary"}>{label}</Typography>
            <FormControl component="fieldset" className={classes.formControl}>
                {disabled ?
                    (<div className="flex space-x-4 items-center">
                        <Tooltip title={tooltip}>
                            <TextField
                                {...otherProps}
                                fullWidth
                                variant={variant}
                                value={hours}
                                type="number"
                                onChange={(e) => handleChangeValue(e, timeType.hours)}
                                style={{ minWidth: '100px' }}
                                InputProps={{
                                    inputProps: { min: -1, max: 99 },
                                    startAdornment: (startText || startNode) && (
                                        <div className="flex items-center">
                                            {startNode && <React.Fragment>{startNode}<Divider className="h-40 mx-8" orientation="vertical" /></React.Fragment>}
                                            {startText && <InputAdornment position="start">{startText}</InputAdornment>}
                                        </div>),
                                    endAdornment:
                                        (<div className="flex items-center">
                                            <InputAdornment position="end">giờ</InputAdornment>
                                            {endNode && <React.Fragment><Divider className="h-40 mx-8" orientation="vertical" />{endNode}</React.Fragment>}
                                        </div>),
                                    readOnly: readOnly
                                }}
                                disabled
                            />
                        </Tooltip>
                        <CmsLabel content=":" />
                        <Tooltip title={tooltip}>
                            <TextField
                                {...otherProps}
                                fullWidth
                                value={minutes}
                                variant={variant}
                                type="number"
                                onChange={(e) => handleChangeValue(e, timeType.minutes)}
                                style={{ minWidth: '100px' }}
                                InputProps={{
                                    startAdornment: (startText || startNode) && (
                                        <div className="flex items-center">
                                            {startNode && <React.Fragment>{startNode}<Divider className="h-40 mx-8" orientation="vertical" /></React.Fragment>}
                                            {startText && <InputAdornment position="start">{startText}</InputAdornment>}
                                        </div>),
                                    endAdornment: (
                                        <div className="flex items-center">
                                            <InputAdornment position="end">Phút</InputAdornment>
                                            {endNode && <React.Fragment><Divider className="h-40 mx-8" orientation="vertical" />{endNode}</React.Fragment>}
                                        </div>),
                                    readOnly: readOnly
                                }}
                                disabled
                            />
                        </Tooltip>
                    </div>)
                    : (<div className="flex space-x-4 items-center">
                        <TextField
                            {...otherProps}
                            fullWidth
                            variant={variant}
                            value={hours}
                            type="number"
                            onChange={(e) => handleChangeValue(e, timeType.hours)}
                            style={{ minWidth: '100px' }}
                            InputProps={{
                                inputProps: { min: -1, max: 99 },
                                startAdornment: (startText || startNode) && (
                                    <div className="flex items-center">
                                        {startNode && <React.Fragment>{startNode}<Divider className="h-40 mx-8" orientation="vertical" /></React.Fragment>}
                                        {startText && <InputAdornment position="start">{startText}</InputAdornment>}
                                    </div>),
                                endAdornment:
                                    (<div className="flex items-center">
                                        <InputAdornment position="end">giờ</InputAdornment>
                                        {endNode && <React.Fragment><Divider className="h-40 mx-8" orientation="vertical" />{endNode}</React.Fragment>}
                                    </div>),
                                readOnly: readOnly
                            }}
                        />
                        <CmsLabel content=":" />
                        <TextField
                            {...otherProps}
                            fullWidth
                            value={minutes}
                            variant={variant}
                            type="number"
                            onChange={(e) => handleChangeValue(e, timeType.minutes)}
                            style={{ minWidth: '100px' }}
                            InputProps={{
                                startAdornment: (startText || startNode) && (
                                    <div className="flex items-center">
                                        {startNode && <React.Fragment>{startNode}<Divider className="h-40 mx-8 min-w-52" orientation="vertical" /></React.Fragment>}
                                        {startText && <InputAdornment position="start">{startText}</InputAdornment>}
                                    </div>),
                                endAdornment: (
                                    <div className="flex items-center">
                                        <InputAdornment position="end">Phút</InputAdornment>
                                        {endNode && <React.Fragment><Divider className="h-40 mx-8" orientation="vertical" />{endNode}</React.Fragment>}
                                    </div>),
                                readOnly: readOnly
                            }}
                        />
                    </div>)}
            </FormControl>
        </div>

    )
}

CmsDuration.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    startText: PropTypes.string,
    endText: PropTypes.string,
    startNode: PropTypes.node,
    endNode: PropTypes.node,
    isSearch: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onClick: PropTypes.func,
    error: PropTypes.bool,
    helperText: PropTypes.any,
    variant: PropTypes.oneOf([
        'outlined',
        'filled',
        'standard'
    ]),
    hours: PropTypes.number,
    minutes: PropTypes.number,
    isSeconds: PropTypes.bool,
    tooltip: PropTypes.any,
}

CmsDuration.defaultProps = {
    startText: null,
    endText: null,
    startNode: null,
    endNode: null,
    isSearch: false,
    multiline: false,
    rows: 3,
    disabled: false,
    readOnly: false,
    variant: 'outlined',
    label: 'Thời lượng',
    tooltip: null
}

export default React.memo(CmsDuration)
