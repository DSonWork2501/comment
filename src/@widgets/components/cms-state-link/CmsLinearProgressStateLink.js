import React from 'react';
import {StateLink} from '@widgets/metadatas'
import {CmsLinearProgressWithLabel} from '@widgets/components'
import * as PropTypes from 'prop-types';

/**
 * @description Thể hiện tiến trình trạng thái link chương trình, trạng thái nhận từ db là số
 * @param {*} value string
 * @returns node
 * @example Chương trình A có stateLink = 1 
 * <CmsLinearProgressStateLink value=1 />
 */
function CmsLinearProgressStateLink(props){
    const {value} = props
    const obResult = Object.values(StateLink).find(item=>item.id === value)
    const progress = obResult ? ((obResult.progress / 3) * 100) : 0
    return (
        <div className="w-full">
            {
                obResult && <CmsLinearProgressWithLabel value={progress} className={obResult.className}/>
            }
        </div>
    )
}

CmsLinearProgressStateLink.propTypes = {
	value: PropTypes.number,
}

CmsLinearProgressStateLink.defaultProps = {
	value: 0
}

export default React.memo(CmsLinearProgressStateLink)