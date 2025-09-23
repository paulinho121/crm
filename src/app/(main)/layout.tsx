import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { ClientTrackerLogo } from '@/components/icons';
import { Nav } from '@/components/nav';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" side="left" collapsible="icon">
        <SidebarHeader className="items-center justify-center p-4">
          <ClientTrackerLogo className="size-7 text-primary" />
          <span className="font-headline text-xl font-semibold">ClientTracker</span>
        </SidebarHeader>
        <SidebarContent>
          <Nav />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="size-4" />
            <span>Configurações</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
