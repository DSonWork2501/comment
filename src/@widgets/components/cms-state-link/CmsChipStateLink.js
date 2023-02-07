import React from 'react';
import { Chip } from '@material-ui/core'
import {StateLink} from '@widgets/metadatas'
import clsx from 'clsx'
import * as PropTypes from 'prop-types';

/**
 * @description Thể hiện mô tả trạng thái link của chương trình và màu sắc tương ứng, trạng thái nhận từ db là số
 * @param {*} value string
 * @returns node
 * @example Chương trình A có stateLink = 1 
 * <CmsChipStateLink value=1 />
 */
function CmsChipStateLink(props){
    const {value} = props
    const obResult = Object.values(StateLink).find(item=>item.id === value)
    return (
        <React.Fragment>
            {
                obResult 
                    ? <Chip size="small" label={obResult.name} className={clsx(obResult.className, "text-white")}/>
                    : <Chip size="small" label={value} color="default"/>
            }
        </React.Fragment>
    )
}

CmsChipStateLink.propTypes = {
	value: PropTypes.number,
}

CmsChipStateLink.defaultProps = {
	value: ""
}

export default React.memo(CmsChipStateLink)