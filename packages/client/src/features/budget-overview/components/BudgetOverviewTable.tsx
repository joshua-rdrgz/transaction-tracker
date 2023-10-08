import { useEffect, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { addMonths, format } from 'date-fns';
import { DataTable } from '@/ui/data-table';
import { TableCell } from '@/ui/table-cell';
import { currency } from '@/lib/utils';
import { useFormatBudgetData } from '@/features/budget-overview/hooks/useFormatBudgetData';

interface ITimePeriod {
  id: string;
  target: number;
  actual: number;
  difference: number;
}

export interface ICategoryData {
  id: string;
  name: string;
  timePeriods: ITimePeriod[];
  subcategories?: ICategoryData[];
}

const columnHelper = createColumnHelper<ICategoryData>();

interface IBudgetOverviewTableProps {
  numMonths: number;
}

export const BudgetOverviewTable: React.FC<IBudgetOverviewTableProps> = ({
  numMonths,
}) => {
  const { isLoadingBudgetData, budgetData } = useFormatBudgetData();
  const [columns, setColumns] = useState<ColumnDef<ICategoryData, string>[]>(
    []
  );

  useEffect(() => {
    const columns = [
      columnHelper.accessor('name', {
        header: '',
        cell: (info) => {
          // console.log('CATEGORY: ', info.getValue());
          // console.log('CELL CAN EXPAND: ', info.row.getCanExpand());
          return (
            <TableCell
              isHeader
              isExpandable
              cellCanExpand={info.row.getCanExpand()}
              expandOnClick={info.row.getToggleExpandedHandler()}
              expandButtonContent={info.row.getIsExpanded() ? '-' : '+'}
            >
              {info.getValue()}
            </TableCell>
          );
        },
      }),
    ];

    for (let idx = 0; idx < numMonths; idx++) {
      const formattedMonth = getFormattedMonth(idx);
      columns.push(
        columnHelper.group({
          header: formattedMonth,
          columns: [
            columnHelper.accessor('timePeriods.target', {
              header: 'Target',
              id: `${formattedMonth}-target`,
              cell: ({ row }) => (
                <TableCell>
                  {currency(row.original.timePeriods[idx]?.target)}
                </TableCell>
              ),
            }),
            columnHelper.accessor('timePeriods.actual', {
              header: 'Actual',
              id: `${formattedMonth}-actual`,
              cell: ({ row }) => (
                <TableCell>
                  {currency(row.original.timePeriods[idx]?.actual)}
                </TableCell>
              ),
            }),
            columnHelper.accessor('timePeriods.difference', {
              header: 'Difference',
              id: `${formattedMonth}-difference`,
              cell: ({ row }) => (
                <TableCell>
                  {currency(row.original.timePeriods[idx]?.difference)}
                </TableCell>
              ),
            }),
          ],
        })
      );
    }

    setColumns(columns);
  }, [numMonths]);

  return (
    <DataTable
      isLoading={isLoadingBudgetData}
      columns={columns}
      data={budgetData}
      includePagination={false}
      expandableRows={true}
      getSubRows={(originalRow) => originalRow.subcategories}
    />
  );
};

function getFormattedMonth(monthsFromCurrentMonth: number) {
  const month = addMonths(Date.now(), monthsFromCurrentMonth);

  return format(month, 'MMMM yyyy');
}

/* 
  Each row has:

  - Adjustable Category Label
  - Monthly Target
  - Sum of all monthly transactions associated with category
  - Difference => Target - Transactions

  For as many months (columns) as the user provides (paginated):
  - 3 months
  - 6 months 



  TECHNICAL REQUIREMENTS
  - Adjustable columns
    - Function => receives amount of columns requested, spits out correct ColumnDef

  - Table split into 2 big chunks: Income Categories && Expense Categories


*/
