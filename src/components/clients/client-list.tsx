'use client';

import * as React from 'react';
import Link from 'next/link';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { Client } from '@/lib/types';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AddClientDialog } from './add-client-dialog';
import { EditClientDialog } from './edit-client-dialog'; // Import the new dialog
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { deleteClient } from '@/app/actions';

export function ClientList() {
  const [isAddClientOpen, setIsAddClientOpen] = React.useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [clientToEdit, setClientToEdit] = React.useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = React.useState<Client | null>(null);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime clients')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'clients' },
        (payload) => {
          // console.log('Change received!', payload)
          // Simple refetch for now
          fetchClients();
        }
      )
      .subscribe();

    const fetchClients = async () => {
      const { data, error } = await supabase.from('clients').select('*').order('createdAt', { ascending: false });
      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data as Client[]);
      }
    };

    fetchClients();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEditClick = (client: Client) => {
    setClientToEdit(client);
    setIsEditClientOpen(true);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!clientToDelete) return;

    startTransition(async () => {
      const result = await deleteClient(clientToDelete.id);

      if (result?.error) {
        toast({
          title: 'Erro ao excluir cliente',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Cliente Excluído',
          description: `${clientToDelete.name} foi excluído com sucesso.`,
        });
      }
      
      setIsDeleteAlertOpen(false);
      setClientToDelete(null);
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Clientes</CardTitle>
            <CardDescription>
              Gerencie seus clientes e veja o histórico de vendas deles.
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setIsAddClientOpen(true)}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Cliente
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="hidden md:table-cell">
                  Membro Desde
                </TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client: Client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={client.avatarUrl} alt="Avatar" data-ai-hint="person avatar" />
                        <AvatarFallback>
                          {client.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground hidden md:inline">
                          {client.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {client.phone}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">
                      {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Alternar menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/clients/${client.id}`}>Ver Detalhes</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(client)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(client)}>
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <AddClientDialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen} />
        <EditClientDialog client={clientToEdit} open={isEditClientOpen} onOpenChange={setIsEditClientOpen} />
      </Card>
      
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o cliente 
              <span className="font-semibold">{clientToDelete?.name}</span> e removerá seus dados de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isPending}>
              {isPending ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
