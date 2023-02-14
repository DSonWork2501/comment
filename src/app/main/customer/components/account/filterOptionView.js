import { CmsFilter, CmsIconButton, CmsTextField } from "@widgets/components"
import React from "react"
import { useEffect } from "react"

function FilterOptionView(
    { filterOptions, search, setSearch }
) {
    const [searchValue, setSearchValue] = React.useState(null)

    useEffect(() => {
        setSearchValue(search)
    }, [search])

    const onSearchBasicKeyPress = event => {
        if (event.key === "Enter") {
            setSearch({ ...searchValue, email: searchValue?.email, page: 1, limit: 10 })
        }
    }

    const onSearchBasicClick = () => {
        setSearch({ ...searchValue, email: searchValue?.email, page: 1, limit: 10 })
    }
    
    return (
        <CmsFilter
            ftype={filterOptions}
            fbasic={(
                <div className="flex w-full md:w-1/4 sm:w-1/2">
                    <CmsTextField value={searchValue?.email || ''} onChange={event => setSearchValue({ ...searchValue, email: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="Tài khoản..." startText="Email" endNode={<CmsIconButton icon="search" onClick={onSearchBasicClick} />} isSearch={true} />
                </div>
            )}
        />
    )
}
export default FilterOptionView