import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Task Overflow",
  description: "Task Overflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="/dist/styles.css" rel="stylesheet"></link>
      </head>
      <body
        className={`scroll-smooth antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
