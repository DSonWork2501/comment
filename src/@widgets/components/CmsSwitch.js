import React from 'react'
import * as PropTypes from 'prop-types';
import { Switch } from '@material-ui/core';
import { CmsLabel } from '.';

function CmsSwitch(props) {
  const { label, disabled, labelClass, ...otheProps } = props
  var configForm = { disabled }
  return (
    <div className="flex flex-row items-center">
      <Switch {...configForm} {...otheProps} />
      {label && <CmsLabel className={labelClass} content={label} />}
    </div>
  );
}
CmsSwitch.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

CmsSwitch.defaultProps = {
  disabled: false,
  label: ''
}
export default CmsSwitch