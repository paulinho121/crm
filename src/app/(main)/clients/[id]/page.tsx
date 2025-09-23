import { Header } from '@/components/header';
import { clients, sales, engagements } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Activity,
  Wand2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FollowUpSuggester } from '@/components/clients/follow-up-suggester';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);
  if (!client) {
    notFound();
  }

  const clientSales = sales.filter((s) => s.clientId === client.id);
  const clientEngagements = engagements.filter((e) => e.clientId === client.id);

  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Detalhes do Cliente" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.avatarUrl} data-ai-hint="person avatar" />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-2xl">
                  {client.name}
                </CardTitle>
                <CardDescription>
                  Cliente desde{' '}
                  {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{client.document}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{client.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="sales">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales">
              <DollarSign className="mr-2 h-4 w-4" /> Histórico de Vendas
            </TabsTrigger>
            <TabsTrigger value="engagements">
              <Activity className="mr-2 h-4 w-4" /> Registro de Engajamento
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Wand2 className="mr-2 h-4 w-4" /> Acompanhamento com IA
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>${sale.value.toLocaleString('pt-BR')}</TableCell>
                        <TableCell>
                          {new Date(sale.date).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sale.status === 'Fechada'
                                ? 'default'
                                : sale.status === 'Perdida'
                                ? 'destructive'
                                : 'secondary'
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
          </TabsContent>
          <TabsContent value="engagements">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Engajamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {clientEngagements.map((engagement) => (
                  <div key={engagement.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                            <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 w-px bg-border"></div>
                    </div>
                    <div>
                      <p className="font-medium">{engagement.type} em {new Date(engagement.date).toLocaleDateString('pt-BR')}</p>
                      <p className="text-muted-foreground">{engagement.notes}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ai">
            <FollowUpSuggester clientName={client.name} engagements={clientEngagements} sales={clientSales} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
