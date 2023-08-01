
import React from 'react';

const ProductConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/meta',
			exact: true,
			component: React.lazy(() => import('./page/index'))
		},
		{
			path: '/meta/user-delivery',
			exact: true,
			component: React.lazy(() => import('./page/UserDelivery'))
		},
		{
			path: '/meta/vehicle-delivery',
			exact: true,
			component: React.lazy(() => import('./page/VehicleDelivery'))
		},
	]
};

export default ProductConfig;
