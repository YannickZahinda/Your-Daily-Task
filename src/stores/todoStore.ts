import { create } from 'zustand';
import { TodoStatus } from '@/types/todo';

interface TodoStoreState {
  statusOverrides: Record<number, TodoStatus>;
  searchQuery: string;
  activeView: 'kanban' | 'list';
  setStatus: (todoId: number, status: TodoStatus) => void;
  setSearchQuery: (query: string) => void;
  setActiveView: (view: 'kanban' | 'list') => void;
}

export const useTodoStore = create<TodoStoreState>((set) => ({
  statusOverrides: {},
  searchQuery: '',
  activeView: 'kanban',
  setStatus: (todoId, status) =>
    set((state) => ({
      statusOverrides: { ...state.statusOverrides, [todoId]: status },
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveView: (view) => set({ activeView: view }),
}));
