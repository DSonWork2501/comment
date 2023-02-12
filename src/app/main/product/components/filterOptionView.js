import { CmsButton, CmsButtonGroup, CmsFilter, CmsIconButton, CmsMenu, CmsTextField } from "@widgets/components"
import { FilterOptions } from "@widgets/metadatas"
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

    const onSearchBasicClick = () => {
        setSearch({ ...searchValue, search: searchValue?.search, page: 1, limit: 10 })
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
                <div className="flex w-full md:w-1/4 sm:w-1/2">
                    <CmsTextField value={searchValue?.search || ''} onChange={event => setSearchValue({ ...searchValue, search: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="sản phẩm..." startText="Tên" endNode={<CmsIconButton icon="search" onClick={onSearchBasicClick} />} isSearch={true} />

                </div>
            )}
            fadvance={
                <div className="w-full space-y-8">
                    <div className="w-full flex space-x-8">
                        <div className="w-1/4 space-y-8">
                            <CmsTextField value={searchValue?.search || ''} onChange={event => setSearchValue({ ...searchValue, search: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="sản phẩm..." startText="Tên" isSearch={true} />
                            <CmsTextField value={searchValue?.shortname || ''} onChange={event => setSearchValue({ ...searchValue, shortname: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="" startText="Short Name" isSearch={true} />
                        </div>
                    </div>
                    <CmsButton label="Tìm" startIcon="search" onClick={onSearchAdvandClick} />
                    <CmsButton label="Hủy" className="ml-4" color="default" startIcon="cached" onClick={onResetAdvandClick} />
                </div>
            }
        />
    )
}
export default FilterOptionView