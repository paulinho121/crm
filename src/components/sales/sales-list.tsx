'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { sales } from '@/lib/data';
import type { Sale } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export function SalesList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas as Vendas</CardTitle>
        <CardDescription>
          Uma visão completa de todas as transações de vendas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale: Sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.clientName}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>R${sale.value.toLocaleString('pt-BR')}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      sale.status === 'fechada'
                        ? 'default'
                        : sale.status === 'em andamento'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {sale.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
