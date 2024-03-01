import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import MessageBar from "./MessageBar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Truck Accessory",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div >
            <MessageBar />
          <div className="sticky top-0 z-10">
            <NavBar />
          </div>
            {children}
            <Footer />
        </div>
      </body>
    </html>
  );
}
