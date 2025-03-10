"use client"

import {
  Settings,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {logout} from "@/firebase/firebaseConfig.js"

import { Skeleton } from "./ui/skeleton"

import Link from "next/link"

export function NavUser({
  user, loading
}) {
  const { isMobile } = useSidebar()

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                {loading ? <Skeleton></Skeleton> : <AvatarImage src={user.avatar} alt={user.name} />}
                
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {loading ? <Skeleton></Skeleton> : <span className="truncate font-medium">{user.name}</span>}
                {loading ? <Skeleton></Skeleton> : <span className="truncate text-xs">{user.email}</span>}
              </div>
              {loading ? null : <ChevronsUpDown className="ml-auto size-4" />} 
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {loading ? <Skeleton className="w-full h-full"></Skeleton> : <AvatarImage src={user.avatar} alt={user.name} />}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {loading ? <Skeleton className="w-16 h-full"></Skeleton> : <span className="truncate font-medium">{user.name}</span>}
                  {loading ? <Skeleton className="w-16 h-full"></Skeleton> : <span className="truncate text-xs">{user.email}</span>}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <button onClick={logout}> 
              <Link href='/login' >
                Log Out
            </Link></button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
