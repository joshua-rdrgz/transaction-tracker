import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import { IRechartsAreaData } from '@/lib/types';
import { currency } from '@/lib/utils';

interface IAreaChartProps {
  data: IRechartsAreaData[];
  customToolTip?(...args: any): JSX.Element | null;
  containerHeight?: number;
  containerWidth?: number;
}

export const AreaChart: React.FC<IAreaChartProps> = ({
  data = [],
  customToolTip: CustomToolTip,
  containerHeight = 250,
  containerWidth,
}) => {
  if (data.length === 0)
    return (
      <div
        style={{ height: containerHeight }}
        className='w-full flex justify-center items-center'
        data-testid='area-chart-empty'
      >
        No data to display.
      </div>
    );

  return (
    <ResponsiveContainer
      width={containerWidth || '100%'}
      height={containerHeight}
    >
      <RechartsAreaChart data={data}>
        <XAxis dataKey='xAxisKey' />
        <YAxis
          tickFormatter={
            (value) => currency(+value).slice(0, -3) /* Cut off '.00' */
          }
        />
        <CartesianGrid />
        {!!CustomToolTip && <Tooltip content={<CustomToolTip />} />}
        {Object.keys(data[0]).map((areaKey) => {
          if (areaKey === 'xAxisKey') return null;
          return (
            <Area
              key={areaKey}
              dataKey={areaKey}
              name={areaKey}
              type='monotone'
            />
          );
        })}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
