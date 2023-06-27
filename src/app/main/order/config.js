
import React from 'react';

const ProductConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/order',
			exact: true,
			component: React.lazy(() => import('./components/index'))
		},
		{
			path: '/order/package/:id',
			exact: true,
			component: React.lazy(() => import('./components/index/PackageEdit'))
		},
		{
			path: '/order/:status',
			exact: true,
			component: React.lazy(() => import('./components/index'))
		},
		{
			path: '/order/edit/:cusId/:orderId',
			exact: true,
			component: React.lazy(() => import('./components/edit/index'))
		}
	]
};

export default ProductConfig;
