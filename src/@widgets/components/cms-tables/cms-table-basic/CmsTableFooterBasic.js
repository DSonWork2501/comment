import { TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React, { } from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * @description Định nghĩa css
 */
const useStyles = makeStyles(theme => ({
    footer: {
        left: 0,
        bottom: 0, // <-- KEY
        zIndex: 2,
        position: 'sticky',
        backgroundColor: 'white !important',
        borderTop: '2px black solid !important',

    },
    td: {
        fontWeight: "bold",
        borderTop: "1px solid rgba(224, 224, 224, 1)",
        fontSize: "1.4rem",
        fontFamily: "Roboto",
        lineHeight: 1.5
    }
}));
function TableFooterBasic(props) {
    const classes = useStyles(props)
    const { cols, footerData, footerClass, name } = props
    return (
        <TableRow
            className={clsx(classes.footer, "h-64 cursor-pointer")}
            key={`row_footer_table${name}`}
            hover
            tabIndex={-1}
        >
            {cols.map((col, colIndex) => (
                <TableCell key={`${col.field}_${colIndex}${name}`} component="td" scope="row" align={col.alignValue} className={clsx("relative p-8", footerClass, col.classValue, classes.td)}>
                    {
                        footerData[col.field] || ""
                    }
                </TableCell>
            ))}
        </TableRow>
    )
}
TableFooterBasic.propTypes = {
    cols: PropTypes.array,
    footerData: PropTypes.object,
    footerClass: PropTypes.string
}

TableFooterBasic.defaultProps = {
    index: 0,
    cols: [],
    footerData: {},
    footerClass: ""
}

export default React.memo(TableFooterBasic)