
import React from 'react';

const ProductConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/product',
			exact: true,
			component: React.lazy(() => import('.'))
		}
	]
};

export default ProductConfig;
