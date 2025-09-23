import { Header } from '@/components/header';
import { SalesKanbanBoard } from '@/components/sales/sales-kanban-board';
import { sales } from '@/lib/data';

export default function SalesPage() {
  return (
    <div className="flex flex-1 flex-col h-screen">
      <Header pageTitle="Funil de Vendas" />
      <main className="flex-1 overflow-x-auto p-4 md:p-6">
        <SalesKanbanBoard initialSales={sales} />
      </main>
    </div>
  );
}
