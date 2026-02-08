import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Check, User } from 'lucide-react';
import { EnrichedTodo, TodoStatus } from '@/types/todo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ListViewProps {
  todos: EnrichedTodo[];
  onEdit: (todo: EnrichedTodo) => void;
  onDelete: (todo: EnrichedTodo) => void;
  onToggleComplete: (todo: EnrichedTodo) => void;
}

const statusStyles: Record<TodoStatus, { bg: string; text: string; label: string }> = {
  todo: { bg: 'bg-status-todo/10', text: 'text-status-todo', label: 'todo' },
  'in-progress': { bg: 'bg-status-progress/10', text: 'text-status-progress', label: 'inProgress' },
  done: { bg: 'bg-status-done/10', text: 'text-status-done', label: 'done' },
};

const columnHelper = createColumnHelper<EnrichedTodo>();

export function ListView({ todos, onEdit, onDelete, onToggleComplete }: ListViewProps) {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'checkbox',
        size: 40,
        cell: ({ row }) => (
          <button
            onClick={() => onToggleComplete(row.original)}
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              row.original.completed
                ? 'bg-status-done border-status-done'
                : 'border-border hover:border-primary'
            )}
          >
            {row.original.completed && <Check className="w-3 h-3 text-card" />}
          </button>
        ),
      }),
      columnHelper.accessor('todo', {
        header: () => (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('taskTitle')}
          </span>
        ),
        cell: (info) => (
          <span
            className={cn(
              'text-sm font-medium',
              info.row.original.completed && 'line-through text-muted-foreground'
            )}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('status', {
        header: () => (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('status')}
          </span>
        ),
        cell: (info) => {
          const status = info.getValue();
          const style = statusStyles[status];
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                style.bg,
                style.text
              )}
            >
              {t(style.label)}
            </span>
          );
        },
      }),
      columnHelper.accessor('userId', {
        header: () => (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('user')}
          </span>
        ),
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {String.fromCharCode(65 + (info.getValue() % 26))}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {t('user')} {info.getValue()}
            </span>
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        size: 40,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded hover:bg-accent transition-colors opacity-0 group-hover/row:opacity-100">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <Edit className="w-4 h-4 mr-2" />
                {t('edit')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(row.original)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    [t, onEdit, onDelete, onToggleComplete]
  );

  const table = useReactTable({
    data: todos,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border bg-muted/30">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left px-4 py-3 first:pl-5 last:pr-5"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-muted-foreground">
                  {t('noTasks')}
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="group/row border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3.5 first:pl-5 last:pr-5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
