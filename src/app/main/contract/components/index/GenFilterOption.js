import { CmsSelect } from "@widgets/components"
import React from "react"
import { ContractStatus } from "../../model/status"
import { useState } from "react"
import { useEffect } from "react"

function GenFilterOptionComponent({ search, setSearch }) {
    const [value, setValue] = useState(null)
    useEffect(()=> {
        setValue(search)
    },[search])
    const handleChangeStatus = (event) => {
        var val = event.target.value
        setSearch({...value, status: val})
    }
    return (
        <CmsSelect
            size="small"
            data={Object.values(ContractStatus)}
            value={search?.status || null}
            onChange={handleChangeStatus}
            label="trạng thái"
        />
    )
}
export default React.memo(GenFilterOptionComponent)