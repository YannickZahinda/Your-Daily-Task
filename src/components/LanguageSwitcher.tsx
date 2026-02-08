import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { language, setLanguage } = useSettingsStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      )}
    >
      <Globe className="w-4 h-4 flex-shrink-0" />
      <span>{language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}</span>
    </button>
  );
}
