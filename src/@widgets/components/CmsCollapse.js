import React from 'react'
import { Collapse } from '@material-ui/core'
import * as PropTypes from 'prop-types';

/**
 * 
 * @description Component Collapse
 */
function CmsCollapse(props) {
    const { open } = props;
    return (
        <Collapse collapsedHeight="auto" in={open} timeout="auto" unmountOnExit>
			{props.children}
		</Collapse>
    )
}

CmsCollapse.propTypes = {
    open: PropTypes.bool.isRequired,
}

CmsCollapse.defaultProps = {
    open: false
}

export default React.memo(CmsCollapse)
