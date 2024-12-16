
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyASlhJ6qeq2heRYVYgQQTrLow_KfDec0zA",
    authDomain: "rent-ease-f860e.firebaseapp.com",
    projectId: "rent-ease-f860e",
    storageBucket: "rent-ease-f860e.appspot.com",
    messagingSenderId: "307871066901",
    appId: "1:307871066901:web:1c2e3ca3ab96999b05171c",
    measurementId: "G-RPR48W14BH"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
    console.log('payload: ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "https://api.njrms.in/pub/static/images/nj_group_1.png",
        data: { 'url': payload?.data?.url }
    };
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});

// self.addEventListener('push', function (event) {
//     const payload = event.data.json();
//     const notificationTitle = payload.data.title;
//     const notificationOptions = {
//         body: payload.data.body,
//         icon: "https://rms.api.dev.2.mtlstaging.com/pub/static/images/nj_group_1.png",
//         data: { 'url': payload?.data?.url }
//     };
//     return self.registration.showNotification(
//         notificationTitle,
//         notificationOptions
//     );
// });


self.addEventListener('notificationclick', function (event) {
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