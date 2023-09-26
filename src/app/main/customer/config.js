
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
		{
			path: '/customer-manage/:id/overview/:type',
			exact: true,
			component: React.lazy(() => import('./components/customer/CustomerOverview'))
		},
		{
			path: '/partner',
			exact: true,
			component: React.lazy(() => import('./components/partner'))
		},
	]
};

export default ProductConfig;
