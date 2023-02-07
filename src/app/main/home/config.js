import React from 'react';

const Error404PageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/home',
			component: React.lazy(() => import('.'))
		}
	]
};

export default Error404PageConfig;
