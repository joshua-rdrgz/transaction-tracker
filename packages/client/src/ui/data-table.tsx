import { useState } from 'react';
import {
  SortingState,
  ColumnFiltersState,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
  ExpandedState,
  getExpandedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { Spinner } from '@/ui/spinner';
import { DataTablePagination } from '@/ui/data-table-pagination';
import { DataTableViewOptions } from '@/ui/data-table-view-options';

interface DataTableProps<TData, TValue> {
  // BASE
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  noResultsText?: string;

  // PAGINATION
  includePagination?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];

  // EXPANDABLE ROWS
  expandableRows?: boolean;
  getSubRows?(originalRow: TData, index: number): TData[] | undefined;

  // COLUMN VISIBILITY
  toggleColumns?: boolean;
  columnVisibility?: VisibilityState;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  isLoading,
  noResultsText,
  includePagination = true,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 15, 20, 25],
  expandableRows = false,
  getSubRows,
  toggleColumns = true,
  columnVisibility,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,

    // STATE
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
      columnVisibility,
    },
    state: {
      sorting,
      columnFilters,
      expanded: expandableRows ? expanded : undefined,
    },

    // CHANGE FUNCTIONS
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: expandableRows ? setExpanded : undefined,

    // MODELS
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: includePagination
      ? getPaginationRowModel()
      : undefined,
    getExpandedRowModel: expandableRows ? getExpandedRowModel() : undefined,
    getSubRows: expandableRows ? getSubRows : undefined,
  });

  const tableBody = table.getRowModel().rows?.length ? (
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} className='h-24 text-center'>
        {noResultsText || 'No results.'}
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {toggleColumns && <DataTableViewOptions table={table} />}
      <div className='rounded-md border'>
        <Table wrapperClassName='shadow-md dark:shadow-secondary'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='bg-secondary'>
                {headerGroup.headers.map((header) => {
                  const className =
                    header.colSpan > 1
                      ? 'custom-class-has-button bg-muted'
                      : 'custom-class-has-button';
                  return (
                    <TableHead
                      key={header.id}
                      className={className}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  <Spinner size={15} className='!block' />
                </TableCell>
              </TableRow>
            ) : (
              tableBody
            )}
          </TableBody>
        </Table>
      </div>
      {includePagination && (
        <DataTablePagination
          table={table}
          pageSizes={pageSizeOptions}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
