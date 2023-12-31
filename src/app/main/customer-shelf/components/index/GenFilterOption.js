import { CmsAutocomplete, CmsButtonProgress, CmsSelect, CmsTab } from "@widgets/components"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { keyStore, links } from "../../common"
import { useEffect } from "react"
import { getList as getCustomers } from "app/main/customer/store/customerSlice"
import { useMemo, useState } from "react"
import { resetSearch, setSearch } from "../../store/customerShelfSlice"
import { CustomerProductStatus } from "../../model/CustomerProductStatus"
import History from "@history/@history"

function GenFilterOptionContent() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore]?.cusShelf?.search)
    const cusData = useSelector(store => store[keyStore]?.customer?.entities)
    const [value, setValue] = useState({
        CusID: null,//=> id khách hàng
        Type: "household",//=> loại (household - tủ/ wine- chai rượu)
        Status: null,//=> trạng thái: null- lấy all,1-chưa uống, 2-đã uống
    })

    useEffect(() => {
        dispatch(getCustomers())
    }, [dispatch])

    useEffect(() => {
        setValue(search)
    }, [search])

    const customers = useMemo(() => cusData?.data.map((x, index) => ({
        id: x.id,
        name: `email: ${x.email}, tên: ${x.name}`
    })) || [], [cusData])

    const handleChangeCus = (event, value_item) => {
        setValue(prev => ({ ...prev, CusID: value_item?.id }))
    }
    const handleClick = () => {
        dispatch(setSearch({ ...value, Status: value.Status ? value.Status : null }))
    }
    const handleRefresh = () => {
        dispatch(resetSearch())
    }
    const handleChangeStatus = (event) => {
        setValue(prev => ({ ...prev, Status: event.target.value }))
    }

    return (
        <div className="flex flex-row w-full space-x-8 self-center items-center">
            {/* <CmsRadioGroup
                vertical={false}
                className="w-1/6 border-white"
                data={Object.values(CustomerProductType)}
                value={value?.Type || null}
                size="small"
                label=""
                name="type"
                onChange={(event) => handleChangeType(event)}
            /> */}
            <div className="w-1/3">
                <CmsTab data={links} value={0} isLink={true} onChange={(e, value) => {
                    History.push(links.find(e => e.id === value)?.link)
                }} />
            </div>
            <div className="w-2/3 flex space-x-4 items-center justify-end">
                <CmsSelect
                    className="w-2/6"
                    data={CustomerProductStatus}
                    value={value?.Status || ''}
                    size="small"
                    label="Trạng thái"
                    onChange={handleChangeStatus}
                />
                <CmsAutocomplete
                    className="w-2/6"
                    size="small"
                    label="email"
                    placeholder="Tìm kiếm theo email"
                    value={customers?.find(x => x?.id === value.CusID) || null}
                    data={customers}
                    onChange={handleChangeCus}
                />
                <CmsButtonProgress
                    className="w-96"
                    size="small"
                    label="Tìm kiếm"
                    startIcon="search"
                    onClick={() => handleClick()}
                />
                <CmsButtonProgress
                    className="w-96"
                    size="small"
                    label="Làm mới"
                    startIcon="refresh"
                    color="default"
                    onClick={() => handleRefresh()}
                />
            </div>
        </div>
    )
}
export default React.memo(GenFilterOptionContent)