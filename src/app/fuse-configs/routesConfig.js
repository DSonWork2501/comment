import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginConfig from 'app/main/login/LoginConfig'
import Error404PageConfig from 'app/main/errors/404/Error404PageConfig';
import Error500PageConfig from 'app/main/errors/500/Error500PageConfig';
import HomeConfig from 'app/main/home/config'
import ProductConfig from 'app/main/product/config'
import CustomerConfig from 'app/main/customer/config'
import OrderConfig from 'app/main/order/config'
import CustomerShelfConfig from 'app/main/customer-shelf/config';

const routeConfigs = [
	LoginConfig,
	Error404PageConfig,
	Error500PageConfig,
	HomeConfig,
	ProductConfig,
	CustomerConfig,
	OrderConfig,
	CustomerShelfConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/home" />
	},
	{
		component: () => <Redirect to="/error-404" />
	}
];

export default routes;
