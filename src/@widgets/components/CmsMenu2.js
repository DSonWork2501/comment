import React from 'react';
import { Icon, IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	selectedMenu: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	menuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

/**
 *
 * @description Component Menu
 */
function CmsMenu2(props) {
	const classes = useStyles(props);
	const { value, name, menuEl, onClose, onOpen, onChange, data, classNameTitle, classNameButton } = props;

	/**
	 * @description get Title on menu
	 */
	const getTitle = data.find(item => item.id === value)

	return (
		<div className="flex items-center">
			<div className={clsx(classes.selectedMenu, 'flex items-center px-16', classNameTitle)}>
				{getTitle ? getTitle.name : data[0].name}
			</div>
			<IconButton
				className={clsx(classes.menuButton, 'w-40 p-0', classNameButton)}
				aria-owns={menuEl ? name : undefined}
				aria-haspopup="true"
				onClick={onOpen}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu id={name} anchorEl={menuEl} open={Boolean(menuEl)} onClose={onClose}>
				{data.map((item, index) => (
					<Tooltip title={item?.tooltip || ""} className={item?.tooltipClassName || ""} placement={ item?.tooltipPlace ? item?.tooltipPlace : "right"}>
						<div>
							<MenuItem
								key={index}
								onClick={ev => {
									onChange && onChange(item.id)
								}}
							>
								{item.name}
							</MenuItem>
						</div>
					</Tooltip>
				))}
			</Menu>
		</div>
	);
}

CmsMenu2.propTypes = {
	name: PropTypes.string,
	value: PropTypes.any,
	menuEl: PropTypes.any,
	onClose: PropTypes.func.isRequired,
	onOpen: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
	classNameTitle: PropTypes.string,
	classNameButton: PropTypes.string
};

CmsMenu2.defaultProps = {
	menuEl: null,
	onClose: null,
	onChange: null,
	onOpen: null,
	data: [],
	classNameTitle: "h-40 px-16",
	classNameButton: "h-40 p-0"
};

export default React.memo(CmsMenu2);
