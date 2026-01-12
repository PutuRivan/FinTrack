"use client";

import {
  Bookmark,
  GalleryVerticalEnd,
  Handshake,
  LayoutDashboard,
  type LucideIcon,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useProfile } from "@/hooks/use-profile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/home",
      icon: LayoutDashboard,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: Handshake,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: Bookmark,
    },
    {
      title: "Wallets",
      url: "/wallets",
      icon: Wallet,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      {!open && (
        <SidebarTrigger className="lg:flex hidden mx-auto transition-all ease-in-out duration-300 my-2" />
      )}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">FinTrack</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(`${item.url}/`);
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className={
                  isActive
                    ? "bg-primary shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-primary hover:text-sidebar-primary-foreground text-sidebar-primary-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-primary))]"
                    : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                }
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span className="text-sm font-normal">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function NavUser() {
  const { data: user } = useProfile();

  // if (!user?.id) redirect("/");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip="User"
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Link href="/profile">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.image} alt="Avatar Fallback" />
              <AvatarFallback className="rounded-lg">
                {" "}
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <SidebarMenuButton
//           tooltip="User"
//           size="lg"
//           className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//           asChild
//         >
//           <Link href="/profile">
//             <Avatar className="h-8 w-8 rounded-lg">
//               <AvatarImage src={user.avatar} alt={user.name} />
//               <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//             </Avatar>
//             <div className="grid flex-1 text-left text-sm leading-tight">
//               <span className="truncate font-medium">{user.name}</span>
//               <span className="truncate text-xs">{user.email}</span>
//             </div>
//           </Link>
//         </SidebarMenuButton>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }
