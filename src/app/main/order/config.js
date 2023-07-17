
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
			path: '/package/:id',
			exact: true,
			component: React.lazy(() => import('./components/index/PackageEdit'))
		},
		{
			path: '/package',
			exact: true,
			component: React.lazy(() => import('./components/index/PackageEdit'))
		},
		{
			path: '/order/delivery',
			exact: true,
			component: React.lazy(() => import('./components/delivery/DetailBBBG'))
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
		},
		{
			path: '/order-delivery/:id',
			exact: true,
			component: React.lazy(() => import('./components/index/Delivery'))
		},
		{
			path: '/order-delivery',
			exact: true,
			component: React.lazy(() => import('./components/index/Delivery'))
		},
	]
};

export default ProductConfig;
