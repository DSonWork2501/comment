import React from 'react';

const HomeConfig = {
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

export default HomeConfig;
