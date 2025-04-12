'use client';

import {SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarHeader} from '@/components/ui/sidebar';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {Icons} from '@/components/icons';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';

export default function Home() {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <React.Fragment>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">Telehealth Hub</CardTitle>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/"} >
                  <Icons.home className="mr-2 h-4 w-4"/>
                  <Link href="/" >Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/teleconsultation"}>
                  <Icons.video className="mr-2 h-4 w-4"/>
                  <Link href="/teleconsultation">Teleconsultation</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/appointment-booking"}>
                  <Icons.plusCircle className="mr-2 h-4 w-4"/>
                  <Link href="/appointment-booking">Appointment Booking</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/prescription-management"}>
                  <Icons.file className="mr-2 h-4 w-4"/>
                  <Link href="/prescription-management">Prescription Management</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/health-records"}>
                  <Icons.shield className="mr-2 h-4 w-4"/>
                  <Link href="/health-records">Electronic Health Records</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/ai-diagnosis"}>
                  <Icons.workflow className="mr-2 h-4 w-4"/>
                  <Link href="/ai-diagnosis">AI Diagnosis</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">Dashboard</CardTitle>
              <CardDescription>
                Welcome to your telehealth hub. Manage appointments, consult with patients, and access health records.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar/>
              <Avatar>
                <AvatarImage src="https://picsum.photos/500/500" alt="Profile"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <SidebarTrigger asChild>
                <Button variant="outline" size="icon">
                  <Icons.settings className="h-4 w-4"/>
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </SidebarTrigger>
            </div>
          </div>
          <div className="grid gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No upcoming appointments.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No recent activity.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </React.Fragment>
    </SidebarProvider>
  );
}
