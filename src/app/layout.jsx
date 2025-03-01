import "./globals.css";


export const metadata = {
  title: "Task Overflow",
  description: "Task Overflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link href="/dist/styles.css" rel="stylesheet"></link> */}
      </head>
      <body
        className={`scroll-smooth antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
