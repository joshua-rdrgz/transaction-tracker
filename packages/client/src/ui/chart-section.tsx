interface IChartSectionProps {
  title: string;
  chart: React.ReactNode;
}

export const ChartSection: React.FC<IChartSectionProps> = ({
  title,
  chart,
}) => {
  return (
    <div className='flex-1 flex flex-col gap-2 bg-secondary p-3 rounded shadow-md dark:shadow-secondary'>
      <h2 className='font-display text-2xl p-2'>{title}</h2>
      {chart}
    </div>
  );
};
