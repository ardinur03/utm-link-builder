
"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { Home, Settings, User, LogOut, Link2 as LinkIconLucide } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');

    if (token && apiBaseUrl) {
      try {
        await fetch(`${apiBaseUrl}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Though no body is sent, it's good practice
          },
        });
        // Assuming logout is successful or we want to proceed regardless
      } catch (error) {
        console.error("Logout API call failed:", error);
        // Optionally, show an error toast, but still proceed to log out locally
        toast({
          title: "Logout Error",
          description: "Could not reach logout service, logging out locally.",
          variant: "destructive",
        });
      }
    } else if (!apiBaseUrl) {
       console.error("API base URL is not configured for logout.");
       toast({
          title: "Configuration Error",
          description: "Logout service is not configured.",
          variant: "destructive",
        });
    }

    localStorage.removeItem('access_token');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login');
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
              <SidebarMenuButton asChild isActive={pathname === '/dashboard/utm-generator'} tooltip="UTM Generator">
                <Link href="/dashboard/utm-generator">
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
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10 h-[57px]">
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
