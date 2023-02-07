import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectNavigationCustom } from 'app/store/fuse/navigationSlice';

function Navigation(props) {
	const authActions = useSelector(({ auth }) => auth.user.role);
	const navigation = useSelector(selectNavigationCustom(authActions, 8, 3));
	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={navigation}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
