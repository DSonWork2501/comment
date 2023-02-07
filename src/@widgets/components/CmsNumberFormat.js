import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

/**
 * 
 * @description Component Format number
 */
function CmsNumberFormat(props) {
    const { suffix, prefix, inputRef, onChange, ...otherProps } = props;

    return (
        <NumberFormat
            {...otherProps}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix={prefix || ""}
            suffix={suffix || ""}
        />
    );
}

CmsNumberFormat.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    suffix: PropTypes.string,
    prefix: PropTypes.string
};

export default React.memo(CmsNumberFormat)
