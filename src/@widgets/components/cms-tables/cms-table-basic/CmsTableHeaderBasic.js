import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import * as PropTypes from 'prop-types';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core';

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


/**
 * @description Component tạo header cho table
 * @returns node
 * @param columns array
 * @param order object
 * @param onRequestSort func
 */
function TableHeaderBasic(props) {
	const { columns, order, onRequestSort, onOffHover, numSelected, rowCount, onSelectAllClick, isMultiSelect, isCollapsible, upperHead, showBorder } = props;
	const { t } = useTranslation('UserMngPage');
	const classes = useStyles();

	/**
	 * @description sắp xếp trên table
	 */
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead onMouseOver={() => { onOffHover() }}>
			{upperHead}
			<TableRow key="tr_thead" className="h-36">
				{isCollapsible && (
					<TableCell key="collapse_th"></TableCell>
				)}
				{isMultiSelect && (
					<TableCell key="isMultiSelect" padding="checkbox">
						<Checkbox
							checked={rowCount > 0 && numSelected === rowCount}
							indeterminate={numSelected > 0 && numSelected < rowCount}
							onChange={onSelectAllClick}
						/>
					</TableCell>
				)}
				{columns.filter(item => item.visible).map(item => (
					<TableCell
						key={item.field}
						component="th"
						align={item.alignHeader}
						padding={item.disablePaddingHeader ? 'none' : 'default'}
						sortDirection={order.field === item.field ? order.direction : false}
						className={clsx('p-8', item.classHeader,
							showBorder && classes.border)}
						style={item.style}
					>
						{item.onSelectAllClick && (
							item.isSelectAllDisabled ?
								(<Checkbox
									className={item.classCheckAll}
									checked={item.selectAllValue || (numSelected > 0 && numSelected === rowCount)}
									indeterminate={numSelected > 0 && numSelected < rowCount}
									onChange={item.onSelectAllClick}
									disabled
								/>) :
								(<Checkbox
									className={item.classCheckAll}
									checked={item.selectAllValue || (numSelected > 0 && numSelected === rowCount)}
									indeterminate={numSelected > 0 && numSelected < rowCount}
									onChange={item.onSelectAllClick}
								/>)
						)}
						{item.sortable ? (
							<Tooltip
								title="Sắp xếp"
								placement={item.alignHeader === 'right' ? 'bottom-end' : 'bottom-start'}
								enterDelay={300}
							>
								<TableSortLabel
									active={order.field === item.field}
									direction={order.direction}
									onClick={createSortHandler(item.field)}
								>
									{item.label}
								</TableSortLabel>
							</Tooltip>
						) : (React.isValidElement(item.label) ? <>{item.label}</> : t(item.label))}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

TableHeaderBasic.propTypes = {
	columns: PropTypes.array,
	order: PropTypes.object,
	onRequestSort: PropTypes.func,
	isMultiSelect: PropTypes.bool,
	onSelectAllClick: PropTypes.func,
	numSelected: PropTypes.number,
	rowCount: PropTypes.number,
	isCollapsible: PropTypes.bool,
	openCollapse: PropTypes.bool,
	setOpenCollapse: PropTypes.func
}

TableHeaderBasic.defaultProps = {
	columns: [],
	order: null,
	onRequestSort: null,
	isMultiSelect: false,
	onSelectAllClick: null,
	numSelected: 0,
	rowCount: 0,
	isCollapsible: false,
	openCollapse: false,
	setOpenCollapse: null
}

export default React.memo(TableHeaderBasic)
