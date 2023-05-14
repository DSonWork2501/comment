
import React from 'react';

const ContractConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/contract',
			exact: true,
			component: React.lazy(() => import('./components/index'))
		},
	]
};

export default ContractConfig;
