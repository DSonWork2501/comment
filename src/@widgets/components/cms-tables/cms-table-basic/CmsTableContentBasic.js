import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TablePagination,
	LinearProgress,
	Typography,
	TableFooter
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import TableHeaderBasic from './CmsTableHeaderBasic';
import { useTranslation } from 'react-i18next';
import _ from '@lodash';
import * as PropTypes from 'prop-types';
import clsx from 'clsx'
import { CmsCollapse } from '@widgets/components'
import CmsRowContentBasic from './CmsRowContentBasic';
import CmsTableFooterBasic from './CmsTableFooterBasic';

/**
 * @description Thể hiện dữ liệu dạng table
 * @param data array
 * @param columns array
 * @param loading bool
 * @param selected object
 * @param setSelected func
 * @param className string
 * @param filterOptions node
 * @param viewOptions node
 * @param scrollToTopOnChildChange bool
 * @returns node
 */
function TableContentBasic(props) {
	// const dispatch = useDispatch();
	const { t } = useTranslation('widget');
	const {
		//name,
		data,
		columns,
		loading,
		selected,
		setSelected,
		className,
		filterOptions,
		viewOptions,
		scrollToTopOnChildChange,
		openFilterOptions,
		openViewOptions,
		isMultiSelect,
		selectedList,
		setSelectedList,
		pagination,
		isServerSide,
		apiServerSide,
		search,
		isPagination,
		footerData,
		footerClass,
		isShowDataNullAlert,
		isCollapsible,
		tableClassName,
		setSearch,
		panigationDefault,
		isFuseScrollbars,
		isColorSelectRow,
		isSelectOnClickRow,
		upperHead
	} = props;
	const [hover, setHover] = useState(null)
	const [page, setPage] = useState(panigationDefault?.page || 0);
	const [limit, setLimit] = useState(panigationDefault?.limit || 10);
	const [totalPage, setTotalPage] = useState(panigationDefault?.totalPage || 1)
	const [totalRecord, setTotalRecord] = useState(10)
	const [order, setOrder] = useState({ direction: 'asc', field: null });
	const selectRow = React.useRef(null);
	const name = Math.random().toString(36).slice(2)

	useEffect(() => {
		if (isServerSide && pagination) {
			if (pagination.pagenumber) {
				setPage(pagination.pagenumber - 1)
			}
			if (pagination.rowspage) {
				setLimit(pagination.rowspage)
			}
			if (pagination.totalpage) {
				setTotalPage(pagination.totalpage)
			} else {
				if (pagination.rowspage && pagination.total) {
					setTotalPage(Math.ceil(pagination.total / pagination.rowspage))
				}
			}
			if (pagination.total || pagination.totalrow) {
				if (pagination.total) {
					setTotalRecord(pagination.total)
				}
				if (pagination.totalrow) {
					setTotalRecord(pagination.totalrow)
				}
			}
		} else {
			setTotalRecord(data.length)
			if (data.length / limit  < page) {
				setPage(0)
				setTotalPage(Math.ceil(data.length / limit))
			}
		}
	}, [isServerSide, pagination, data.length, page, limit])

	/**
	 * @description sắp xếp trên table
	 */
	const handleRequestSort = (event, property) => {
		const field = property;
		let direction = 'desc';

		if (order.field === property && order.direction === 'desc') {
			direction = 'asc';
		}
		setOrder({
			direction,
			field
		});
	}

	/**
	 * @description Phân trang
	 */
	const handleChangePage = (event, value) => {
		setPage(value);
		setSearch && setSearch({ ...search, pageNumber: value + 1, rowsPage: limit })
		if (isServerSide && apiServerSide) {
			apiServerSide({ ...search, pageNumber: value + 1, rowsPage: limit })
		}
	}

	/**
	 * @description Phân trang
	 */
	const handleChangeLimit = event => {
		if (isServerSide && apiServerSide) {
			apiServerSide({ ...search, pageNumber: 1, rowsPage: event.target.value })
		}
		setSearch && setSearch({ ...search, rowsPage: event.target.value })
		setLimit(event.target.value);
	}

	/**
	 * @description handle select all
	 * @param {*} event 
	 */
	const handleSelectAllClick = (event) => {
		if (isMultiSelect) {
			if (event.target.checked) {
				const newSelecteds = data && data.map(item => item.original);
				setSelectedList(newSelecteds);
			} else {
				setSelectedList([]);
			}
		}
	};

	/**
	 * @description Kiểm tra trường hợp chọn nhiều item, item có đang được chọn hay không
	 * @param {*} item
	 */
	//const isSelected = item => selectedList.map(ob => ob.id).includes(item.original.id)
	const isSelected = (item) => {
		if (isMultiSelect) {
			return selectedList && selectedList.map(ob => ob?.id).includes(item?.original?.id)
		} else {
			return selected && selected?.id === item?.original?.id
		}
	}
	const handleSetColorRow = (item, idRow, index) => () => {
		if (selectRow && selectRow.current && selectRow.current.index >= 0) {
			let control = document.getElementById(`${selectRow.current.index}_row_table${name}`);
			if (control) {
				control.style.backgroundColor = 'transparent';
			}
		}
		let control = document.getElementById(idRow);
		if (control) {
			control.style.backgroundColor = '#ffedd5';
		}
		selectRow.current = { ...item, index: index };
	}
	/**
	 * @description Thực hiện chọn 1 item trên table
	 * @param {*} item 
	 */
	const handleSelectRow = (item, idRow, index) => () => {
		if (isMultiSelect) {
			if (setSelectedList && item.original) {
				let newSelected = []
				if (isSelected(item)) {
					newSelected = selectedList.filter(ob => ob.id !== item.original.id)
				} else {
					newSelected = [...selectedList, item.original]
				}
				setSelectedList(newSelected);
			}
		} else {
			if (isColorSelectRow) {
				if (selectRow && selectRow.current && selectRow.current.index >= 0) {
					let control = document.getElementById(`${selectRow.current.index}_row_table${name}`);
					if (control) {
						control.style.backgroundColor = 'transparent';
					}
				}
				let control = document.getElementById(idRow);
				if (control) {
					control.style.backgroundColor = '#ffedd5';
				}
				selectRow.current = { ...item, index: index };
			}
			if (setSelected && item.original) {
				setSelected(item.original)
			}
		}
	}

	const cols = columns ? columns.filter(col => col.visible) : []

	const genTableCell = () => {
		let dataSource = []
		if (isServerSide) {
			dataSource = data
		} else {
			dataSource = _.orderBy(data, [o => (o[order.field])], [order.direction])
				.slice(page * limit, page * limit + limit)
		}

		return (
			dataSource && dataSource.map((item, index) => (
				<CmsRowContentBasic
					name={name}
					key={index}
					item={item}
					index={index}
					isMultiSelect={isMultiSelect}
					selectedList={selectedList}
					handleSelectRow={handleSelectRow}
					isSelected={isSelected}
					cols={cols}
					selected={selected}
					hover={hover}
					setHover={setHover}
					isCollapsible={isCollapsible}
					isSelectOnClickRow={isSelectOnClickRow}
					handleSetColorRow={handleSetColorRow}
				/>
			)))
	}
	const genTableFooterCell = () => {

		return (
			<CmsTableFooterBasic
				footerData={footerData}
				footerClass={footerClass}
				cols={cols}
				name={name}
			/>)
	}

	const tableContent = () => (
		<>
			<Table stickyHeader className={tableClassName} aria-labelledby="tableTitle">
				<TableHeaderBasic
					columns={columns}
					order={order}
					onRequestSort={handleRequestSort}
					onOffHover={() => setHover(null)}
					numSelected={selectedList.length}
					rowCount={data.length}
					onSelectAllClick={handleSelectAllClick}
					isMultiSelect={isMultiSelect}
					isCollapsible={isCollapsible}
					upperHead={upperHead}
				/>
				{data.length > 0 && <TableBody>{genTableCell()}</TableBody>}
				{footerData && <TableFooter>{genTableFooterCell()}</TableFooter>}
			</Table>
			{data.length === 0 && isShowDataNullAlert && <div className="w-full grid justify-items-center mt-10"><Typography className="text-18" color="secondary">Không tìm thấy dữ liệu</Typography></div>}
		</>
	)

	return (
		<div className={clsx("w-full flex flex-col", className)}>
			{loading && <LinearProgress className="w-full" />}
			{filterOptions && <CmsCollapse open={openFilterOptions}>{filterOptions}</CmsCollapse>}
			{viewOptions && <CmsCollapse open={openViewOptions}>{viewOptions}</CmsCollapse>}
			{/* {(viewOptions || filterOptions) && <div className="p-8"></div>} */}

			{isFuseScrollbars ?
				<FuseScrollbars className="flex-grow overflow-x-auto" scrollToTopOnChildChange={scrollToTopOnChildChange}>
					{tableContent()}
				</FuseScrollbars>
				: tableContent()
			}
			{isPagination &&
				<TablePagination
					onMouseOver={() => setHover(null)}
					className="overflow-hidden flex-shrink-0"
					component="div"
					count={totalRecord}
					rowsPerPage={limit}
					rowsPerPageOptions={[5, 10, 20, 50, 100, 1000]}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeLimit}
					labelRowsPerPage={<Typography component="span" color="primary">{t("LabelRowsPerPage")}</Typography>}
					labelDisplayedRows={({ from, to, count, page }) => (
						<Typography color="primary" component="span">
							{/* Số trang */}
							<Typography component="span" className="font-bold">{`[ ${page + 1} ]`}</Typography>
							<Typography component="span">{` / ${totalPage} trang`}</Typography>

							{/* Số dòng trên trang */}
							<Typography component="span">{` - `}</Typography>
							<Typography component="span" className="font-bold">{`[ ${from}-${to} ]`}</Typography>
							<Typography component="span">{` / ${count !== -1 ? count : to} dòng`}</Typography>
						</Typography>
					)}
					backIconButtonText={t("PreviousPage")}
					nextIconButtonText={t("NextPage")}
				/>}
		</div>
	);
}

TableContentBasic.propTypes = {
	isServerSide: PropTypes.bool,
	apiServerSide: PropTypes.func,
	search: PropTypes.object,
	data: PropTypes.array,
	pagination: PropTypes.object,
	columns: PropTypes.array,
	loading: PropTypes.bool,
	selected: PropTypes.object,
	setSelected: PropTypes.func,
	isMultiSelect: PropTypes.bool,
	selectedList: PropTypes.array,
	setSelectedList: PropTypes.func,
	className: PropTypes.string,
	filterOptions: PropTypes.node,
	viewOptions: PropTypes.node,
	openFilterOptions: PropTypes.bool,
	openViewOptions: PropTypes.bool,
	scrollToTopOnChildChange: PropTypes.bool,
	isPagination: PropTypes.bool,
	footerData: PropTypes.object,
	footerClass: PropTypes.string,
	isShowDataNullAlert: PropTypes.bool,
	isCollapsible: PropTypes.bool,
	tableClassName: PropTypes.string,
	setSearch: PropTypes.func,
	panigationDefault: PropTypes.object,
	isFuseScrollbars: PropTypes.bool,
	isColorSelectRow: PropTypes.bool,
	isSelectOnClickRow: PropTypes.bool
}

TableContentBasic.defaultProps = {
	isServerSide: false,
	apiServerSide: null,
	search: {},
	data: [],
	pagination: null,
	columns: [],
	loading: false,
	isMultiSelect: false,
	selected: null,
	setSelected: null,
	selectedList: [],
	setSelectedList: null,
	className: "",
	filterOptions: null,
	viewOptions: null,
	openFilterOptions: false,
	openViewOptions: false,
	scrollToTopOnChildChange: false,
	isPagination: true,
	footerData: null,
	footerClass: "",
	isShowDataNullAlert: true,
	isCollapsible: false,
	tableClassName: "min-w-xl",
	setSearch: null,
	panigationDefault: null,
	isFuseScrollbars: true,
	isColorSelectRow: true,
	isSelectOnClickRow: true
}

export default React.memo(TableContentBasic)
