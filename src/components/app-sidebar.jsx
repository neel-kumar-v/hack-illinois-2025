"use client"

import * as React from "react"
import {
  LogIn,
  BookMarked,
  CalendarFold,
  Settings
} from "lucide-react"


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {auth} from "@/firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { Skeleton } from "./ui/skeleton"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ModeToggle } from "./ui/light-night-toggle"



// This is sample data.


export function AppSidebar({
  ...props
}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  let data = {
    user: user ? {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL
    } : null,
    navMain: [
      {
        title: "Calendar",
        url: "/calendar",  
        icon: CalendarFold,
        isActive: true,
      },
      {
        title: "Login / Sign Up",
        url: "/login",
        icon: LogIn,
      },
      {
        title: "Tasks",
        url: "#",
        icon: BookMarked
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
     
    ],
  }
  // if(loading) {
  //   return (<div>Loading Sidebar...</div>)
  // }
  if (user || loading) {
    data.navMain = data.navMain.filter(item => item.url !== "/login ");
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        
      </SidebarContent>
      {
        user ?
        (<SidebarFooter>
          <NavUser user={data.user} loading={false} />
        </SidebarFooter>) : 
        (loading ?
          <SidebarFooter>
          <NavUser user={data.user} loading={true} />
        </SidebarFooter>  : null)
      }
      <SidebarRail />
    </Sidebar>
  );
}