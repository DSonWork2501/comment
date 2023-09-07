import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAiLuOZTGJsd2jIXwheA9KipO9i0EVgTLg",
    authDomain: "ibpservices.firebaseapp.com",
    projectId: "ibpservices",
    storageBucket: "ibpservices.appspot.com",
    messagingSenderId: "8795696585",
    appId: "1:8795696585:web:82a242a19769b4e560cc18",
    measurementId: "G-49HSZJ62KJ",
    databaseURL: "https://ibpservices-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const db = getFirestore(app);
export const database = getDatabase(app);

export const fetchToken = (setTokenFound, setFcmToken) => {
    return getToken(messaging, { vapidKey: 'BL9-Yj-o8tAVC8rl__bP0fZ4QmGGNNB5qBpKWc_NKJcmnjGXiflvQ4Fqle649JMMBlTCqHXbh55oBpWVevhtd_Y' }).then((currentToken) => {
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