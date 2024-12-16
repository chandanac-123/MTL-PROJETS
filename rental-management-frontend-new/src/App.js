import { useContext, useEffect, useState } from "react";
import MessageManager from "./Errors/Alert/MessageManager";
import Index from "./Routes";
import firebase from "./firebase";
import { Context } from "./Utils/context/Context";
import Notifications from "./Layout/Components/Notification";
import sound from "./Static/sound/sound.mp3";
import Confirmation from "./Common/Confirmation";

function App() {
  const { firebaseToken, setFirebaseToken } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });


  // console.log('window.navigator', window.navigator);

  // const requestFirebaseNotificationPermission = async () => {
  //   const messaging = firebase.messaging();
  //   try {
  //     const token = await messaging.getToken({
  //       vapidKey: process.env.REACT_APP_FIREBASE_VAPIED_KEY, // Replace with your actual VAPID key
  //     });
  //     if (token) {
  //       setFirebaseToken(token);
  //       localStorage.setItem('firebase-token', token)
  //       console.log("FCM Token:", token);
  //     } else {
  //       console.warn("No registration token available. Request permission to generate one.");
  //     }
  //   } catch (error) {
  //     console.error("Error obtaining FCM token:", error);
  //   }
  //   setIsModalOpen(false)
  // };

  const requestFirebaseNotificationPermission = async () => {
    setIsLoading(true)
    const messaging = firebase.messaging();
    try {
      console.log('Requesting notification permission...');
      const permission = await Notification.requestPermission();
      
      console.log('Permission result:', permission);
      setIsLoading(false)
      if (permission === "granted") {
        setIsLoading(true)
        const token = await messaging.getToken({
          vapidKey: process.env.REACT_APP_FIREBASE_VAPIED_KEY,
        });
        console.log('FCM Token:', token);
        if (token) {
          setFirebaseToken(token);
          localStorage.setItem('firebase-token', token);
          setIsLoading(false)
        } else {
          console.warn('Token generation failed: No registration token available.');
        }
      } else {
        console.warn('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error during notification setup:', error);
    }

    setIsModalOpen(false);
  };


  useEffect(() => {
    if (!localStorage.getItem('firebase-token') && !localStorage.getItem('user')) {
       setIsModalOpen(true) }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
          const messaging = firebase.messaging();
          messaging.onMessage((payload) => {
            console.log("Message received:", payload);
            setNotification({
              title: payload?.data?.title,
              body: payload?.data?.body,
            });
            const audio = new Audio(sound);
            audio.play();
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <div>
      <Confirmation isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        onClick={() => requestFirebaseNotificationPermission()}
        titleHead='Notification Permission'
        message='Get real-time updates and notifications directly on your device. Enable notifications now!'
        buttonText={!isLoading ? 'Allow' : ''}
        loading={isLoading}
        width={400} />
      <Notifications data={notification} setNotification={setNotification} />
      <MessageManager />
      <Index />
    </div>
  );
}

export default App;
