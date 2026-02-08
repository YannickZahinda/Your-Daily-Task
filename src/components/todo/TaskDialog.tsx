import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EnrichedTodo } from '@/types/todo';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: EnrichedTodo | null;
  onSave: (data: { todo: string; completed: boolean }) => void;
  isLoading?: boolean;
}

export function TaskDialog({ open, onOpenChange, todo, onSave, isLoading }: TaskDialogProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const isEditing = !!todo;

  useEffect(() => {
    if (open) {
      setTitle(todo?.todo || '');
    }
  }, [open, todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave({
      todo: trimmed,
      completed: todo?.completed ?? false,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {isEditing ? t('editTask') : t('addTask')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title" className="text-sm font-medium">
              {t('taskTitle')}
            </Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('taskTitlePlaceholder')}
              autoFocus
              maxLength={200}
              className="h-11"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isLoading}
              className="min-w-[80px]"
            >
              {isLoading ? '...' : isEditing ? t('save') : t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
