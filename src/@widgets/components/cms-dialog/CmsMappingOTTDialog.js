import React, { } from 'react'
import PropTypes from 'prop-types'
import { CmsIconButton, CmsDialog, CmsTableBasic, CmsTextField, CmsAlert, CmsCheckbox } from '@widgets/components';
import { colors } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
function CmsMappingOTTDialog(props) {
    // // console.log('props', props)
    const dispatch = useDispatch()
    const { open, handleClose, title, text, search, setSearch, loading, selected, columns, saveProps,
        entities, setSelected, pagination, getDataFunc, entity, isMultiple, multipleChecked, isSearch } = props;
    const [textSearch, setTextSearch] = useState()

    useEffect(() => {
        setTextSearch(search.searchFilter)
    }, [search.searchFilter])

    const handleSave = (item) => {
        CmsAlert.fire({
            heightAuto: false,
            title: "",
            icon: "question",
            text: `Bạn có muốn Mapping ${item.id} - ${item.title} ?`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Đồng Ý",
            confirmButtonColor: colors.green[500],
            cancelButtonText: "Hủy"
        }).then(result => {
            if (result.isConfirmed) {
                item && entity && saveProps && saveProps(item, entity)
            }
        })
    }

    const handleSearchChange = (event) => {
        if (event.key === "Enter") {
            setSearch && dispatch(setSearch({ ...search, searchFilter: event.target.value }))
            getDataFunc && dispatch(getDataFunc({ ...search, searchFilter: event.target.value }))
        }
        setTextSearch(event.target.value)
    }
    const onSearchBasicClick = () => {
        setSearch && dispatch(setSearch({ ...search, searchFilter: textSearch }))
        getDataFunc && dispatch(getDataFunc({ ...search, searchFilter: textSearch, Page: 1, Limit: 10 }))
    }

    const handleChangeStatus = (event, item) => {
        const checked = event.target.checked
        checked ? multipleChecked.push(item.id) : multipleChecked.filter(x => x !== item.id)
    }

    const data =
        isMultiple ?
            entities?.map((item, index) => ({
                ...item,
                SelectAll: (
                    <CmsCheckbox
                        key={`${index}_selected`}
                        checked={item.isSelect}
                        value={item.id}
                        onChange={e => handleChangeStatus(e, item)}
                        name="isSelect"
                    />
                ),
            })) || []
            : entities?.map(item => ({
                ...item,
                action: !item.referenceID && <CmsIconButton tooltip="Chọn" delay={50} icon="check" className="bg-blue-500 text-white shadow-3  hover:bg-blue-700" onClick={() => handleSave(item)} />
            })) || []
    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                size="lg"
                open={open}
                text={text}
            >
                <div className="w-full space-y-16 pt-8" >
                    {isSearch && <CmsTextField value={textSearch} onChange={handleSearchChange} onKeyPress={handleSearchChange} placeholder="tìm kiếm..." startText="Tên/ID (Ít nhất 3 ký tự, sau đó nhấn enter)" endNode={<CmsIconButton icon="search" onClick={onSearchBasicClick} />} isSearch={true} />}
                    <CmsTableBasic
                        data={data}
                        className="w-128 h-full"
                        isServerSide={true}
                        search={search}
                        apiServerSide={params => dispatch(getDataFunc(params))}
                        pagination={pagination}
                        selected={selected}
                        setSelected={entity => dispatch(setSelected(entity))}
                        columns={columns}
                        loading={loading}
                    />
                </div>
            </CmsDialog>
        </React.Fragment>
    )
}

CmsMappingOTTDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.any,
    pagination: PropTypes.object,
    search: PropTypes.any,
    setSearch: PropTypes.func,
    loading: PropTypes.bool,
    selected: PropTypes.string,
    setSelected: PropTypes.func,
    columns: PropTypes.array,
    saveProps: PropTypes.func,
    data: PropTypes.array,
    entity: PropTypes.object,
    multipleChecked: PropTypes.array,
    isSearch: PropTypes.bool,

}
CmsMappingOTTDialog.defaultProps = {
    open: false,
    handleClose: null,
    title: '',
    text: null,
    pagination: null,
    search: {},
    setSearch: null,
    loading: false,
    selected: '',
    setSelected: null,
    columns: [],
    saveProps: null,
    data: [],
    entity: null,
    isMultiple: false,
    multipleChecked: [],
    isSearch: true,
}

export default React.memo(CmsMappingOTTDialog)