import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b ">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
            </div>
            <div className="ml-auto px-3">
              {/* <NavActions /> */}
              <ModeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 px-4 py-5">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
