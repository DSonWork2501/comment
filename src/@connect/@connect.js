import axios from 'axios'
export const baseurl = process.env.REACT_APP_API_BASE_URL
export default {
    mock: {

    },
    live: {
        identity: {
            /**
             * @description login
             */
            login: (email, password, fastlg, otp) => axios.post(`${baseurl}/api/identity/login`, { email, password, fastlg, otp }),
            /**
             * 
             * @@description logout
             */
            logout: () => axios.post(`${baseurl}/identity/logOut`),
            /**
             * @description refreshToken
             */
            refreshToken: (token, refreshToken) => axios.post(`${baseurl}/identity/refreshToken`, { token, refreshToken }),
        },
    },
}