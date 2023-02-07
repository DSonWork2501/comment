import React from 'react'
import {
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@material-ui/core'
import * as PropTypes from 'prop-types'
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup'
import { storage } from '@widgets/functions'
/**
 * 
 * @description Component tùy chỉnh hiện thị hiện/ẩn các cột trên table
 * @param keyStorage string => key dùng để lưu vào storage khi người dùng thao tác
 * @param columns array => mảng column
 * @param setColumns func
 * @returns node
 */
function CmsViewOptions(props) {
    const { columns, setColumns, keyStorage, showCheckAll, isCheckAll, handleCheckAll, labelAll } = props;
    
    const handleChange = item => (event) => {
        let colUpdate = columns.map(ob => {
            if (ob.field === item.field) {
                ob.visible = !item.visible
            }
            if(ob.field === "error" && !ob.visible){
                ob.visible = true
            }
            return ob;
        })
        setColumns(colUpdate)
        if (keyStorage) {
            storage.setSession(keyStorage, colUpdate)
        }
    };

    const handleChangeAll = item => (event) => {
        if(!handleCheckAll) return
        let colUpdate = columns.map(ob => {
            ob.visible = !isCheckAll
            return ob
        })
        handleCheckAll(!isCheckAll)
        setColumns(colUpdate)

        if (keyStorage) {
            storage.setSession(keyStorage, colUpdate)
        }
    };

    return (
        <FuseAnimateGroup enter={{ animation: 'transition.expandIn' }} className="w-full p-16 border-1 rounded-4">
            <FormGroup row className="w-full">
                {showCheckAll && (<div key="all" className="flex w-full sm:w-1/2 md:w-1/6 p-4">
                    <FormControlLabel
                        control={<Checkbox checked={isCheckAll} onChange={handleChangeAll()} />}
                        label={labelAll}
                    />
                </div>)}
                {columns.filter(item=>!item.hideOption).map((item, index) => (
                    <div key={index} className="flex w-full sm:w-1/2 md:w-1/6 p-4">
                        <FormControlLabel
                            control={<Checkbox checked={item.visible} onChange={handleChange(item)} />}
                            label={item.label}
                        />
                    </div>
                ))}
            </FormGroup>
        </FuseAnimateGroup>
    )
}

CmsViewOptions.propTypes = {
    keyStorage: PropTypes.string,
    columns: PropTypes.array,
    setColumns: PropTypes.func,
    showCheckAll: PropTypes.bool,
    isCheckAll: PropTypes.bool,
    handleCheckAll: PropTypes.func,
    labelAll: PropTypes.string
}

CmsViewOptions.defaultProps = {
    keyStorage: "",
    columns: [],
    setColumns: null,
    handleCheckAll: null,
    showCheckAll: false,
    isCheckAll: false,
    labelAll: "Tất Cả"
}

export default React.memo(CmsViewOptions)
