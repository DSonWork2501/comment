import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCo-wAE5UHlSy_aSO80XZRCXPF7jTwxqMs",
    authDomain: "central-pod-343906.firebaseapp.com",
    projectId: "central-pod-343906",
    storageBucket: "central-pod-343906.appspot.com",
    messagingSenderId: "698905740181",
    appId: "1:698905740181:web:56716eab57d343b109ac9c",
    measurementId: "G-6PX7Q6Z20T"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)

export const fetchToken = (setTokenFound, setFcmToken) => {
    return getToken(messaging, { vapidKey: 'BCJ3TiXW-OqinpOE6hIBnpNlflgfNTQw8f8H8AJ3BsZmkS_IQdOKdcm7e3qrrwXzJydyeWJX0kgpLt72Q8Oggzw' }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
            setTokenFound && setTokenFound(true);
            setFcmToken && setFcmToken(currentToken);
        }
    }).catch(err => {
        console.log(err);
    })
}

export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload)
        })
    })
}