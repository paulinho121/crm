'use client';

import { TrendingUp } from 'lucide-react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'Janeiro', revenue: 18600 },
  { month: 'Fevereiro', revenue: 30500 },
  { month: 'Março', revenue: 23700 },
  { month: 'Abril', revenue: 7300 },
  { month: 'Maio', revenue: 20900 },
  { month: 'Junho', revenue: 21400 },
];

const chartConfig = {
  revenue: {
    label: 'Receita',
    color: 'hsl(var(--primary))',
  },
};

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral de Vendas</CardTitle>
        <CardDescription>Janeiro - Junho 2023</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickFormatter={(value) => `R$${value / 1000}k`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
