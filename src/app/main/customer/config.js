
import React from 'react';

const ProductConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/customer',
			exact: true,
			component: React.lazy(() => import('./components/customer'))
		},
		{
			path: '/account',
			exact: true,
			component: React.lazy(() => import('./components/account'))
		},
		{
			path: '/customer-manage',
			exact: true,
			component: React.lazy(() => import('./components/customer/CustomerManage'))
		},
	]
};

export default ProductConfig;
