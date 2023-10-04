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
import { Card, CardContent, CardHeader } from './card';
import { currency } from '@/lib/utils';

interface IAreaChartProps {
  data: IRechartsAreaData[];
  containerHeight?: number;
}
export const AreaChart: React.FC<IAreaChartProps> = ({
  data,
  containerHeight = 250,
}) => {
  if (data.length === 0)
    return (
      <div
        style={{ height: containerHeight }}
        className='w-full flex justify-center items-center'
      >
        No data to display.
      </div>
    );

  return (
    <ResponsiveContainer width='100%' height={containerHeight}>
      <RechartsAreaChart data={data}>
        <XAxis dataKey='name' />
        <YAxis
          tickFormatter={
            (value) => currency(+value).slice(0, -3) /* Cut off '.00' */
          }
        />
        <CartesianGrid />
        <Tooltip content={<CustomToolTip />} />
        {Object.keys(data[0]).map((areaKey) => {
          if (areaKey === 'name') return null;
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

function CustomToolTip({ payload }: any) {
  if (payload.length > 0) {
    const [
      {
        payload: { name, total },
      },
    ] = payload;

    console.log('payload: ', payload);

    return (
      <Card className='flex flex-col gap-2 p-4'>
        <CardHeader className='p-0 font-semibold text-md'>{name}</CardHeader>
        <CardContent className='p-0 font-bold text-lg'>
          {currency(+total)}
        </CardContent>
      </Card>
    );
  }

  return null;
}
