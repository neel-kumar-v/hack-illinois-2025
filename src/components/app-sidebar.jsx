"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {auth} from "@/firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useRouter } from 'next/navigation'
import Link from 'next/link'



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
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Calendar",
        url: "/calendar",  
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Login",
        url: "/login",
        icon: Bot,
      },
      {
        title: "Sign Up",
        url: "/login",
        icon: BookOpen,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
      },
    ],
  }
  // if(loading) {
  //   return (<div>Loading Sidebar...</div>)
  // }
  if (user) {
    data.navMain = data.navMain.filter(item => item.title !== "Login" && item.title !== "Sign Up");
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
        if (user) {
          return (
            <SidebarFooter>
              <NavUser user={data.user} />
            </SidebarFooter>
          )
        }
      }
      <SidebarRail />
    </Sidebar>
  );
}