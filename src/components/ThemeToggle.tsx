import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact }: ThemeToggleProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useSettingsStore();

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-sidebar-accent transition-colors"
        aria-label={t('theme')}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      )}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 flex-shrink-0" />
      ) : (
        <Sun className="w-4 h-4 flex-shrink-0" />
      )}
      <span>{theme === 'light' ? t('darkMode') : t('lightMode')}</span>
    </button>
  );
}
