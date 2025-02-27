import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./provider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS Dashboard",
  description: "Next.js Learning Plate Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
       
          {children} <ToastContainer position="bottom-right" theme="dark" />
          <Footer />
          </AuthProvider>
        
        </body>
      </html>

  );
}
