import React from "react"
import { useState } from "react"
import { CmsIconButton, CmsTextField } from "@widgets/components"

function ProductSearchComponent({ keyStore, formik, prefix, handleKeyPressSearch }) {
    const [valueSearch, setValueSearch] = useState('')

    const handleChangeSearch = (event) => {
        setValueSearch(event.target.value)
        // dispatch(getList({ search: value, homeSubscription: 2 })) 
    }
    // const handleKeyPressSearch = (event) => {
    //     if (event.key === 'Enter') {
    //         dispatch(getListHS({ search: valueSearch, homeSubscription: 2 }))
    //     }
    // }
    const handleClickSearch = () => {
        handleKeyPressSearch(valueSearch)
    }

    return (
        <CmsTextField
            size="small"
            startText="Tìm kiếm"
            placeholder="tên sản phẩm"
            onChange={handleChangeSearch}
            onKeyPress={handleKeyPressSearch}
            values={valueSearch || ''}
            label=""
            //isSearch
            endNode={<CmsIconButton icon="search" tooltip={'tìm kiếm'} onClick={(event) => handleClickSearch(event)} />}
        />
    )
}
export default React.memo(ProductSearchComponent)