import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import * as PropTypes from 'prop-types';
import { Box, CircularProgress } from '@material-ui/core';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
/**
 * 
 * @description Component CmsAutocomplete
 */
function CmsAutocomplete(props) {
    const {
        data,
        value,
        onChange,
        multiple,
        onBlur,
        label,
        className,
        required,
        disabled,
        loading,
        onKeyPress,
        autocompleteProps = {},
        setOption,
        name,
        valueIsId,
        ...textFieldProps
    } = props;
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        setOptions(loading ? [] : data)
    }, [data, loading])

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...data]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, data]);

    return (
        <React.Fragment>
            {multiple && (<Autocomplete
                fullWidth
                value={value}
                className={className}
                multiple
                options={options}
                onKeyPress={onKeyPress}
                onChange={onChange}
                disabled={disabled}
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option?.name || ''}
                getOptionDisabled={(option) => option.disabled}
                filterSelectedOptions
                freeSolo
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...textFieldProps}
                        label={required ? `${label} *` : label}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <div>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </div>
                            ),
                        }}
                    />
                )}
                {...autocompleteProps}
            />)}
            {!multiple && (<Autocomplete
                options={data}
                getOptionLabel={(option) => option?.name || ''}
                fullWidth
                value={value}
                className={className}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                groupBy={(option) => option.group}
                getOptionSelected={(option, value) => option.id === value.id}
                onKeyPress={onKeyPress}
                loading={loading}
                renderOption={(option, props) =>
                    <Box className="w-full" component="div" style={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                        <div className="flex justify-between items-center space-x-4">
                            <div className="flex justify-start">
                                {setOption ? setOption(option) : option.name}
                            </div>
                            <div className="flex justify-end">
                                {option.image &&
                                    <img
                                        loading="lazy"
                                        width="100"
                                        src={`${option.image}`}
                                        srcSet={`${option.image} 2x`}
                                        alt=""
                                    />
                                }
                            </div>
                        </div>
                    </Box>
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...textFieldProps}
                        label={required ? `${label} *` : label}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <div>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </div>
                            ),
                        }}
                    />
                )}
                {...autocompleteProps}
            />)}
        </React.Fragment>
    )
}

CmsAutocomplete.propTypes = {
    data: PropTypes.array.isRequired,
    value: PropTypes.any,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.any,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onKeyPress: PropTypes.func
}

CmsAutocomplete.defaultProps = {
    data: [],
    value: null,
    onChange: null,
    onBlur: null,
    required: false,
    className: "",
    disabled: false,
    loading: false,
    onKeyPress: null
}

export default React.memo(CmsAutocomplete)
