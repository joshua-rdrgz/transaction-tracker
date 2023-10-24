import { render, screen } from '@/test/test-utils';
import { faker } from '@faker-js/faker';
import { IRechartsAreaData } from '@/lib/types';
import { AreaChart } from '@/ui/area-chart';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Area Chart UI Component', () => {
  test('Does not display chart if passed no data', async () => {
    // @ts-ignore
    await render(<AreaChart />);

    const chartEmpty = screen.queryByTestId('area-chart-empty');

    expect(chartEmpty).toBeInTheDocument();
    expect(chartEmpty).toBeVisible();
  });

  test('Displays chart if passed data', async () => {
    const data = generateData(1, 1);
    const { container } = await render(
      <AreaChart data={data} containerWidth={250} />
    );

    const [chart] = container.getElementsByClassName('recharts-surface');

    expect(chart).toBeInTheDocument();
    expect(chart).toBeVisible();
  });

  test('Uses provided data for x-axis implementation', async () => {
    const data = generateData(1, 1);
    const xAxisKey = data[0].xAxisKey;

    const { container } = await render(
      <AreaChart data={data} containerWidth={250} />
    );

    const xAxis = container.querySelector(
      '.recharts-xAxis .recharts-cartesian-axis-tick-value'
    );

    expect(xAxis).toHaveTextContent(xAxisKey);
  });

  test('Renders "x" areas given "x" keys', async () => {
    const howManyAreas = 2;
    const data = generateData(2, howManyAreas);

    const { container } = await render(
      <AreaChart data={data} containerWidth={250} />
    );

    const areas = container.getElementsByClassName('recharts-area-area');

    expect(areas).toHaveLength(howManyAreas);
  });
});

function generateData(howManyDataPoints: number, howManyAreas: number) {
  if (howManyDataPoints <= 0 || howManyAreas <= 0) return [];
  const data = [];
  const month = faker.date.month();

  for (let i = 0; i < howManyDataPoints; i++) {
    const day = faker.number.int({ max: 31 });
    const dataPoint: IRechartsAreaData = {
      xAxisKey: `${month} ${day}`,
    };

    for (let j = 0; j < howManyAreas; j++) {
      const area = `area-${j}`;
      dataPoint[area] = faker.finance.amount({ dec: 2 });
    }

    data.push(dataPoint);
  }

  return data;
}
