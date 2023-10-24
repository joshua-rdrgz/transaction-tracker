import { currency } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/ui/card';

export function AreaChartToolTip({ payload }: any) {
  if (payload.length > 0) {
    const [
      {
        payload: { xAxisKey, total },
      },
    ] = payload;

    return (
      <Card className='flex flex-col gap-2 p-4'>
        <CardHeader className='p-0 font-semibold text-md'>
          {xAxisKey}
        </CardHeader>
        <CardContent className='p-0 font-bold text-lg'>
          {currency(+total)}
        </CardContent>
      </Card>
    );
  }

  return null;
}
