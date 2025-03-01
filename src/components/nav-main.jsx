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

export function NavMain({
  items
}) {
  return (
    (<SidebarGroup>
      <SidebarGroupLabel className="mb-2"><div className="font-bold text-xl md:text-3xl">Task Overflow</div></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton key={item.title} asChild>
            <Link href={item.url}>
                <item.icon className="w-5 h-5" />
                {item.title}
            </Link>
            {/* <div className="ds">{item.title}</div> */}
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
