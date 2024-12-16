import React, { useContext } from 'react'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import firebase from '../firebase';
import { Context } from "./context/Context";

const FirbaseSetup = () => {
  const { firebaseToken, setFirebaseToken } = useContext(Context);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);


  Notification.requestPermission().then(async (permission) => {
    console.log('permission: ', permission);
    if (permission === 'granted') {
      getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPIED_KEY });

      const message = firebase.messaging();
      const generate = async () => {
        const token = await message.getToken();
        setFirebaseToken(token)
        console.log(token, '-----------------');
      };
      generate();
      console.log('Notification permission granted.');
    } else if (permission === 'denied') {
      console.log('Notification permission denied.');
    } else {
      console.log('Notification permission dismissed or blocked.');
    }
  });

  return (null);
};
export default FirbaseSetup