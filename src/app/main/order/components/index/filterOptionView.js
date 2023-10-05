import { CmsButton, CmsDateTimePicker, CmsFilter, CmsSelect, CmsTextField } from "@widgets/components"
import { HomeSubscription } from "app/main/product/model/product/homeSubscription"
import React from "react"
import { useEffect } from "react"
import { orderStatus } from "../../model/status"
import { format } from "date-fns"

function FilterOptionView(
    { filterOptions, search, setSearch, setFilterOptions, resetSearch }
) {
    const [searchValue, setSearchValue] = React.useState(null)

    useEffect(() => {
        setSearchValue(search)
    }, [search])

    const onSearchBasicKeyPress = event => {
        if (event.key === "Enter") {
            setSearch({ ...searchValue, search: searchValue?.search, pageNumber: 1})
        }
    }

    const onSearchAdvandClick = () => {

        setSearch({ ...searchValue, pageNumber: 1 })
        //setFilterOptions(null)
    }

    const onResetAdvandClick = () => {
        resetSearch()
        setSearchValue({ ...search, pageNumber: 1 })
    }

    return (
        <CmsFilter
            ftype={filterOptions}
            fbasic={(
                <div className="w-full space-y-8">
                    <div className="w-full flex space-x-8">
                        <div className="w-1/3 space-y-8">
                            <CmsTextField
                                size="small"
                                value={searchValue?.cusId || ''}
                                onChange={event => setSearchValue({ ...searchValue, cusId: event.currentTarget.value })}
                                onKeyPress={onSearchBasicKeyPress} placeholder="..." startText="cusId" isSearch={true} />
                        </div>
                        <div className="w-1/3 space-y-8">
                            <CmsSelect
                                size="small"
                                value={searchValue?.homeSubscription || ''}
                                label="HomeSubscription"
                                data={[{ id: '', name: 'Tất cả' }, ...Object.values(HomeSubscription)]}
                                onChange={event => setSearchValue({ ...searchValue, homeSubscription: event.target.value })} />
                        </div>
                        <div className="w-1/3 space-y-8">
                            <CmsSelect
                                size="small"
                                value={searchValue?.status || ''}
                                label="Trạng thái" data={[{ id: '', name: 'Tất cả' }, ...Object.values(orderStatus)]}
                                onChange={event => setSearchValue({ ...searchValue, status: event.target.value })} />
                        </div>
                    </div>
                    <div className="w-full flex space-x-8">
                        <div className="w-1/3 space-y-8">
                            <CmsTextField
                                size="small"
                                value={searchValue?.orderId || ''}
                                onChange={event => setSearchValue({ ...searchValue, orderId: event.currentTarget.value })}
                                onKeyPress={onSearchBasicKeyPress} placeholder="..." startText="orderId" isSearch={true} />
                        </div>
                        <div className="w-1/3 space-y-8">
                            <CmsDateTimePicker
                                size="small"
                                label="Từ ngày"
                                isOpenKeyBoard={false}
                                value={searchValue?.fromdate || null}
                                format="dd/MM/yyyy"
                                allDateTime={false}
                                onChange={event => setSearchValue({ ...searchValue, fromdate: format(new Date(event), 'yyyy/MM/dd') })}
                            />
                        </div>
                        <div className="w-1/3 space-y-8">
                            <CmsDateTimePicker
                                size="small"
                                label="Đến ngày"
                                isOpenKeyBoard={false}
                                value={searchValue?.todate || null}
                                format="dd/MM/yyyy"
                                allDateTime={false}
                                onChange={event => setSearchValue({ ...searchValue, todate: format(new Date(event), 'yyyy/MM/dd') })}
                            />
                        </div>
                    </div>
                    <CmsButton
                        size="small"
                        label="Tìm"
                        startIcon="search"
                        onClick={onSearchAdvandClick} />
                    <CmsButton
                        size="small"
                        label="Hủy"
                        className="ml-4"
                        color="default"
                        startIcon="cached"
                        onClick={onResetAdvandClick} />
                    <CmsButton
                        size="small"
                        label="Đóng"
                        className="ml-4"
                        color="default"
                        startIcon="close"
                        onClick={()=>setFilterOptions(null)} />
                </div>
            )}
        />
    )
}
export default FilterOptionView