'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getFollowUpSuggestions } from '@/app/actions';
import type { Engagement, Sale } from '@/lib/types';
import { Wand2, LoaderCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';

type FollowUpSuggesterProps = {
  clientName: string;
  engagements: Engagement[];
  sales: Sale[];
};

export function FollowUpSuggester({
  clientName,
  engagements,
  sales,
}: FollowUpSuggesterProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<any | null>(null);

  const engagementLogs = engagements
    .map((e) => `[${e.date} ${e.type}]: ${e.notes}`)
    .join('\n');

  const salesData = sales
    .map((s) => `[${s.date}]: ${s.product} por R$${s.value} - Status: ${s.status}`)
    .join('\n');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const result = await getFollowUpSuggestions({
          clientName,
          engagementLogs,
          salesData,
        });
        setSuggestion(result);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: (error as Error).message,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acompanhamento Inteligente</CardTitle>
        <CardDescription>
          Use IA para analisar dados do cliente e sugerir os melhores horários para
          acompanhamento.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="engagement-logs">Registros de Engajamento</Label>
              <Textarea
                id="engagement-logs"
                readOnly
                value={engagementLogs}
                className="h-32 bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales-data">Dados de Vendas</Label>
              <Textarea
                id="sales-data"
                readOnly
                value={salesData}
                className="h-32 bg-secondary"
              />
            </div>
          </div>
          {suggestion && (
            <Alert>
                <Wand2 className="h-4 w-4" />
              <AlertTitle>Sugestão da IA</AlertTitle>
              <AlertDescription className="space-y-2">
                <p><strong>Horários Sugeridos:</strong> {suggestion.suggestedFollowUpTimes}</p>
                <p><strong>Justificativa:</strong> {suggestion.reasoning}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Gerar Sugestões
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
