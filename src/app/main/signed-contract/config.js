
import React from 'react';

const SignedContractConfig = {
	settings: {
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/signed-contract',
			exact: true,
			component: React.lazy(() => import('./components/index'))
		},
	]
};

export default SignedContractConfig;
