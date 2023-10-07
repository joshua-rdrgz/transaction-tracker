import { useEffect, useState } from 'react';
import { Category, Target, Transaction } from '@prisma/client';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useTargets } from '@/features/targets/hooks/useTargets';
import { ICategoryData } from '@/features/budget-overview/components/BudgetOverviewTable';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';

type ReceivedTarget = Omit<Target, 'date'> & { date: string };
type ReceivedTransaction = Omit<Omit<Transaction, 'date'>, 'amount'> & {
  date: string;
  amount: string;
};

export const useFormatBudgetData = () => {
  const { isLoadingCategories, categories } = useCategories();
  const { isLoadingTargets, targets } = useTargets();
  const { isLoadingTransactions, transactions } = useTransactions();
  const [budgetData, setBudgetData] = useState<ICategoryData[]>([]);

  useEffect(() => {
    if (categories && targets && transactions)
      setBudgetData(formatBudgetData(categories, targets, transactions));
  }, [categories, targets, transactions]);

  return {
    isLoadingBudgetData:
      isLoadingCategories || isLoadingTargets || isLoadingTransactions,
    budgetData,
  };
};

function formatBudgetData(
  categories: Category[] = [],
  targets: ReceivedTarget[] = [],
  transactions: ReceivedTransaction[] = []
) {
  const categoryTree: ICategoryData[] = [];

  const categoryTreeRoots = categories.filter(
    (category) => category.parentId === null
  ); // [INCOME Category, EXPENSES Category]

  categoryTreeRoots.forEach((categoryTreeRoot) => {
    const categorySubTree = buildCategoryTree(
      categoryTreeRoot,
      categories,
      targets,
      transactions
    );

    categoryTree.push(categorySubTree);
  });

  console.log('CATEGORY TREE: ', categoryTree);

  return categoryTree;
}

function buildCategoryTree(
  categoryTreeRoot: Category,
  categories: Category[],
  targets: ReceivedTarget[],
  transactions: ReceivedTransaction[]
): ICategoryData {
  const subcategories = categories.filter(
    (category) => category.parentId === categoryTreeRoot.id
  );
  return {
    id: categoryTreeRoot.id,
    name: categoryTreeRoot.name,
    timePeriods: formatTimePeriods(categoryTreeRoot, targets, transactions),
    subcategories: subcategories.map((subcategory) =>
      buildCategoryTree(subcategory, categories, targets, transactions)
    ),
  };
}

function formatTimePeriods(
  category: Category,
  targets: ReceivedTarget[],
  transactions: ReceivedTransaction[]
) {
  const timePeriods: ICategoryData['timePeriods'] = [];

  const categoryTargets = targets.filter(
    (target) => target.categoryId === category.id
  );

  const actual = sumAllTransactionsInCategory(transactions, category);

  categoryTargets.forEach((categoryTarget) => {
    const target = categoryTarget.target;
    timePeriods.push({
      id: `${categoryTarget.date}-${category.id}`,
      target,
      actual,
      difference: target - actual,
    });
  });

  return timePeriods;
}

function sumAllTransactionsInCategory(
  transactions: ReceivedTransaction[],
  category: Category
) {
  const transactionsInCategory = transactions.filter(
    (transaction) => transaction.categoryId === category.id
  );

  return transactionsInCategory.reduce(
    (acc, transactionInCategory) => acc + Number(transactionInCategory.amount),
    0
  );
}
