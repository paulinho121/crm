'use client';

import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
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
import { Sale } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const chartConfig = {
  revenue: {
    label: 'Receita',
    color: 'hsl(var(--primary))',
  },
};

type SalesChartProps = {
  sales: Sale[];
};

export function SalesChart({ sales }: SalesChartProps) {
  const salesByMonth = sales.filter(s => s.status === 'Fechada').reduce((acc, sale) => {
      const monthName = format(new Date(sale.date), 'MMMM', { locale: ptBR });
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      acc[capitalizedMonth] = (acc[capitalizedMonth] || 0) + sale.value;
      return acc;
    }, {} as Record<string, number>);

  const chartData = [
      { month: 'Janeiro', revenue: 0 },
      { month: 'Fevereiro', revenue: 0 },
      { month: 'Março', revenue: 0 },
      { month: 'Abril', revenue: 0 },
      { month: 'Maio', revenue: 0 },
      { month: 'Junho', revenue: 0 },
    ].map(item => ({
        ...item,
        revenue: salesByMonth[item.month] || 0
    }));

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
