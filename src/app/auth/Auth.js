import history from '@history'
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { setUserDataFirebase, setUserDataAuth0, setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([
			// Comment the lines which you do not use
			// this.firebaseCheck(),
			// this.auth0Check(),
			this.jwtCheck()
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	jwtCheck = () =>
		new Promise((resolve, reject) => {
			jwtService.on('onAutoLogin', () => {
				// this.props.showMessage({ message: 'Logging in with JWT' });

				/**
				 * Sign in and retrieve user data from Api
				 */
				jwtService.signInWithToken()
					.then(user => {
						this.props.setUserData(user);

						resolve();

						// this.props.showMessage({ message: 'Logged in with JWT' });
					})
					.catch(error => {
						// this.props.showMessage({ message: error.message });
						resolve();
					});
			});

			jwtService.on('onAutoLogout', message => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logout();
				history.push('/login')
				resolve();
			});

			jwtService.on('onNoAccessToken', () => {
				resolve();
			});

			jwtService.on('handleError', error => {
				let response = error.response;
				if (response) {
					const config = response.config ? response.config : null;
					if (response.data) {
						let dataResponse = response.data
						if (dataResponse.errors && dataResponse.errors.length > 0) {
							let errors = dataResponse.errors
							let obError = errors[0]
							if (obError) {
								if (obError.message) {
									this.props.showMessage({ variant: "error", message: obError.message });
								}
							}
						}
						else if (dataResponse && dataResponse.data && Array.isArray(dataResponse.data) && dataResponse.data.length > 0) {
							//this.props.showMessage({variant: "error", message: JSON.stringify(dataResponse.data) || "" });
						}
						else {
							this.props.showMessage({ variant: "error", message: `${config.method.toUpperCase()} - ${config.url} | message: ${(response.data && response.data.errors && JSON.stringify(response.data.errors)) || ""}` });
						}
					} else {
						this.props.showMessage({ variant: "error", message: `${config.method.toUpperCase()} - ${config.url} | message: ${(response.data && response.data.errors && JSON.stringify(response.data.errors)) || ""}` });
					}
				} else {
					// this.props.showMessage({ message: error.message });
				}

				return reject('error');
			})

			jwtService.init();

			return Promise.resolve();
		});

	auth0Check = () =>
		new Promise(resolve => {
			auth0Service.init(success => {
				if (!success) {
					resolve();
				}
			});

			if (auth0Service.isAuthenticated()) {
				this.props.showMessage({ message: 'Logging in with Auth0' });

				/**
				 * Retrieve user data from Auth0
				 */
				auth0Service.getUserData().then(tokenData => {
					this.props.setUserDataAuth0(tokenData);

					resolve();

					this.props.showMessage({ message: 'Logged in with Auth0' });
				});
			} else {
				resolve();
			}

			return Promise.resolve();
		});

	firebaseCheck = () =>
		new Promise(resolve => {
			firebaseService.init(success => {
				if (!success) {
					resolve();
				}
			});

			firebaseService.onAuthStateChanged(authUser => {
				if (authUser) {
					this.props.showMessage({ message: 'Logging in with Firebase' });

					/**
					 * Retrieve user data from Firebase
					 */
					firebaseService.getUserData(authUser.uid).then(
						user => {
							this.props.setUserDataFirebase(user, authUser);

							resolve();

							this.props.showMessage({ message: 'Logged in with Firebase' });
						},
						error => {
							resolve();
						}
					);
				} else {
					resolve();
				}
			});

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
			setUserDataAuth0,
			setUserDataFirebase,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
