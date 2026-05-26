import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/nexum/AppSidebar";
import { TopBar } from "@/components/nexum/TopBar";
import { BottomNav } from "@/components/nexum/BottomNav";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 px-4 lg:px-8 py-6 pb-24 lg:pb-10 max-w-[1500px] w-full mx-auto">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
