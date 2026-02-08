import { describe, it, expect, vi } from 'vitest';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '@/api/todos';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Todos API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTodos', () => {
    it('fetches todos successfully', async () => {
      const mockResponse = {
        todos: [{ id: 1, todo: 'Test', completed: false, userId: 1 }],
        total: 1,
        skip: 0,
        limit: 30,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchTodos();
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/todos?limit=30');
    });

    it('throws on fetch error', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      await expect(fetchTodos()).rejects.toThrow('Failed to fetch todos');
    });
  });

  describe('createTodo', () => {
    it('creates a todo successfully', async () => {
      const newTodo = { todo: 'New task', completed: false, userId: 1 };
      const mockResponse = { id: 151, ...newTodo };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await createTodo(newTodo);
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/todos/add',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTodo),
        })
      );
    });
  });

  describe('updateTodo', () => {
    it('updates a todo successfully', async () => {
      const mockResponse = { id: 1, todo: 'Updated', completed: true, userId: 1 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await updateTodo(1, { completed: true });
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/todos/1',
        expect.objectContaining({ method: 'PUT' })
      );
    });
  });

  describe('deleteTodo', () => {
    it('deletes a todo successfully', async () => {
      const mockResponse = { id: 1, todo: 'Deleted', completed: false, userId: 1, isDeleted: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await deleteTodo(1);
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/todos/1',
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});
