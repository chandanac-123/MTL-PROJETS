// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { connectSocket, disconnectSocket, getSocket } from "../../utils/socket";

// interface SocketContextProps {
//   socket: ReturnType<typeof getSocket> | null;
// }

// const SocketContext = createContext<SocketContextProps | null>(null);

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (context === null) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return context;
// };

// export const SocketProvider = ({ children }: { children: ReactNode }) => {
//   const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(null);

//   useEffect(() => {
//     const socketInstance = connectSocket();
//     setSocket(socketInstance);

//     return () => {
//       disconnectSocket();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
