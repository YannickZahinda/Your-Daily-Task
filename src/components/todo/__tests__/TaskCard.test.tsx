import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from '@/components/todo/TaskCard';
import { EnrichedTodo } from '@/types/todo';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        todo: 'To-do',
        inProgress: 'In Progress',
        done: 'Done',
        edit: 'Edit',
        delete: 'Delete',
        moveTo: 'Move to',
        user: 'User',
      };
      return translations[key] || key;
    },
  }),
}));

const mockTodo: EnrichedTodo = {
  id: 1,
  todo: 'Test task title',
  completed: false,
  userId: 5,
  status: 'todo',
};

const completedTodo: EnrichedTodo = {
  id: 2,
  todo: 'Completed task',
  completed: true,
  userId: 3,
  status: 'done',
};

describe('TaskCard', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnToggleComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task title correctly', () => {
    render(
      <TaskCard
        todo={mockTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    expect(screen.getByText('Test task title')).toBeInTheDocument();
  });

  it('renders user info', () => {
    render(
      <TaskCard
        todo={mockTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    expect(screen.getByText('User 5')).toBeInTheDocument();
  });

  it('calls onToggleComplete when checkbox is clicked', () => {
    render(
      <TaskCard
        todo={mockTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    // The checkbox button is the first button in the card
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTodo);
  });

  it('shows strikethrough for completed tasks', () => {
    render(
      <TaskCard
        todo={completedTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    const title = screen.getByText('Completed task');
    expect(title).toHaveClass('line-through');
  });
});
