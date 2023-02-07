import React from 'react';
import { Chip } from '@material-ui/core'
import {StateArticle} from '@widgets/metadatas'
import clsx from 'clsx'
import * as PropTypes from 'prop-types';

/**
 * @description Thể hiện mô tả trạng thái chương trình và màu sắc tương ứng, trạng thái nhận từ db là số
 * @param {*} value string
 * @returns node
 * @example Chương trình A có stateArticle = 3 
 * <ChipStateArticle value=3 />
 */
function ChipStateArticle(props){
    const {value} = props
    const obResult = Object.values(StateArticle).find(item=>item.id === value)
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

ChipStateArticle.propTypes = {
	value: PropTypes.number,
}

ChipStateArticle.defaultProps = {
	value: ""
}

export default React.memo(ChipStateArticle)