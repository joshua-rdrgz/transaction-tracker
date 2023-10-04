import { useSearchParams } from 'react-router-dom';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { Prisma } from '@prisma/client';
import { AreaChart } from '@/ui/area-chart';
import { Filter } from '@/ui/filter';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { Spinner } from '@/ui/spinner';
import { IRechartsAreaData } from '@/lib/types';
import { useEffect, useState } from 'react';

interface IAccountTransactionsLineChartProps {
  accountId: string;
}

export const AccountTransactionsLineChart: React.FC<IAccountTransactionsLineChartProps> = ({
  accountId,
}) => {
  const { isLoadingTransactions, transactions } = useTransactions({
    accountId,
  });

  const [transactionsData, setTransactionsData] = useState<
    IRechartsAreaData[] | null
  >(null);

  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get('area-chart-num-days')) || 30;

  useEffect(() => {
    if (transactions) {
      const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
      });

      const data: IRechartsAreaData[] = allDates.map((date) => ({
        name: format(date, 'MMM dd'),
        total: getTransactionsOnDate(
          date,
          transactions as Exclude<typeof transactions, undefined>
        ).reduce((acc, transaction) => acc + transaction.amount, 0),
      }));

      setTransactionsData(data);
    }
  }, [transactions, numDays]);

  if (isLoadingTransactions)
    return (
      <div className='flex justify-center items-center flex-grow'>
        <Spinner size={40} />
      </div>
    );

  return (
    <>
      <Filter
        filterField='area-chart-num-days'
        filterOptions={[
          { label: 'Last 7 Days', value: '7' },
          { label: 'Last 15 Days', value: '15' },
          { label: 'Last 30 Days', value: '30' },
        ]}
        defaultOptionIndex={2}
      />
      <AreaChart data={transactionsData || []} />
    </>
  );
};

function getTransactionsOnDate(
  date: Date,
  transactions: Prisma.TransactionCreateManyInput[]
) {
  return transactions.filter((transaction) =>
    isSameDay(new Date(transaction.date as string | Date), date)
  );
}
