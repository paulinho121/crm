'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound, DollarSign, TrendingUp, Activity } from 'lucide-react';
import type { Sale, Client } from '@/lib/types';

type StatsProps = {
  sales: Sale[];
  clients: Client[];
};

export function Stats({ sales, clients }: StatsProps) {
  const totalClients = clients.length;
  const closedSales = sales.filter((s) => s.status === 'Fechada').length;
  const totalRevenue = sales
    .filter((s) => s.status === 'Fechada')
    .reduce((acc, s) => acc + s.value, 0);
  const ongoingSales = sales.filter(
    (s) => s.status !== 'Fechada' && s.status !== 'Perdida'
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <UsersRound className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClients}</div>
          <p className="text-xs text-muted-foreground">+5 do mês passado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vendas Fechadas</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{closedSales}</div>
          <p className="text-xs text-muted-foreground">+10% do mês passado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R${totalRevenue.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-muted-foreground">+20.1% do mês passado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vendas em Andamento</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ongoingSales}</div>
          <p className="text-xs text-muted-foreground">3 atualmente ativas</p>
        </CardContent>
      </Card>
    </div>
  );
}
