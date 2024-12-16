import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/reactquery-provider";
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

const FcmTokenComp = dynamic(() => import('@/utils/firebaseForeground'), { ssr: false });

const poppins = Poppins({ subsets: ["latin"], weight: ['400'] });

export const metadata: Metadata = {
  title: "Echo Women App",
  description: "Together, We Rise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Trirong&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Trirong:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className={poppins.className}>
        <FcmTokenComp />
        <ReactQueryProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
