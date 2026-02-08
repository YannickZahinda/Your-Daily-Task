import { useTranslation } from 'react-i18next';
import { Plus, FileEdit } from 'lucide-react';
import { EnrichedTodo, TodoStatus } from '@/types/todo';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';

interface KanbanViewProps {
  todos: EnrichedTodo[];
  onEdit: (todo: EnrichedTodo) => void;
  onDelete: (todo: EnrichedTodo) => void;
  onToggleComplete: (todo: EnrichedTodo) => void;
  onAddTask: () => void;
}

interface ColumnConfig {
  key: TodoStatus;
  labelKey: string;
  colorClass: string;
  bgClass: string;
  iconBg: string;
}

const columns: ColumnConfig[] = [
  {
    key: 'todo',
    labelKey: 'todo',
    colorClass: 'text-status-todo',
    bgClass: 'bg-status-todo/10',
    iconBg: 'bg-status-todo',
  },
  {
    key: 'in-progress',
    labelKey: 'inProgress',
    colorClass: 'text-status-progress',
    bgClass: 'bg-status-progress/10',
    iconBg: 'bg-status-progress',
  },
  {
    key: 'done',
    labelKey: 'done',
    colorClass: 'text-status-done',
    bgClass: 'bg-status-done/10',
    iconBg: 'bg-status-done',
  },
];

export function KanbanView({
  todos,
  onEdit,
  onDelete,
  onToggleComplete,
  onAddTask,
}: KanbanViewProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-5 overflow-x-auto pb-4 min-h-[calc(100vh-200px)]">
      {columns.map((col) => {
        const columnTodos = todos.filter((todo) => todo.status === col.key);

        return (
          <div
            key={col.key}
            className="flex-shrink-0 w-full sm:w-80 flex flex-col"
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-foreground">
                  {t(col.labelKey)}
                </span>
                <span
                  className={cn(
                    'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                    col.bgClass,
                    col.colorClass
                  )}
                >
                  {columnTodos.length}
                </span>
              </div>
              {col.key === 'todo' && (
                <button
                  onClick={onAddTask}
                  className="p-1 rounded hover:bg-accent transition-colors"
                >
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-3 scrollbar-thin overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
              {columnTodos.length === 0 && (
                <div className={cn('rounded-lg border-2 border-dashed border-border p-6 text-center')}>
                  <FileEdit className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{t('noTasks')}</p>
                </div>
              )}
              {columnTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                >
                  <TaskCard
                    todo={todo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
