"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { SocketProvider } from "../../components/context/SocketContext";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <SocketProvider> */}
        {children}
      {/* </SocketProvider> */}
    </QueryClientProvider>
  )
}
