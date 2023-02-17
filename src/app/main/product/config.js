
import React from 'react';

const ProductConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/product',
			exact: true,
			component: React.lazy(() => import('./components/product'))
		},
		{
			path: '/product-category',
			exact: true,
			component: React.lazy(() => import('./components/category'))
		},
		{
			path: '/product/:id',
			exact: true,
			component: React.lazy(() => import('./components/product/edit'))
		},
	]
};

export default ProductConfig;
