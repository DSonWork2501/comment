
import React from 'react';

const ProductConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/order',
			exact: true,
			component: React.lazy(() => import('./components/'))
		}
	]
};

export default ProductConfig;
