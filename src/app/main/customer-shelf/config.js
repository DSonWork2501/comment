
import React from 'react';

const CustomerShelfConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/customer-shelf',
			exact: true,
			component: React.lazy(() => import('./index'))
		},
		// {
		// 	path: '/customer-shelf/:id',
		// 	exact: true,
		// 	component: React.lazy(() => import('./components/customer-shelf/edit'))
		// },
	]
};

export default CustomerShelfConfig;
