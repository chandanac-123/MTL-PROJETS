// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// export const connectSocket = () => {
//     const socketUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

//     if (!socket) {
//         socket = io(socketUrl, {
//             transports: ["websocket"],
//             reconnectionAttempts: 5,
//         });
//     }
//     return socket;
// };

// export const disconnectSocket = () => {
//     if (socket) {
//         socket.disconnect();
//         socket = null;
//     }
// };

// export const getSocket = () => {
//     if (!socket) {
//         connectSocket();
//     }
//     return socket;
// };
