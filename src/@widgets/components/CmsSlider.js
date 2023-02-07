import * as React from 'react';
import { Box, Slider, Typography } from '@material-ui/core';
import * as PropTypes from 'prop-types';

function CmsSlider(props) {
    const { label, data, value, default_value } = props
    return (
        <Box sx={{ width: 250 }}>
            {label && <Typography id="track-inverted-slider" gutterBottom>
                {label}
            </Typography>}
            <Slider
                track="normal"
                aria-labelledby="track-slider"
                getAriaValueText={value}
                value={value}
                defaultValue={default_value}
                marks={data.map(x => ({ id: x.id, name: x.label }))}
            />
        </Box>
    );
}
CmsSlider.propTypes = {
    label: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.string
}

CmsSlider.defaultProps = {
    label: '',
    data: [],
    value: ''
}
export default CmsSlider