import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo as createTodoApi, updateTodo as updateTodoApi, deleteTodo as deleteTodoApi } from '@/api/todos';
import { CreateTodoPayload, UpdateTodoPayload, EnrichedTodo, TodoStatus } from '@/types/todo';
import { useTodoStore } from '@/stores/todoStore';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export function useTodos() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { statusOverrides, searchQuery } = useTodoStore();

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const enrichedTodos: EnrichedTodo[] = (todosQuery.data?.todos || [])
    .map((todo) => ({
      ...todo,
      status: (statusOverrides[todo.id] ||
        (todo.completed ? 'done' : 'todo')) as TodoStatus,
    }))
    .filter((todo) => {
      if (!searchQuery) return true;
      return todo.todo.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const createMutation = useMutation({
    mutationFn: createTodoApi,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          todos: [{ ...newTodo, id: Date.now() }, ...old.todos],
          total: old.total + 1,
        };
      });
      toast({ title: t('taskCreated') });
    },
    onError: () => {
      toast({ title: t('error'), variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...payload }: { id: number } & UpdateTodoPayload) =>
      updateTodoApi(id, payload),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map((t: any) =>
            t.id === updatedTodo.id ? { ...t, ...updatedTodo } : t
          ),
        };
      });
      toast({ title: t('taskUpdated') });
    },
    onError: () => {
      toast({ title: t('error'), variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['todos'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.filter((t: any) => t.id !== deletedId),
          total: old.total - 1,
        };
      });
      toast({ title: t('taskDeleted') });
    },
    onError: () => {
      toast({ title: t('error'), variant: 'destructive' });
    },
  });

  return {
    todos: enrichedTodos,
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    refetch: todosQuery.refetch,
    createTodo: (payload: CreateTodoPayload) => createMutation.mutate(payload),
    updateTodo: (id: number, payload: UpdateTodoPayload) =>
      updateMutation.mutate({ id, ...payload }),
    deleteTodo: (id: number) => deleteMutation.mutate(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
