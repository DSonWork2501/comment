importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAiLuOZTGJsd2jIXwheA9KipO9i0EVgTLg",
    authDomain: "ibpservices.firebaseapp.com",
    projectId: "ibpservices",
    storageBucket: "ibpservices.appspot.com",
    messagingSenderId: "8795696585",
    appId: "1:8795696585:web:82a242a19769b4e560cc18",
    measurementId: "G-49HSZJ62KJ"
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload){
    console.log('Receive onBackgroundMessage',payload);

    const notificationTitle=payload.notification.title;
    const notificationOptions={
        body:payload.notification.body,
    }
    self.ServiceWorkerRegistration.showNotification(notificationTitle,notificationOptions);
})