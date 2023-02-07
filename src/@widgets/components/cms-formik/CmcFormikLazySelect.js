import { Box, FormHelperText, InputLabel, ListItem, styled } from '@material-ui/core';
import { debounce, get, isArray } from 'lodash';
import { useCallback, useState } from 'react';
import Select from 'react-select';
import React from 'react';
import './style.scss';

const BoxCustom = styled(Box)({
    "& #react-select-3-listbox": {
        zIndex: 9
    }
});

const filterOptions = (options) => {
    return true;
};

const CustomOptionComponent = ({ innerProps, innerRef, children, options, value, onGetMore, totalRows, isGetMore }) => {
    return <>
        {value === options[0]?.id && isGetMore
            ? <>
                <Box
                    className='count-row'
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: 35,
                        textAlign: 'center',
                        lineHeight: '35px',
                        background: 'white',
                        color: '#1976d2',
                        borderRadius: '4px',
                        zIndex: 9
                    }}
                >
                    Load {options.length} of {totalRows}
                </Box>
                <Box
                    sx={{
                        height: 35
                    }}
                >
                </Box>
            </>
            : null
        }
        <ListItem
            button
            ref={innerRef}
            {...innerProps}
            style={{
                zIndex: 9
            }}
        >
            {children}
        </ListItem>
    </>
}

function CmcFormikLazySelect({ lazyLoading, formik, name = "default", multiple = false, label = "Select something", options = [], onSearch, debounceTime = 0, onChange, onGetMore, totalRows, valueOption, ...props }) {
    const [inputValue, setInputValue] = useState('');
    const keyValueOption = valueOption ? valueOption : 'id';
    const valueForm = get(formik.values, name);

    const handleInputChange = async (inputValue, { action }) => {
        if (action === 'input-change') {
            callDebounce(inputValue);
        }

        if (action !== 'set-value') {
            setInputValue(inputValue);
        }
    }

    const callDebounce = useCallback(
        debounce((inputValue, setLoading) => {
            onSearch && onSearch(inputValue, setLoading);
        }, debounceTime),
        [onSearch]
    );

    const getValue = (values) => {
        if (multiple) {
            if (!values)
                values = [];
            return options.filter(value => {
                if (!isArray(values)) {
                    values = JSON.parse(values);
                }
                return values.includes(typeof value === 'object' ? value[keyValueOption] : value);
            })
        } else {
            let value = options.find((option) => values === (typeof option === 'object' ? option[keyValueOption] : option));
            return typeof value !== 'undefined' ? value : null
        }
    }

    const handleChange = (newValue) => {
        let data;
        if (multiple) {
            data = newValue.map((value) => (typeof value === 'string' ? value : value[keyValueOption]));
        } else {
            data = (newValue !== null) ? (typeof newValue === 'string' ? newValue : newValue[keyValueOption]) : null;
        }
        formik.setFieldValue(name, data);
        onChange && onChange(data, newValue);
    }

    const handleGetMore = () => {
        onGetMore && onGetMore(inputValue);
    }

    return <BoxCustom className='CmcFormikLazySelect w-full'>
        {valueForm
            &&
            <InputLabel>
                {label}
            </InputLabel>
        }
        <Select
            instanceId={3}
            isMulti={multiple}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            placeholder={label}
            filterOption={filterOptions}
            value={(() => getValue(valueForm))()}
            onChange={(event, newValue) => { handleChange(event) }}
            components={{
                Option: (params) => <CustomOptionComponent
                    {...params}
                    onGetMore={() => handleGetMore()}
                    isGetMore={onGetMore}
                    totalRows={totalRows || 0}
                />,
            }}
            isLoading={lazyLoading}
            className={`react-select ${props.classes ? props.classes : ''} ${(get(formik.touched, name) && Boolean(get(formik.errors, name))) ? 'error' : ''}`}
            {...props}
        />
        {(get(formik.touched, name) && Boolean(get(formik.errors, name))) &&
            <FormHelperText
                style={{
                    color: '#f44336'
                }}
                className='mx-16'
            >
                {get(formik.errors, name)}
            </FormHelperText>
        }
    </BoxCustom>
}

export default CmcFormikLazySelect