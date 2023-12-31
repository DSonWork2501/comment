import { CmsButton, CmsFilter, CmsIconButton, CmsSelect, CmsTextField } from "@widgets/components"
import React from "react"
import { useMemo } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { keyStore } from "../../common"

function FilterOptionView(
    { filterOptions, search, setSearch, setFilterOptions, resetSearch }
) {
    const cateEntities = useSelector(store => store[keyStore].category.entities)
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

    const cateData = useMemo(() => cateEntities?.data.map(x => ({ id: x.name, name: x.name })), [cateEntities])

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
                        <div className="w-1/4 space-y-8">
                            <CmsSelect label="Thể Loại" className="" data={[{ id: "", name: "Tất cả" }, ...cateData]} value={searchValue?.cate || ''} onChange={event => setSearchValue({ ...searchValue, cate: event.target.value })} />
                            <CmsTextField value={searchValue?.certification || ''} onChange={event => setSearchValue({ ...searchValue, certification: event.currentTarget.value })} onKeyPress={onSearchBasicKeyPress} placeholder="" startText="Certification" isSearch={true} />
                        </div>
                        <div className="w-1/4 space-y-8">
                            <CmsTextField label="Từ Giá" isNumberFormat={true} value={searchValue?.fromPrice} onKeyPress={onSearchBasicKeyPress} onChange={event => setSearchValue({ ...searchValue, fromPrice: event.target.value })} />
                            <CmsTextField label="Đến Giá" isNumberFormat={true} value={searchValue?.toPrice} onKeyPress={onSearchBasicKeyPress} onChange={event => setSearchValue({ ...searchValue, toPrice: event.target.value })} />
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