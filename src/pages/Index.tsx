import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ViewSwitcher } from '@/components/todo/ViewSwitcher';
import { KanbanView } from '@/components/todo/KanbanView';
import { ListView } from '@/components/todo/ListView';
import { TaskDialog } from '@/components/todo/TaskDialog';
import { DeleteDialog } from '@/components/todo/DeleteDialog';
import { useTodos } from '@/hooks/useTodos';
import { useTodoStore } from '@/stores/todoStore';
import { EnrichedTodo } from '@/types/todo';

const Index = () => {
  const { t } = useTranslation();
  const { todos, isLoading, isError, refetch, createTodo, updateTodo, deleteTodo, isCreating, isUpdating, isDeleting } = useTodos();
  const { activeView, setStatus } = useTodoStore();

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<EnrichedTodo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<EnrichedTodo | null>(null);

  const handleAddTask = useCallback(() => {
    setEditingTodo(null);
    setTaskDialogOpen(true);
  }, []);

  const handleEdit = useCallback((todo: EnrichedTodo) => {
    setEditingTodo(todo);
    setTaskDialogOpen(true);
  }, []);

  const handleDelete = useCallback((todo: EnrichedTodo) => {
    setDeletingTodo(todo);
    setDeleteDialogOpen(true);
  }, []);

  const handleToggleComplete = useCallback(
    (todo: EnrichedTodo) => {
      const newCompleted = !todo.completed;
      updateTodo(todo.id, { completed: newCompleted });
      setStatus(todo.id, newCompleted ? 'done' : 'todo');
    },
    [updateTodo, setStatus]
  );

  const handleSave = useCallback(
    (data: { todo: string; completed: boolean }) => {
      if (editingTodo) {
        updateTodo(editingTodo.id, { todo: data.todo });
      } else {
        createTodo({ todo: data.todo, completed: false, userId: 1 });
      }
    },
    [editingTodo, updateTodo, createTodo]
  );

  const handleConfirmDelete = useCallback(() => {
    if (deletingTodo) {
      deleteTodo(deletingTodo.id);
      setDeleteDialogOpen(false);
      setDeletingTodo(null);
    }
  }, [deletingTodo, deleteTodo]);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
        <ViewSwitcher onAddTask={handleAddTask} />

        <div className="mt-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-sm text-muted-foreground">{t('loading')}</p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <AlertCircle className="w-10 h-10 text-destructive mb-3" />
              <p className="text-sm text-muted-foreground mb-4">{t('error')}</p>
              <button
                onClick={() => refetch()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <RefreshCw className="w-4 h-4" />
                {t('retry')}
              </button>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="animate-fade-in">
              {activeView === 'kanban' ? (
                <KanbanView
                  todos={todos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                  onAddTask={handleAddTask}
                />
              ) : (
                <ListView
                  todos={todos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        todo={editingTodo}
        onSave={handleSave}
        isLoading={isCreating || isUpdating}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </AppLayout>
  );
};

export default Index;
