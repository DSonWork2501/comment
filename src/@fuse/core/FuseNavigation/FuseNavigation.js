import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import FuseNavHorizontalCollapse from './horizontal/FuseNavHorizontalCollapse';
import FuseNavHorizontalGroup from './horizontal/FuseNavHorizontalGroup';
import FuseNavHorizontalItem from './horizontal/FuseNavHorizontalItem';
import FuseNavHorizontalLink from './horizontal/FuseNavHorizontalLink';
import FuseNavVerticalCollapse from './vertical/FuseNavVerticalCollapse';
import FuseNavVerticalGroup from './vertical/FuseNavVerticalGroup';
import FuseNavVerticalItem from './vertical/FuseNavVerticalItem';
import FuseNavVerticalLink from './vertical/FuseNavVerticalLink';
import FuseNavItem, { registerComponent } from './FuseNavItem';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { logoutUser } from 'app/auth/store/userSlice';
import history from '@history'

/*
Register Fuse Navigation Components
 */
registerComponent('vertical-group', FuseNavVerticalGroup);
registerComponent('vertical-collapse', FuseNavVerticalCollapse);
registerComponent('vertical-item', FuseNavVerticalItem);
registerComponent('vertical-link', FuseNavVerticalLink);
registerComponent('horizontal-group', FuseNavHorizontalGroup);
registerComponent('horizontal-collapse', FuseNavHorizontalCollapse);
registerComponent('horizontal-item', FuseNavHorizontalItem);
registerComponent('horizontal-link', FuseNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

const useStyles = makeStyles(theme => ({
	navigation: {
		'& .list-item': {
			'&:hover': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
			},
			'&:focus:not(.active)': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
			}
		}
	},
	verticalNavigation: {
		'&.active-square-list': {
			'& .list-item, & .active.list-item': {
				width: '100%',
				borderRadius: '0'
			}
		},
		'&.dense': {
			'& .list-item': {
				paddingTop: 0,
				paddingBottom: 0,
				height: 32
			}
		}
	},
	horizontalNavigation: {
		'&.active-square-list': {
			'& .list-item': {
				borderRadius: '0'
			}
		},
		'& .list-item': {
			padding: '8px 12px 8px 12px',
			height: 40,
			minHeight: 40,
			'&.level-0': {
				height: 44,
				minHeight: 44
			},
			'& .list-item-text': {
				padding: '0 0 0 8px'
			}
		}
	},
	'@global': {
		'.popper-navigation-list': {
			'& .list-item': {
				padding: '8px 12px 8px 12px',
				height: 40,
				minHeight: 40,
				'& .list-item-text': {
					padding: '0 0 0 8px'
				}
			},
			'&.dense': {
				'& .list-item': {
					minHeight: 32,
					height: 32,
					'& .list-item-text': {
						padding: '0 0 0 8px'
					}
				}
			}
		}
	}
}));

function FuseNavigation(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const { navigation, layout, active, dense, className } = props;
	const settings = useSelector(({ fuse }) => fuse.settings.current);

	const verticalNav = (
		<>
			<List
				className={clsx(
					'navigation whitespace-no-wrap',
					classes.navigation,
					classes.verticalNavigation,
					`active-${active}-list`,
					dense && 'dense',
					className
				)}
			>
				{navigation.map(_item => (
					<FuseNavItem key={_item.id} type={`vertical-${settings.layout.style === 'layout3' ? _item.type : 'collapse'}`} item={_item} nestedLevel={0} />
				))}
			</List>
			<MenuItem
				onClick={() => window.open('https://nhanh.vn/oauth?version=2.0&appId=73437&returnLink=https://4person.sytes.net/api/identity/nhanhvn', '_blank')}

			>
				<ListItemIcon  className="min-w-44">
					<Icon>double_arrow</Icon>
				</ListItemIcon>
				<ListItemText primary="NhanhVN" />
			</MenuItem>
			<MenuItem
				onClick={() => {
					dispatch(logoutUser());
					history.push('/login')
				}}
			>
				<ListItemIcon className="min-w-44">
					<Icon>exit_to_app</Icon>
				</ListItemIcon>
				<ListItemText primary="Đăng xuất" />
			</MenuItem>
		</>
	);

	const horizontalNav = (
		<List
			className={clsx(
				'navigation whitespace-no-wrap flex p-0',
				classes.navigation,
				classes.horizontalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<FuseNavItem
					key={_item.id}
					type={`horizontal-${_item.type}`}
					item={_item}
					nestedLevel={0}
					dense={dense}
				/>
			))}
		</List>
	);

	if (navigation.length > 0) {
		switch (layout) {
			case 'horizontal': {
				return horizontalNav;
			}
			case 'vertical':
			default: {
				return verticalNav;
			}
		}
	} else {
		return null;
	}
}

FuseNavigation.propTypes = {
	navigation: PropTypes.array.isRequired
};

FuseNavigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(FuseNavigation);
