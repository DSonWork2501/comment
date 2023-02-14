import { CmsButton, CmsFilter, CmsTextField } from "@widgets/components"
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
                    <div className="w-1/4 flex space-x-8">
                        <CmsTextField value={searchValue?.email || ''} onChange={event => setSearchValue({ ...searchValue, email: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="Khách Hàng..." startText="Email" isSearch={true} />
                    </div>
                    <div className="w-1/4 flex space-x-8">
                        <CmsTextField value={searchValue?.status || ''} onChange={event => setSearchValue({ ...searchValue, status: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="Khách Hàng..." startText="Trạng Thái" isSearch={true} />
                    </div>
                    <CmsButton label="Tìm" startIcon="search" onClick={onSearchAdvandClick} />
                    <CmsButton label="Hủy" className="ml-4" color="default" startIcon="cached" onClick={onResetAdvandClick} />
                </div>
            )}
        // fadvance={
        //     <div className="w-full space-y-8">
        //         <div className="w-full flex space-x-8">

        //         </div>
        //         <CmsButton label="Tìm" startIcon="search" onClick={onSearchAdvandClick} />
        //         <CmsButton label="Hủy" className="ml-4" color="default" startIcon="cached" onClick={onResetAdvandClick} />
        //     </div>
        // }
        />
    )
}
export default FilterOptionView