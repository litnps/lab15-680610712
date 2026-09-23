import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex border-b-1 border-zinc-900 h-14 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 border-be-1 border-zinc-900" />
            <span className="text-sm  font-medium">ระบบลงทะเบียนเรียน</span>
          </div>
          <ModeToggle />
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <footer className="border-t-1 border-zinc-900 p-4 text-center text-xs text-muted-foreground">จัดทำโดย Lalitnapas Pasasuk รหัสนักศึกษา 680610712</footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
