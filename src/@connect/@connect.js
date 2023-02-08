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
            login: (email, password, fastlg, otp) => axios.post(`${baseurl}/api/identity/login`, { email, password, fastlg, otp },
                // { headers: { "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept", "Access-Control-Allow-Origin": "*" }, }
            ),
            // login: (email, password, fastlg, otp) => fetch(`${baseurl}/api/identity/login`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Access-Control-Allow-Origin': '*'
            //         },
            //         mode: 'cors',
            //         body: JSON.stringify({ email, password, fastlg, otp })
            //     }),
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