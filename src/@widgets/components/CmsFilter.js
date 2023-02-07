import React from 'react'
import * as PropTypes from 'prop-types';
import { FilterOptions } from '@widgets/metadatas'
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

/**
 * @description Component bộ filter
 * có 2 phần: tìm kiếm sơ bản và tìm kiếm nâng cao
 * @param ftype string "basic | advance" => loại filter cần thực hiện 
 * @param fbasic node => node thể hiện tìm kiếm cơ bản
 * @param fadvance node => node thể hiện tìm kiếm nâng cao
 */
function CmsFilterEditor(props) {
    const { ftype, fbasic, fadvance } = props
    return (
        <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }} className="w-full p-16 border-1 rounded-4 relative z-10">
            {ftype === FilterOptions.FilterType.basic.id && fbasic}
            {ftype === FilterOptions.FilterType.advance.id && fadvance}
        </FuseAnimateGroup>
    )
}

CmsFilterEditor.propTypes = {
    ftype: PropTypes.any,
    fbasic: PropTypes.node,
    fadvance: PropTypes.node,
}

CmsFilterEditor.defaultProps = {
    ftype: null,
    fbasic: null,
    fadvance: null
}

export default CmsFilterEditor
