import { CmsButton, CmsFilter, CmsIconButton, CmsMenu, CmsSelect, CmsTextField } from "@widgets/components"
import { FilterOptions } from "@widgets/metadatas"
import React from "react"
import { useEffect } from "react"
import { type as CateType } from "../../model/category/Type"

function FilterOptionView(
    { filterOptions, search, setSearch, setFilterOptions, resetSearch }
) {
    const [searchValue, setSearchValue] = React.useState(null)
    const [typeSearchBasic, setTypeSearchBasic] = React.useState(FilterOptions.FilterBasicType.FilterId.id)
    const [menuSearchBasic, setMenuSearchBasic] = React.useState(null)

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

    const handleChangeSearchBasic = (item) => {
        setTypeSearchBasic(item.id)
        var value = item.id === FilterOptions.FilterBasicType.FilterId.id ? { title: '' } : { editorId: '' }
        setSearchValue({ ...searchValue, ...value })
    }

    return (
        <CmsFilter
            ftype={filterOptions}
            fbasic={(
                <div className="flex w-full md:w-1/4 sm:w-1/2">

                    {typeSearchBasic === FilterOptions.FilterBasicType.FilterId.id && (
                        <CmsTextField value={searchValue?.id || ''} onChange={event => setSearchValue({ ...searchValue, id: event.currentTarget.value, name: '' })} onKeyPress={onSearchBasicKeyPress} placeholder="Thể Loại..." startText="ID" startNode={<CmsIconButton icon="menu" onClick={event => setMenuSearchBasic(event.currentTarget)} />} endNode={<CmsIconButton icon="search" onClick={onSearchBasicClick} />} isSearch={true} />
                    )}
                    {typeSearchBasic === FilterOptions.FilterBasicType.FilterName.id && (
                        <CmsTextField value={searchValue?.name || ''} onChange={event => setSearchValue({ ...searchValue, name: event.currentTarget.value, id: '' })} onKeyPress={onSearchBasicKeyPress} placeholder="Thể Loại..." startText="Tên" startNode={<CmsIconButton icon="menu" onClick={event => setMenuSearchBasic(event.currentTarget)} />} endNode={<CmsIconButton icon="search" onClick={onSearchBasicClick} />} isSearch={true} />
                    )}
                    <CmsMenu
                        anchorEl={menuSearchBasic}
                        onClose={() => setMenuSearchBasic(null)}
                        data={Object.values(FilterOptions.FilterBasicType).map(item => ({ ...item, onClick: () => handleChangeSearchBasic(item) }))}
                    />
                </div>
            )}
            fadvance={
                <div className="w-full space-y-8">
                    <div className="w-full flex space-x-8">
                        <div className="w-1/4 space-y-8">
                            {typeSearchBasic === FilterOptions.FilterBasicType.FilterId.id && (
                                <CmsTextField value={searchValue?.id || ''} onChange={event => setSearchValue({ ...searchValue, id: event.currentTarget.value, name: '' })} onKeyPress={onSearchBasicKeyPress} placeholder="Thể Loại..." startText="ID" startNode={<CmsIconButton icon="menu" onClick={event => setMenuSearchBasic(event.currentTarget)} />} isSearch={true} />
                            )}
                            {typeSearchBasic === FilterOptions.FilterBasicType.FilterName.id && (
                                <CmsTextField value={searchValue?.name || ''} onChange={event => setSearchValue({ ...searchValue, name: event.currentTarget.value, id: '' })} onKeyPress={onSearchBasicKeyPress} placeholder="Thể Loại..." startText="Tên" startNode={<CmsIconButton icon="menu" onClick={event => setMenuSearchBasic(event.currentTarget)} />} isSearch={true} />
                            )}
                            <CmsMenu
                                anchorEl={menuSearchBasic}
                                onClose={() => setMenuSearchBasic(null)}
                                data={Object.values(FilterOptions.FilterBasicType).map(item => ({ ...item, onClick: () => handleChangeSearchBasic(item) }))}
                            />
                        </div>
                        <div className="w-1/4 space-y-8">
                            <CmsSelect label="Thể Loại" className="" data={[{ id: "", name: "Tất cả" }, ...CateType.map(x => ({ ...x, id: x.id + '' }))]} value={searchValue?.cate || ''} onChange={event => setSearchValue({ ...searchValue, cate: event.target.value })} />
                        </div>
                        <div className="w-1/4 space-y-8">

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