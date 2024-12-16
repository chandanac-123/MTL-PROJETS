"use client";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect, useRef } from "react";
import useFcmToken from "./useFCMToken";
import firebaseApp from "@/firebase";
import { showToast } from "@/components/custome-toast";

export default function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const prevFCMMessageId = useRef<string | undefined>("");

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);

        const unsubscribe = onMessage(messaging, (payload: any) => {
          if (prevFCMMessageId.current !== payload?.messageId) {
            prevFCMMessageId.current = payload?.messageId;
            if (payload?.notification) {
              console.log("In App Notification:", payload);
              showToast("info",payload?.notification?.body,undefined,payload?.notification?.title);
            } else {
              console.warn("Notification payload missing content:", payload);
            }
          }
        });

        // Cleanup the onMessage listener on component unmount
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // Component exists solely for foreground notification handling
}
