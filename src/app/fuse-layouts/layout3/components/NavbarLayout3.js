import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import React from 'react';
import Logo from 'app/fuse-layouts/shared-components/Logo';
// import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import FuseSearch from '@fuse/core/FuseSearch';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	menuMaxWidth: {
		maxWidth: 'calc(100% - 230px)'
	},
}));

function NavbarLayout3() {
	const classes = useStyles();
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<Toolbar className="w-full p-0 min-h-48 md:min-h-64 pr-8">
				<div className={clsx("flex flex-auto items-center w-full h-full container px-16 lg:px-24", classes.menuMaxWidth)}>
					<div className={clsx('flex flex-shrink-0 items-center')}>
						<Logo />
					</div>
					<FuseScrollbars className={clsx("flex h-full items-center overflow-x-auto")}>
						<Navigation className="w-full py-5" layout="horizontal" dense />
					</FuseScrollbars>
				</div>
				<div className="flex items-center px-8 md:px-0 min-w-230">
					{/* <LanguageSwitcher /> */}
					<FullScreenToggle />
					<FuseSearch />
					<UserMenu />
					{/* <QuickPanelToggleButton /> */}
				</div>
			</Toolbar>
		</div>
	);
}

export default React.memo(NavbarLayout3);
