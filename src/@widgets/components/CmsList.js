import React, { useState } from 'react'
import {
	List,
	ListItem,
	Typography,
	Avatar,
	Checkbox,
	AppBar,
	Toolbar,
	InputBase
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import * as PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
	item: {
		borderBottom: `1px solid  ${theme.palette.divider}`,
		'&.selected': {
			'&::after': {
				content: '""',
				position: 'absolute',
				left: 0,
				display: 'block',
				height: '100%',
				width: 3,
				backgroundColor: theme.palette.primary.main
			}
		}
	},
	itemSelected: {
		backgroundColor: "#FFF3EF",
		'&:hover': {
			backgroundColor: "#FFF3EF"
		}
	},
	avatar: {
		backgroundColor: theme.palette.primary[500]
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	content: {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto',
		'-webkit-overflow-scrolling': 'touch'
	}
}));


/**
 * @description Component item of list
 * @param {*} props 
 */
const ItemOfList = props => {
	const {
		avatar,
		checked,
		title,
		rtitle,
		subTitle,
		rsubTitle,
		subTitle2,
		rsubTitle2,
		onClick,
		isMultiSelect,
		subTitle2Class
	} = props;
	const classes = useStyles(props);

	const isString = myVar => (typeof myVar === 'string')

	if (!title && !rtitle && !subTitle && !rsubTitle && !subTitle2 && !rsubTitle2) {
		return null
	}

	return (
		<ListItem dense button onClick={onClick} className={clsx(classes.item, "items-center", checked && classes.itemSelected)}>
			{isMultiSelect && <Checkbox checked={checked} />}
			<div className="flex flex-1 flex-col relative">
				<div className="flex items-center justify-between pb-4">
					<div className="flex items-center">
						{avatar && (
							<Avatar className={classes.avatar} alt={title} src={avatar} />
						)}
						{isString(title)
							? <Typography variant="subtitle1" className="ml-8 text-17" color="primary"> {title} </Typography>
							: <div className="ml-8">{title}</div>
						}
					</div>
					{isString(rtitle)
						? <Typography variant="subtitle1" color="primary">{rtitle}</Typography>
						: rtitle
					}
				</div>

				<div className="flex items-center justify-between py-0">
					{isString(subTitle)
						? <Typography className="ml-12">{subTitle}</Typography>
						: <div className="ml-12">{subTitle}</div>
					}
					{isString(rsubTitle)
						? <Typography>{rsubTitle}</Typography>
						: rsubTitle
					}
				</div>

				<div className="flex items-center justify-between">
					{isString(subTitle2)
						? <Typography className={subTitle2Class} variant="caption">{subTitle2}</Typography>
						: <div className={subTitle2Class}>{subTitle2}</div>
					}
					{isString(rsubTitle2)
						? <Typography variant="caption">{rsubTitle2}</Typography>
						: rsubTitle2
					}
				</div>
			</div>
		</ListItem>
	);
};

/**
 * @description Define input datatype of ItemOfList
 */
ItemOfList.propTypes = {
	avatar: PropTypes.string,
	checked: PropTypes.bool,
	title: PropTypes.any,
	rtitle: PropTypes.any,
	subTitle: PropTypes.any,
	rsubTitle: PropTypes.any,
	subTitle2: PropTypes.any,
	rsubTitle2: PropTypes.any,
	onClick: PropTypes.func,
	isMultiSelect: PropTypes.bool,
	subTitle2Class: PropTypes.string,
}

/**
 * @description Default value input of ItemOfList
 */
ItemOfList.defaultProps = {
	avatar: "",
	title: "",
	rtitle: "",
	subTitle: "",
	rsubTitle: "",
	subTitle2: "",
	rsubTitle2: "",
	onClick: null,
	isMultiSelect: false,
	subTitle2Class: "ml-12",
}

/**
 * 
 * @description Component List
 */
function CmsList(props) {
	const classes = useStyles(props);
	const {
		data,
		placeholderSearch,
		searchField,
		selected,
		setSelected,
		isMultiSelect,
		selectedList,
		setSelectedList,
		isSearch,
		actions,
		setFilter,
		className,
		subTitle2Class
	} = props;
	const [search, setSearch] = useState("")
	let dataSource = data

	/**
	 * @description handle select all
	 * @param {*} event 
	 */
	const handleSelectAllClick = (event) => {
		if (isMultiSelect && setSelectedList) {
			if (event.target.checked) {
				const newSelecteds = data && data.map(item => item.original);
				setSelectedList(newSelecteds);
			} else {
				setSelectedList([]);
			}
		}
	}

	/**
	 * @description Kiểm tra trường hợp chọn nhiều item, item có đang được chọn hay không
	 * @param {*} item
	 */
	const isSelected = item => isMultiSelect ? selectedList.map(ob => ob.id).includes(item.id) : selected && selected.id === item.id

	/**
	 * @description Thực hiện chọn 1 item trên list
	 * @param {*} item 
	 */
	const handleSelectRow = item => () => {
		if (isMultiSelect) {
			if (setSelectedList && item.original) {
				let newSelected = []
				if (isSelected(item.original)) {
					newSelected = selectedList.filter(ob => ob.id !== item.original.id)
				} else {
					newSelected = [...selectedList, item.original]
				}
				setSelectedList(newSelected);
			}
		} else {
			if (setSelected && item.original) {
				setSelected(item.original)
			}
		}
	}

	const handleOnKeyDown = (event) =>{
		if( setFilter && search !== "")
		{
			setFilter(search, event)
		}	
	}

	if (searchField !== "" && search !== "" && !setFilter) {
		dataSource = dataSource.filter(item => `${item[searchField]}`.toUpperCase().startsWith(search.toUpperCase()))
	}
	
	return (
		<React.Fragment>
			<FuseScrollbars className={clsx(classes.content, className)}>
				<div className="w-full">
					{(isMultiSelect || actions || isSearch) && (
						<AppBar position="sticky" color="default" className="w-full" >
							<Toolbar className="w-full flex justify-between items-center relative px-16 min-h-36">
								<div className="w-full flex items-center">
									{isMultiSelect && (
										<Checkbox
											checked={data.length > 0 && selectedList.length === data.length}
											indeterminate={selectedList.length > 0 && selectedList.length < data.length}
											onChange={handleSelectAllClick}
										/>
									)}
									{actions && actions}
								</div>
								{isSearch && (
									<div className={classes.search}>
										<div className={classes.searchIcon}>
											<SearchIcon />
										</div>
										<InputBase
											placeholder={placeholderSearch}
											value={search}
											onKeyDown={(event)=>handleOnKeyDown(event)}
											onChange={(event)=>setSearch(event.target.value)}
											classes={{
												root: classes.inputRoot,
												input: classes.inputInput,
											}}
											inputProps={{ 'aria-label': 'search' }}
										/>
									</div>
								)}
							</Toolbar>
						</AppBar>
					)}

					<List className="p-0">
						<FuseAnimateGroup enter={{ animation: 'transition.slideUpBigIn' }}>
							{
								dataSource && dataSource.length > 0 
								? dataSource.map((item, index) => (
									<ItemOfList
										key={index}
										title={item.title}
										rtitle={item.rtitle}
										subTitle={item.subTitle}
										rsubTitle={item.rsubTitle}
										subTitle2={item.subTitle2}
										rsubTitle2={item.rsubTitle2}
										checked={isSelected(item.original)}
										onClick={handleSelectRow(item)}
										isMultiSelect={isMultiSelect}
										subTitle2Class={subTitle2Class}
									/>))
								: <ItemOfList subTitle={<Typography color="secondary">Không tìm thấy dữ liệu</Typography>}/>
							}
						</FuseAnimateGroup>
					</List>
				</div>
			</FuseScrollbars>
		</React.Fragment>
	)
}

/**
 * @description Define input datatype of CmsList
 */
CmsList.propTypes = {
	data: PropTypes.array,
	actions: PropTypes.node,
	placeholderSearch: PropTypes.string,
	searchField: PropTypes.string,
	selected: PropTypes.object,
	setSelected: PropTypes.func,
	isMultiSelect: PropTypes.bool,
	selectedList: PropTypes.array,
	setSelectedList: PropTypes.func,
	isSearch: PropTypes.bool,
	setFilter: PropTypes.func,
	subTitle2Class: PropTypes.string,
}

/**
 * @description Default value input of CmsList
 */
CmsList.defaultProps = {
	data: [],
	actions: null,
	placeholderSearch: "Tìm kiếm...",
	searchField: "",
	isMultiSelect: false,
	selected: null,
	setSelected: null,
	selectedList: [],
	setSelectedList: null,
	isSearch: true,
	isFieldSearch: false,
	setFilter: null,
	subTitle2Class: "ml-12"
}

export default React.memo(CmsList)
