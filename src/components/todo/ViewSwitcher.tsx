import { useTranslation } from 'react-i18next';
import { LayoutGrid, List, Search, SlidersHorizontal, ArrowUpDown, Plus } from 'lucide-react';
import { useTodoStore } from '@/stores/todoStore';
import { SidebarToggle } from '@/components/layout/AppSidebar';
import { cn } from '@/lib/utils';

interface ViewSwitcherProps {
  onAddTask: () => void;
}

export function ViewSwitcher({ onAddTask }: ViewSwitcherProps) {
  const { t } = useTranslation();
  const { activeView, setActiveView, searchQuery, setSearchQuery } = useTodoStore();

  return (
    <div className="space-y-4">
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <SidebarToggle />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {t('taskHub')} 📋
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1 ml-0 lg:ml-12">
            {t('welcomeMessage')}
          </p>
        </div>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{t('addTask')}</span>
        </button>
      </div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* View tabs */}
        <div className="flex items-center gap-1 bg-card rounded-lg p-1 border border-border shadow-sm">
          <button
            onClick={() => setActiveView('kanban')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
              activeView === 'kanban'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            {t('kanban')}
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
              activeView === 'list'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <List className="w-4 h-4" />
            {t('list')}
          </button>
        </div>

        {/* Search + actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">{t('filter')}</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden sm:inline">{t('sort')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
