import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */
import connect from '@connect'

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					// if you ever get an unauthorized response, logout the user
					// if (err.response && err.response.status && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {

					if (err.response && err.response.status && err.response.status === 401) {
						let accessToken = this.getAccessToken()
						let refreshToken = this.getRefreshToken()
						if (accessToken && refreshToken) {

							this.handleRefreshToken().catch(error => {
								this.setSession(null)
								reject()
							})
						} else {
							this.setSession(null)
							this.emit('onAutoLogout', 'Đăng nhập thất bại!')
							resolve()
						}
					}
					this.emit("handleError", err);
					reject(err)
					// throw err
				});
			}
		);
	};

	handleAuthentication = () => {
		const token = {
			access_token: this.getAccessToken(),
			refresh_token: this.getRefreshToken()
		}

		if (!token.access_token) {
			this.emit('onNoAccessToken');
			return;
		}

		this.emit('onAutoLogin', true);

		/**Đoạn xử lý token hết hạn dựa vào thời gian */
		// if (this.isAuthTokenValid(token.access_token)) {
		// 	this.setSession(token);
		// } else {
		// 	this.setSession(null);
		// 	this.emit('onAutoLogout', 'token hết hạn');
		// }
	};

	signInWithEmailAndPassword = (email, password, type, otp) => {
		return new Promise((resolve, reject) => {

			connect.live.identity.login(email, password, type, otp)
				.then(response => {
					if (response?.data?.data?.token && response?.data?.data?.refreshToken) {
						let token = {
							access_token: response.data.data.token,
							refresh_token: response.data.data.refreshToken,
						}
						this.setSession(token);
						this.setUser(email);

						const data = {
							data: {
								displayName: email,
								email: '',
								photoURL: 'assets/images/avatars/avatar-user.png',
								settings: {},
								shortcuts: []
							}, ...response.data.data, redirectUrl: "/home"
						}

						resolve(data);
					} else {
						reject(response.data.message);
					}
				}).catch(error => {
					// // console.log('error', error)
					reject(error);
				})
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			const getToken = () => new Promise((resolve, reject) => {
				this.emit('handleRefreshToken')

				let token = this.getAccessToken()
				let refreshToken = this.getRefreshToken()
				let user = this.getUser()
				if (token) {
					resolve({ token, user, refreshToken })
				} else {
					reject()
				}
			})

			getToken().then(value => {
				if (value.token) {
					let token = {
						access_token: value.token,
						refresh_token: value.refreshToken
					}
					this.setSession(token);
					this.setUser(value.user);

					const data = { data: { displayName: value.user, email: '', shortcuts: [] }, user: value.user, success: true, token: value.token, redirectUrl: "/" }
					resolve(data);

				} else {
					this.logout();
					reject(new Error('Failed to get user info.'));
				}
			})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				})
		})
	}

	handleRefreshToken = () => {
		return new Promise((resolve, reject) => {
			let token = this.getAccessToken()
			let refreshToken = this.getRefreshToken()
			let email = this.getUser()
			connect.live.identity.refreshToken(token, refreshToken)
				.then(response => {
					if (response?.data?.data?.token && response?.data?.data?.refreshToken) {
						let token = {
							access_token: response.data.data.token,
							refresh_token: response.data.data.refreshToken,
						}
						this.setSession(token);
						this.setUser(email);
						const data = {
							data: {
								displayName: email,
								email: '',
								photoURL: 'assets/images/avatars/avatar-user.png',
								settings: {},
								shortcuts: []
							}, ...response.data.data, redirectUrl: "/"
						}

						resolve(data);
					} else {
						this.logout();
						reject(new Error('Failed to get user info.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				})
		})
	}


	setSession = token => {
		if (token && token.access_token && token.refresh_token) {
			localStorage.setItem('jwt_access_token', token.access_token);
			localStorage.setItem('jwt_refresh_token', token.refresh_token);
			axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			localStorage.removeItem('jwt_refresh_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	setUser = user => {
		localStorage.setItem('user', user);
	};

	logout = () => {
		// connect.live.identity.logout()
		this.setSession(null);
		this.setUser(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}
		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
	getUser = () => {
		return window.localStorage.getItem('user');
	};
	getRefreshToken = () => {
		return window.localStorage.getItem('jwt_refresh_token');
	};
}

const instance = new JwtService();

export default instance;
