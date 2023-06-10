import { CmsButton, CmsFilter, CmsSelect, CmsTextField } from "@widgets/components"
import { HomeSubscription } from "app/main/product/model/product/homeSubscription"
import React from "react"
import { useEffect } from "react"
import { orderStatus } from "../../model/status"

function FilterOptionView(
    { filterOptions, search, setSearch, setFilterOptions, resetSearch }
) {
    const [searchValue, setSearchValue] = React.useState(null)

    useEffect(() => {
        setSearchValue(search)
    }, [search])

    const onSearchBasicKeyPress = event => {
        if (event.key === "Enter") {
            setSearch({ ...searchValue, search: searchValue?.search, page: 1, limit: 10 })
        }
    }

    const onSearchAdvandClick = () => {

        setSearch({ ...searchValue, page: 1, limit: 10 })
        setFilterOptions(null)
    }

    const onResetAdvandClick = () => {
        resetSearch()
        setSearchValue({ ...search, page: 1, limit: 10 })
    }

    return (
        <CmsFilter
            ftype={filterOptions}
            fbasic={(
                <div className="w-full space-y-8">
                    <div className="w-full flex space-x-8">
                        <div className="w-1/3 space-y-8">
                            <CmsTextField value={searchValue?.cusId || ''} onChange={event => setSearchValue({ ...searchValue, cusId: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="..." startText="cusId" isSearch={true} />
                        </div>
                        <div className="w-1/3 space-y-8">
                            <CmsSelect value={searchValue?.homeSubscription || ''} label="HomeSubscription" data={[{ id: '', name: 'Tất cả' }, ...Object.values(HomeSubscription)]} onChange={event => setSearchValue({ ...searchValue, homeSubscription: event.target.value })} />
                        </div>
                        <div className="w-1/3 space-y-8">
                            <CmsSelect value={searchValue?.status || ''} label="Trạng thái" data={[{ id: '', name: 'Tất cả' }, ...Object.values(orderStatus)]} onChange={event => setSearchValue({ ...searchValue, status: event.target.value })} />
                        </div>
                    </div>
                    <CmsButton label="Tìm" startIcon="search" onClick={onSearchAdvandClick} />
                    <CmsButton label="Hủy" className="ml-4" color="default" startIcon="cached" onClick={onResetAdvandClick} />
                </div>
            )}
        />
    )
}
export default FilterOptionView