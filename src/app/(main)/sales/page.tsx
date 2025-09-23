import { Header } from '@/components/header';
import { SalesKanbanBoard } from '@/components/sales/sales-kanban-board';
import { supabase } from '@/lib/supabase';
import { Sale, Client } from '@/lib/types';

export default async function SalesPage() {
  const { data: sales, error: salesError } = await supabase.from('sales').select('*');
  const { data: clients, error: clientsError } = await supabase.from('clients').select('*');

  if (salesError || clientsError) {
    console.error('Error fetching data:', salesError || clientsError);
    return (
      <div className="flex flex-1 flex-col h-screen">
        <Header pageTitle="Funil de Vendas" />
        <main className="flex-1 overflow-x-auto p-4 md:p-6">
          <p className="text-red-500">Erro ao carregar os dados.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-screen">
      <Header pageTitle="Funil de Vendas" />
      <main className="flex-1 overflow-x-auto p-4 md:p-6">
        <SalesKanbanBoard initialSales={sales as Sale[]} initialClients={clients as Client[]} />
      </main>
    </div>
  );
}
