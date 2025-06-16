
"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Settings, User, LogOut, Link2 as LinkIconLucide } from 'lucide-react'; // Renamed to avoid conflict

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // A simple logout function placeholder
  const handleLogout = () => {
    // Here you would typically clear tokens/session and redirect to login
    console.log("Logout clicked");
    // For now, let's redirect to login page as an example
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // router.push('/login');
    alert("Logout functionality to be implemented. Redirecting to /login for now.");
    window.location.href = '/login'; // Simple redirect for now
  };


  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-2 flex justify-center items-center">
            <Button variant="ghost" className="w-full justify-start px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0">
              <LinkIconLucide className="h-5 w-5 group-data-[collapsible=icon]:size-5" />
              <span className="group-data-[collapsible=icon]:hidden ml-2">UTM Tools</span>
            </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard">
                <Link href="/dashboard">
                  <Home />
                  <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="UTM Generator">
                <Link href="/">
                  <LinkIconLucide />
                  <span className="group-data-[collapsible=icon]:hidden">UTM Generator</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/settings')} tooltip="Settings">
                <Link href="/dashboard/settings">
                  <Settings />
                  <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10 h-[57px]"> {/* Added fixed height */}
          <div className="flex items-center">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-xl font-semibold hidden sm:block">Dashboard</h1>
          </div>
            <Button variant="ghost" size="icon">
                <User className="h-5 w-5"/>
                <span className="sr-only">User Profile</span>
            </Button>
        </header>
        <main className="p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
