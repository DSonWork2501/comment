import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAiLuOZTGJsd2jIXwheA9KipO9i0EVgTLg",
    authDomain: "ibpservices.firebaseapp.com",
    projectId: "ibpservices",
    storageBucket: "ibpservices.appspot.com",
    messagingSenderId: "8795696585",
    appId: "1:8795696585:web:82a242a19769b4e560cc18",
    measurementId: "G-49HSZJ62KJ"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)
export const fetchToken = (setTokenFound, setFcmToken) => {
    console.log(1232);

    return getToken(messaging, { vapidKey: 'SrT72CGwoavpDbLb_Wg7ygSNZ-NXf6zeXK4jvZ2Z5RM' }).then((currentToken) => {
        console.log(currentToken);
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