import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { AreaChartToolTip } from '@/features/accounts/components/AreaChartToolTip';
import { IRechartsAreaData, ReceivedTransaction } from '@/lib/types';
import { AreaChart } from '@/ui/area-chart';
import { Filter } from '@/ui/filter';
import { Spinner } from '@/ui/spinner';

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
        xAxisKey: format(date, 'MMM dd'),
        total: getTransactionsOnDate(date, transactions).reduce(
          (acc, transaction) => acc + Number(transaction.amount),
          0
        ),
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
      <AreaChart
        data={transactionsData || []}
        customToolTip={AreaChartToolTip}
      />
    </>
  );
};

function getTransactionsOnDate(
  date: Date,
  transactions: ReceivedTransaction[]
) {
  return transactions.filter((transaction) =>
    isSameDay(new Date(transaction.date as string | Date), date)
  );
}
