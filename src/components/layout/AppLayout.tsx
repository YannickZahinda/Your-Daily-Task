import { ReactNode } from 'react';
import { AppSidebar, SidebarToggle } from './AppSidebar';
import { useSettingsStore } from '@/stores/settingsStore';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen } = useSettingsStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div
        className={cn(
          'flex-1 flex flex-col overflow-hidden transition-all duration-300',
          sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
        )}
      >
        {/* Mobile header with toggle */}
        <div className="lg:hidden flex items-center p-4 border-b border-border bg-card">
          <SidebarToggle />
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
