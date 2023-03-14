import { CmsButton, CmsFilter, CmsSelect, CmsTextField } from "@widgets/components"
import React from "react"
import { useEffect } from "react"

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

    // const onSearchBasicClick = () => {
    //     setSearch({ ...searchValue, search: searchValue?.search, page: 1, limit: 10 })
    // }

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
                        <div className="w-1/4 space-y-8">
                            <CmsTextField value={searchValue?.cusId || ''} onChange={event => setSearchValue({ ...searchValue, cusId: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="..." startText="cusId" isSearch={true} />
                            <CmsTextField value={searchValue?.orderId || ''} onChange={event => setSearchValue({ ...searchValue, orderId: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="..." startText="orderId" isSearch={true} />
                        </div>
                        <div className="w-1/4 space-y-8">
                            <CmsSelect label="" data={[{ id: '', name: 'Tất Cả' }, { id: '1', name: 'Bình Thường' }, { id: '0', name: 'Đã Khóa' }]} />
                        </div>
                        <div className="w-1/4 space-y-8">

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