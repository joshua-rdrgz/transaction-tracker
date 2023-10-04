import { IRechartsData } from '@/lib/types';
import { currency } from '@/lib/utils';
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader } from './card';

interface IPieChartProps {
  data: IRechartsData[];
  render(entry: any, entryIdx: number): any;
  containerHeight?: number;
}

export const PieChart: React.FC<IPieChartProps> = ({
  containerHeight = 250,
  data,
  render,
}) => {
  return (
    <ResponsiveContainer width='100%' height={containerHeight}>
      <RechartsPieChart>
        <Pie
          data={data}
          nameKey='label'
          dataKey='value'
          innerRadius={70}
          outerRadius={100}
          cx='50%'
          cy='50%'
          paddingAngle={5}
        >
          {data.map(render)}
        </Pie>
        <Tooltip content={<CustomToolTip />} />
        <Legend
          verticalAlign='middle'
          align='right'
          // @ts-ignore
          width='27%'
          layout='vertical'
          iconSize={15}
          iconType='circle'
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

function CustomToolTip({ payload }: any) {
  if (payload.length > 0) {
    const [{ name, value }] = payload;

    return (
      <Card className='flex flex-col gap-2 p-4'>
        <CardHeader className='p-0 font-semibold text-md'>{name}</CardHeader>
        <CardContent className='p-0 font-bold text-lg'>
          {currency(+value)}
        </CardContent>
      </Card>
    );
  }

  return null;
}
