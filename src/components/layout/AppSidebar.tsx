import { useTranslation } from 'react-i18next';
import {
  Search,
  Sparkles,
  Inbox,
  CalendarDays,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  CheckSquare,
  Menu,
} from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Search, labelKey: 'search' },
  { icon: Sparkles, labelKey: 'dashboard' },
  { icon: Inbox, labelKey: 'inbox', badge: 3 },
  { icon: CalendarDays, labelKey: 'calendar' },
  { icon: Settings, labelKey: 'settings' },
];

export function AppSidebar() {
  const { t } = useTranslation();
  const { sidebarOpen, toggleSidebar } = useSettingsStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          'fixed lg:relative z-50 flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out',
          sidebarOpen ? 'w-60 translate-x-0' : 'w-0 lg:w-16 -translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 min-h-[64px]">
          <div className={cn('flex items-center gap-3 overflow-hidden', !sidebarOpen && 'lg:justify-center')}>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <h1 className="font-heading font-bold text-sm text-sidebar-primary-foreground">
                  {t('appName')}
                </h1>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className={cn(
              'hidden lg:flex items-center justify-center w-6 h-6 rounded-md hover:bg-sidebar-accent transition-colors',
              !sidebarOpen && 'lg:hidden'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-hidden">
          {navItems.map((item) => (
            <button
              key={item.labelKey}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                item.labelKey === 'search' && 'bg-sidebar-accent text-sidebar-accent-foreground',
                !sidebarOpen && 'lg:justify-center lg:px-0'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{t(item.labelKey)}</span>}
              {sidebarOpen && item.badge && (
                <span className="ml-auto flex-shrink-0 bg-sidebar-primary text-sidebar-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {/* Section divider */}
          {sidebarOpen && (
            <div className="pt-6 pb-2 animate-fade-in">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                {t('sharedPages')}
              </p>
            </div>
          )}

          {/* Task Hub link */}
          <button
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
              'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
              !sidebarOpen && 'lg:justify-center lg:px-0'
            )}
          >
            <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="truncate">{t('taskHub')}</span>}
          </button>
        </nav>

        {/* Bottom section */}
        {sidebarOpen && (
          <div className="p-3 space-y-2 border-t border-sidebar-border animate-fade-in">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        )}

        {/* Collapsed toggle */}
        {!sidebarOpen && (
          <div className="hidden lg:flex flex-col items-center p-3 gap-2 border-t border-sidebar-border">
            <ThemeToggle compact />
          </div>
        )}
      </aside>
    </>
  );
}

export function SidebarToggle() {
  const { toggleSidebar, sidebarOpen } = useSettingsStore();

  return (
    <button
      onClick={toggleSidebar}
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:bg-accent transition-colors"
      aria-label="Toggle sidebar"
    >
      {sidebarOpen ? (
        <ChevronLeft className="w-4 h-4" />
      ) : (
        <Menu className="w-4 h-4" />
      )}
    </button>
  );
}
