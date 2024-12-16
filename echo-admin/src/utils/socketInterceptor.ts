// import { getSocket } from "./socket";

// export const setupSocketInterceptors = (
//   setMessages: React.Dispatch<React.SetStateAction<string[]>>,
//   action: string
// ) => {
//   const socket = getSocket();

//   if (!socket) return () => { };

//   socket.on(action, (message: string) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   });

//   return () => {
//     socket.off(action);
//   };
// };
