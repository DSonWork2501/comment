import React from 'react';
import { Chip } from '@material-ui/core'
import {BitBand} from '@widgets/metadatas'
import clsx from 'clsx'
import * as PropTypes from 'prop-types';

/**
 * @description Thể hiện mô tả chương trình sẽ được play trên hệ thông nào, playOnSystem nhận từ db là chuỗi nhị phân
 * @param {*} value string
 * @returns node
 * @example Chương trình A có field playOnSystem = "00100000" => Play FBOX <ChipPlayOnSystem value="00100000" />
 */
function CmsChipPlayOnSystem(props){
    const {value} = props
    const system = Object.values(BitBand).find(item=>item.id === value)
    return (
        <React.Fragment>
            {
                system 
                    ? <Chip size="small" label={system.name} className={clsx(system.className, "text-white")}/>
                    : <Chip size="small" label={value} color="default"/>
            }
        </React.Fragment>
    )
}

CmsChipPlayOnSystem.propTypes = {
	value: PropTypes.string,
}

CmsChipPlayOnSystem.defaultProps = {
	value: ""
}

export default React.memo(CmsChipPlayOnSystem)