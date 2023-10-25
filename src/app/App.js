import MomentUtils from '@date-io/moment';
import '@fake-db';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Route, Router, Switch } from 'react-router-dom';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import '@fortawesome/fontawesome-svg-core/styles.css';
import store from './store';
import { Suspense } from 'react';
import { fetchToken, onMessageListener } from './../firebase.js';


const Delivery = React.lazy(() => import('./main/delivery'));
const EmployDelivery = React.lazy(() => import('./main/delivery/EmployDelivery'));
const EmployCollection = React.lazy(() => import('./main/collection/EmployCollection'));
const Collection = React.lazy(() => import('./main/collection'));
const Payyoo = React.lazy(() => import('./main/payoo'));

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();

const App = () => {
	fetchToken();
	onMessageListener().then(payload => {
		console.log(payload);
	}).catch(err => console.log(err))
	return (
		<>
			<AppContext.Provider
				value={{
					routes
				}}
			>
				<StylesProvider jss={jss} generateClassName={generateClassName}>
					<Provider store={store}>
						<Router history={history}>
							<Switch>
								<Route path="/employ-collect/:type/:session">
									<Suspense fallback={null}>
										<EmployCollection />
									</Suspense>
								</Route>
								<Route path="/collect/:collect/:session">
									<Suspense fallback={null}>
										<Collection />
									</Suspense>
								</Route>
								<Route path="/delivery/:ship/:session/:order">
									<Suspense fallback={null}>
										<Delivery />
									</Suspense>
								</Route>
								<Route path="/employ-delivery/:type/:session">
									<Suspense fallback={null}>
										<EmployDelivery />
									</Suspense>
								</Route>
								<Route path="/payoo/transaction/:code">
									<Suspense fallback={null}>
										<Payyoo />
									</Suspense>
								</Route>
								<Route path="/*">
									<MuiPickersUtilsProvider utils={MomentUtils}>
										<Auth>
											<FuseAuthorization>
												<FuseTheme>
													<FuseLayout />
												</FuseTheme>
											</FuseAuthorization>
										</Auth>
									</MuiPickersUtilsProvider>
								</Route>
							</Switch>
						</Router>
					</Provider>
				</StylesProvider>
			</AppContext.Provider >
		</>

	);
};

export default App;
