"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import Link  from "next/link"
import { ModeToggle } from "./ui/light-night-toggle";

export function NavMain({
  items
}) {
  return (
    (<SidebarGroup>
      <SidebarGroupLabel className="mb-2"> <img src="/hack.svg" alt="Task Overflow Icon" className="!size-8 !stroke-black dark:stroke-white" /> <div className="text-black font-semibold text-lg md:text-2xl ml-2">Task Overflow</div></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton key={item.title} asChild className="transition-all">
            <Link href={item.url} className="text-xl flex flex-row align-center !first:pt-0 !last:pb-0 !py-6">
                <item.icon className="!size-6" />
                <p>{item.title}</p>
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
