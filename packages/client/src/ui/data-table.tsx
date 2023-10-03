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
import { DataTablePagination } from './data-table-pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  noResultsText?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 15, 20, 25],
  isLoading,
  noResultsText,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
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
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='custom-class-has-button'
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
      <DataTablePagination
        table={table}
        pageSizes={pageSizeOptions}
        isLoading={isLoading}
      />
    </>
  );
}
