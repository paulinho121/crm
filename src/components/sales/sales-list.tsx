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
        <CardTitle>All Sales</CardTitle>
        <CardDescription>
          A complete overview of all sales transactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale: Sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.clientName}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>${sale.value.toLocaleString()}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      sale.status === 'closed'
                        ? 'default'
                        : sale.status === 'ongoing'
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
