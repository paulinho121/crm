'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { clients, sales as allSales } from '@/lib/data';
import type { Sale } from '@/lib/types';
import { PlusCircle, MoreHorizontal, DollarSign } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

type SalesKanbanBoardProps = {
  initialSales: Sale[];
};

const columns = [
  'Contato inicial',
  'Proposta enviada',
  'Negociação',
  'Fechada',
] as const;

type Status = (typeof columns)[number];

export function SalesKanbanBoard({ initialSales }: SalesKanbanBoardProps) {
  const [sales, setSales] = React.useState(initialSales);

  const salesByStatus = React.useMemo(() => {
    const grouped: { [key in Status]: Sale[] } = {
      'Contato inicial': [],
      'Proposta enviada': [],
      Negociação: [],
      Fechada: [],
    };
    sales.forEach((sale) => {
      if (sale.status !== 'Perdida' && sale.status in grouped) {
        grouped[sale.status as Status].push(sale);
      }
    });
    return grouped;
  }, [sales]);

  const totalValueByStatus = (status: Status) =>
    salesByStatus[status].reduce((sum, sale) => sum + sale.value, 0);
  const opportunityCountByStatus = (status: Status) =>
    salesByStatus[status].length;

  return (
    <div className="flex gap-6 h-full">
      {columns.map((status) => (
        <div key={status} className="flex flex-col w-80 shrink-0">
          <div className="flex items-center justify-between p-2">
            <h2 className="font-semibold">{status}</h2>
            <Badge variant="secondary" className="text-sm">
              R$ {totalValueByStatus(status).toLocaleString('pt-BR')} (
              {opportunityCountByStatus(status)})
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-secondary/50 rounded-lg">
            {salesByStatus[status].map((sale) => {
              const client = clients.find((c) => c.id === sale.clientId);
              return (
                <Card key={sale.id}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{sale.product}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="flex items-center gap-2">
                       {client && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={client.avatarUrl} data-ai-hint="person avatar" />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <span className="text-sm text-muted-foreground">{sale.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <DollarSign className="h-4 w-4 text-green-500"/>
                      <span>{sale.value.toLocaleString('pt-BR')}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                      <Progress value={(sale.value / 20000) * 100} className="h-2" />
                  </CardFooter>
                </Card>
              );
            })}
             <Button variant="ghost" className="w-full mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Oportunidade
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
