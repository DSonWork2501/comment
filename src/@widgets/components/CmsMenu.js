import React from 'react'
import {
    Icon,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from '@material-ui/core'
import * as PropTypes from 'prop-types';

/**
 * 
 * @description Component Menu
 */
function CmsMenu(props) {
    const { id, anchorEl, onClose, data } = props;
    let menuProps = {}
    if(id){
        menuProps={...menuProps, id}
    }

    return (
        <Menu
            {...menuProps}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}
        >
            {data.map((item, index)=>(
                <MenuItem
                    key={index} 
                    onClick={()=>{
                        if(item.onClick){
                            item.onClick()
                        }
                        onClose()
                    }}
                >
                {(item.icon && item.tooltip) ?
                    <Tooltip title={item.tooltip}>
                        <Typography className="flex items-center" color="primary">
                            <Icon className="text-20 mr-12">{item.icon}</Icon>
                            {item.name}
                        </Typography>
                    </Tooltip>
                : item.icon ?
                <Typography className="flex items-center" color="primary">
                        <Icon className="text-20 mr-12">{item.icon}</Icon>
                        {item.name}
                </Typography> 
                : <Typography className="flex items-center" color="primary">
                        {item.name}
                </Typography>}
                </MenuItem>
            ))}
        </Menu>
    )
}

CmsMenu.propTypes = {
    id: PropTypes.string,
    anchorEl: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
}

CmsMenu.defaultProps = {
    anchorEl: null,
    onClose: null,
    data: []
}

export default React.memo(CmsMenu)
