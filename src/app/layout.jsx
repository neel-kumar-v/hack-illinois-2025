import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"



import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });


export const metadata = {
  title: "Task Overflow",
  description: "Task Overflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`scroll-smooth antialiased bg-white`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar></AppSidebar>
              <main className={`${inter.className} w-screen`}>
                {children}
              </main>
              
            </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
