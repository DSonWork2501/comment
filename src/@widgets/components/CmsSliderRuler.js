import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Slider, withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const CustomSlider = withStyles({
  root: {
    // color: '#52af77',
    color: '#0260be',
    height: 8,
    '&$vertical': {
      width: 8
    }
  },
  mark: {
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover': {
      boxShadow: '0px 0px 0px 8px rgba(84, 199, 97, 0.16)'
    },
    '&$active': {
      boxShadow: '0px 0px 0px 12px rgba(84, 199, 97, 0.16)'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  },
  vertical: {
    '& $rail': {
      width: 8
    },
    '& $track': {
      width: 8
    },
    '& $thumb': {
      marginLeft: 0,
      marginBottom: -11
    }
  }
})(Slider)

function valuetext(value, suffix) {
  return `${value}${suffix}`;
}

function CmsSliderRuler(props) {
  const { value, suffix, onChange, ruler, title, step } = props
  const [item, setItem] = useState(0)
  const one_percent = ruler * 1 / 100

  const marks = useMemo(() => {
    let arr = []
    let a = ruler / 20
    for (let index = 0; index <= 20; index++) {
      let label = a * index
      let value = 5 * index
      arr.push({ value: value, label: label })
    }
    return arr
  }, [ruler])

  useEffect(() => {
    setItem(value / one_percent)
  }, [value, one_percent])

  // // console.log(array)
  const handleChange = (event, newValue) => {
    setItem(newValue)
  }

  const onChangeCommitted = (event, newValue) => {
    onChange && onChange(event, newValue * one_percent)
  }

  return (
    <div>
      <Typography id="track-inverted-slider" gutterBottom>
        {title}
      </Typography>
      <CustomSlider
        size="small"
        track="normal"
        // ValueLabelComponent={ValueLabelComponent}
        // aria-labelledby="track-inverted-slider"
        onChangeCommitted={(event, newValue) => onChangeCommitted(event, newValue)}
        onChange={(event, newValue) => handleChange(event, newValue)}
        getAriaValueText={(value) => valuetext(value, suffix)}
        valueLabelFormat={(value) => Math.ceil(value * one_percent)}
        valueLabelDisplay="on"
        // defaultValue={}
        value={item}
        marks={marks}
        step={step || 0.01}
      />
    </div>
  );
}

CmsSliderRuler.propTypes = {
  value: PropTypes.number,
  suffix: PropTypes.string,
  title: PropTypes.string,
  ruler: PropTypes.number
}

CmsSliderRuler.defaultProps = {
  value: 0,
  suffix: '',
  title: '',
  ruler: 0
}

export default CmsSliderRuler