import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Cell } from 'recharts';
import { Prisma } from '@prisma/client';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import {
  ICategoriesInTransactions,
  useCategories,
} from '@/features/categories/hooks/useCategories';
import { generateRandomHexColor } from '@/lib/hexColorUtils';
import { IRechartsData } from '@/lib/types';
import { PieChart } from '@/ui/pie-chart';
import { Spinner } from '@/ui/spinner';
import { Filter } from '@/ui/filter';

interface IAccountTransactionsPieChartProps {
  accountId: string;
}

export const AccountTransactionsPieChart: React.FC<IAccountTransactionsPieChartProps> = ({
  accountId,
}) => {
  const { isLoadingTransactions, transactions } = useTransactions({
    accountId,
  });
  const { isLoadingCategories, categories } = useCategories({
    transactionIds: transactions?.map((transaction) => transaction.id),
  });
  const [transactionsData, setTransactionsData] = useState<
    IRechartsData[] | null
  >(null);

  const [searchParams] = useSearchParams();
  const displayIncomeValues = searchParams.get('transaction-type') === 'income';
  const displayByContacts = searchParams.get('display-pie-by') === 'contacts';

  useEffect(() => {
    if (displayByContacts) {
      if (transactions)
        setTransactionsData(
          transformTransactions(
            groupTransactionsByContact(transactions),
            displayIncomeValues
          )
        );
    } else {
      if (transactions && categories)
        setTransactionsData(
          transformTransactions(
            groupTransactionsByCategory(
              transactions,
              categories as ICategoriesInTransactions
            ),
            displayIncomeValues
          )
        );
    }
  }, [displayByContacts, transactions, displayIncomeValues, categories]);

  if (isLoadingTransactions || isLoadingCategories)
    return <Spinner size={40} />;

  return (
    <>
      <div className='flex flex-col gap-1'>
        <Filter
          filterField='display-pie-by'
          filterOptions={[
            {
              label: 'Contacts',
              value: 'contacts',
            },
            {
              label: 'Categories',
              value: 'categories',
            },
          ]}
        />
        <Filter
          filterField='transaction-type'
          filterOptions={[
            {
              label: 'Expenses',
              value: 'expenses',
            },
            {
              label: 'Income',
              value: 'income',
            },
          ]}
        />
      </div>
      <PieChart
        data={transactionsData || []}
        render={(entry, entryIdx) => (
          <Cell
            key={`transactions-in-account-entry-${entryIdx + 1}`}
            fill={entry.color}
          />
        )}
      />
    </>
  );
};

function transformTransactions(
  transactions: IRechartsData[] = [],
  displayIncomeValues: boolean
) {
  return (
    transactions
      .map((transaction) => ({
        ...transaction,
        color: generateRandomHexColor(),
      }))
      .filter((transaction) =>
        displayIncomeValues ? transaction.value > 0 : transaction.value < 0
      )
      .map((transaction) => ({
        ...transaction,
        // grab positive values from all, even if filtering for expenses
        value: Math.abs(transaction.value),
      })) || []
  );
}

function groupTransactionsByContact(
  transactions: Prisma.TransactionCreateManyAccountInput[] = []
) {
  const chartItems: IRechartsData[] = [];

  const uniqueContacts = new Set(
    transactions.map((transaction) => transaction.contact)
  );

  uniqueContacts.forEach((uniqueContact) => {
    chartItems.push({
      label: uniqueContact,
      value: 0,
      color: '',
    });
  });

  transactions.forEach((transaction) => {
    const foundChartItem = chartItems.find(
      (chartItem) => chartItem.label === transaction.contact
    ) as typeof chartItems[number];

    foundChartItem.value += transaction.amount;
  });

  return chartItems;
}

function groupTransactionsByCategory(
  transactions: Prisma.TransactionCreateManyAccountInput[] = [],
  categories: ICategoriesInTransactions = []
) {
  const chartItems: IRechartsData[] = [];

  const uniqueCategoryIds = new Set(
    transactions.map((transaction) => transaction.categoryId)
  );

  uniqueCategoryIds.forEach((categoryId) => {
    const uniqueCategory = categories.find(
      (obj) => obj.categoryId === categoryId
    ) as typeof categories[number];

    chartItems.push({
      label: uniqueCategory.category.name,
      value: 0,
      color: '',
      categoryId: uniqueCategory.categoryId,
    });
  });

  transactions.forEach((transaction) => {
    const foundChartItem = chartItems.find(
      (chartItem) => chartItem.categoryId === transaction.categoryId
    ) as typeof chartItems[number];

    foundChartItem.value += transaction.amount;
  });

  return chartItems;
}
