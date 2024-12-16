// Import Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

// Your Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDvVDSiEiYVL5N5kDkuIirFaJGLHajTC60",
    authDomain: "echo-c1a63.firebaseapp.com",
    projectId: "echo-c1a63",
    storageBucket: "echo-c1a63.appspot.com",
    messagingSenderId: "444717019254",
    appId: "1:444717019254:web:27309fd0b73d4a750e6f57",
    measurementId: "G-MPYDV45YGF",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
    console.log('Background Messages: ', payload);
    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
        body: payload.notification?.body,
        icon: './firebase_logo.png',
        data: { 'url': payload?.data?.url || '/' }
    };
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});

self.addEventListener('notificationclick', function (event) {
    console.log('event: ', event);
    event.notification.close();
    const urlToOpen = event?.notification?.data?.url;
    if (urlToOpen) {
        event.waitUntil(
            clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            }).then(function (windowClients) {
                // If there's an open window, focus on it; otherwise, open a new one
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    if ('focus' in client) {
                        return client.focus();
                    }
                }
                return clients.openWindow(urlToOpen);
            })
        );
    }
});
