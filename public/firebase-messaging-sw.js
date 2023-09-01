importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCo-wAE5UHlSy_aSO80XZRCXPF7jTwxqMs",
    authDomain: "central-pod-343906.firebaseapp.com",
    projectId: "central-pod-343906",
    storageBucket: "central-pod-343906.appspot.com",
    messagingSenderId: "698905740181",
    appId: "1:698905740181:web:56716eab57d343b109ac9c",
    measurementId: "G-6PX7Q6Z20T"
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