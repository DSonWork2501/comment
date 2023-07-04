import { Checkbox, Collapse, TableCell, TableRow, IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import * as PropTypes from 'prop-types'
import clsx from 'clsx'
import dateformat from 'dateformat'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
// Sự kiện row hover
function handleRowHover(event, row, index, name) {
    if (row.action) {
        let control = document.getElementById(`${index}_row_table_edit${name}`);
        control.style.display = 'table-cell';
    }
}
// Sự kiện row hover Leave
function handleRowHoverLeave(event, row, index, name) {
    if (row.action) {
        let control = document.getElementById(`${index}_row_table_edit${name}`);
        control.style.display = 'none';
    }
}

const useStyles = makeStyles({
    tableCell: {
        '&:hover': {
            backgroundColor: 'transparent !important', // Change this to the desired background color
        },
    },
    border: {
        borderRight: '1px solid #ddd'
    }
});

function RowContentBasic(props) {
    const { index, isMultiSelect, item, handleSelectRow, isSelected, cols, isCollapsible, name, isSelectOnClickRow, handleSetColorRow, isClearHoverBg, showBorder } = props
    const [openCollapse, setOpenCollapse] = useState(false)
    const classes = useStyles();

    return (
        <>
            <TableRow
                id={`${index}_row_table${name}`}
                key={`${index}_row_table${name}`}
                className={clsx("h-64 cursor-pointer", isClearHoverBg && classes.tableCell)}
                style={item.style}
                hover
                role="checkbox"
                tabIndex={-1}
                // selected={isMultiSelect ? (selectedList && item.original && selectedList.map(ob => ob.id).includes(item.id)) : (selected && item.original && selected.id === item.original.id)}
                selected={isSelected(item)}
                onClick={(!isSelectOnClickRow && isMultiSelect) ? handleSetColorRow(item, `${index}_row_table${name}`, index) : handleSelectRow(item, `${index}_row_table${name}`, index)}
                // onMouseOver={() => setHover(item.id)}
                onMouseEnter={(e) => handleRowHover(e, item, index, name)}
                onMouseLeave={(e) => handleRowHoverLeave(e, item, index, name)}
            >
                {isCollapsible && (
                    <TableCell key="collapse_th" className='w-40'>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpenCollapse(!openCollapse)}
                        >
                            {openCollapse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    </TableCell>
                )}
                {isMultiSelect && (
                    <TableCell padding="checkbox" key={`${index}_checkbox${name}`}>
                        <Checkbox checked={isSelected(item)} onClick={!isSelectOnClickRow ? handleSelectRow(item, `${index}_row_table${name}`, index) : null} />
                    </TableCell>
                )}
                {cols.map((col, colIndex) => {
                    const returnRow = () => {
                        try {
                            return item?.rowSpan[col.field] ? (item.keyRow === 1 ? item.rowSpan[col.field] : 0) : 1
                        } catch (error) {
                            return 1
                        }
                    }

                    return (
                        <TableCell
                            rowSpan={returnRow()}
                            key={`${col.field}_${colIndex}`}
                            component="td"
                            scope="row"
                            align={col.alignValue}
                            className={clsx("relative p-8", col.classValue, returnRow() === 0 ? 'hidden' : '',
                                showBorder && classes.border,
                                item.keyRow > 1 ? 'pointer-events-none' : '')}>
                            {
                                col.isDate
                                    ? item[col.field] && !isNaN(Date.parse(item[col.field]))
                                        ? dateformat(Date.parse(item[col.field]), col.formatDate)
                                        : "-"
                                    : (item[col.field] || "")
                            }
                        </TableCell>
                    )
                })}
                {item.action
                    && <TableCell
                        id={`${index}_row_table_edit${name}`}
                        className='py-8 px-0'
                        style={{
                            position: 'sticky',
                            right: 0,
                            width: 0,
                            verticalAlign: 'center',
                            display: 'none'
                        }}>
                        <div
                            className="relative flex justify-end right-0 items-center">
                            <div className="absolute flex justify-end items-center right-8">
                                {item.action}
                            </div>
                        </div>
                    </TableCell>}
            </TableRow>
            {isCollapsible &&
                <TableRow key={`${index}_collapse_tr${name}`}>
                    <TableCell key={`${index}_collapse${name}`} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={cols.length + 1 || 0}>
                        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                            {item.collapse(openCollapse, setOpenCollapse)}

                        </Collapse>
                    </TableCell>
                </TableRow>
            }
        </>
    )
}

RowContentBasic.propTypes = {
    index: PropTypes.number,
    isMultiSelect: PropTypes.bool,
    selectedList: PropTypes.array,
    item: PropTypes.object,
    handleSelectRow: PropTypes.func,
    isSelected: PropTypes.func,
    cols: PropTypes.array,
    selected: PropTypes.object,
    hover: PropTypes.any,
    setHover: PropTypes.func
}

RowContentBasic.defaultProps = {
    index: 0,
    isMultiSelect: false,
    selectedList: [],
    item: {},
    handleSelectRow: null,
    isSelected: null,
    cols: [],
    selected: {},
    hover: 0,
    setHover: null

}

export default React.memo(RowContentBasic)