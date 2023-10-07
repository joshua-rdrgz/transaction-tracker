import { BudgetOverviewTable } from '@/features/budget-overview/components/BudgetOverviewTable';

export default function BudgetOverviewPage() {
  return (
    <section>
      <h1>Budget Overview</h1>
      <BudgetOverviewTable numMonths={2} />
    </section>
  );
}
