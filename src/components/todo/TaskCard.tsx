import { useTranslation } from 'react-i18next';
import { MoreHorizontal, Edit, Trash2, ArrowRight, Check, User } from 'lucide-react';
import { EnrichedTodo, TodoStatus } from '@/types/todo';
import { useTodoStore } from '@/stores/todoStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  todo: EnrichedTodo;
  onEdit: (todo: EnrichedTodo) => void;
  onDelete: (todo: EnrichedTodo) => void;
  onToggleComplete: (todo: EnrichedTodo) => void;
}

const statusColors: Record<TodoStatus, string> = {
  todo: 'bg-status-todo',
  'in-progress': 'bg-status-progress',
  done: 'bg-status-done',
};

const statusBorderColors: Record<TodoStatus, string> = {
  todo: 'border-l-status-todo',
  'in-progress': 'border-l-status-progress',
  done: 'border-l-status-done',
};

export function TaskCard({ todo, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const { t } = useTranslation();
  const { setStatus } = useTodoStore();

  const statuses: { key: TodoStatus; label: string }[] = [
    { key: 'todo', label: t('todo') },
    { key: 'in-progress', label: t('inProgress') },
    { key: 'done', label: t('done') },
  ];

  return (
    <div
      className={cn(
        'group bg-card rounded-lg border border-border p-4 shadow-sm',
        'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
        'border-l-[3px]',
        statusBorderColors[todo.status]
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => onToggleComplete(todo)}
            className={cn(
              'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              todo.completed
                ? 'bg-status-done border-status-done'
                : 'border-border hover:border-primary'
            )}
          >
            {todo.completed && <Check className="w-3 h-3 text-card" />}
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-accent">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onEdit(todo)}>
              <Edit className="w-4 h-4 mr-2" />
              {t('edit')}
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ArrowRight className="w-4 h-4 mr-2" />
                {t('moveTo')}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {statuses
                  .filter((s) => s.key !== todo.status)
                  .map((s) => (
                    <DropdownMenuItem
                      key={s.key}
                      onClick={() => setStatus(todo.id, s.key)}
                    >
                      <div className={cn('w-2 h-2 rounded-full mr-2', statusColors[s.key])} />
                      {s.label}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(todo)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Title */}
      <h3
        className={cn(
          'text-sm font-semibold leading-snug mb-2 line-clamp-2',
          todo.completed && 'line-through text-muted-foreground'
        )}
      >
        {todo.todo}
      </h3>

      {/* Status bar */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className={cn('h-1.5 rounded-full flex-1 max-w-[60px]', statusColors[todo.status])} />
        <div className="h-1.5 rounded-full flex-1 max-w-[60px] bg-border" />
        <div className="h-1.5 rounded-full flex-1 max-w-[60px] bg-border" />
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <User className="w-3 h-3" />
          <span>{t('user')} {todo.userId}</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-medium text-primary">
            {String.fromCharCode(65 + (todo.userId % 26))}
          </span>
        </div>
      </div>
    </div>
  );
}
