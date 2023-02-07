import React from 'react';
import {StateArticle} from '@widgets/metadatas'
import {CmsLinearProgressWithLabel} from '@widgets/components'
import * as PropTypes from 'prop-types';

/**
 * @description Thể hiện tiến trình trạng thái chương trình, trạng thái nhận từ db là số
 * @param {*} value string
 * @returns node
 * @example Chương trình A có stateArticle = 3 
 * <CmsLinearProgressStateArticle value=3 />
 */
function CmsLinearProgressStateArticle(props){
    const {value} = props
    const obResult = Object.values(StateArticle).find(item=>item.id === value)
    const progress = obResult ? ((obResult.progress / 5) * 100) : 0
    return (
        <div className="w-full">
            {
                obResult && <CmsLinearProgressWithLabel value={progress}/>
            }
        </div>
    )
}

CmsLinearProgressStateArticle.propTypes = {
	value: PropTypes.number,
}

CmsLinearProgressStateArticle.defaultProps = {
	value: 0
}

export default React.memo(CmsLinearProgressStateArticle)