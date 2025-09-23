import { Header } from '@/components/header';
import { Stats } from '@/components/dashboard/stats';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { RemindersOverview } from '@/components/dashboard/reminders-overview';
import { supabase } from '@/lib/supabase';
import { Sale, Reminder, Client } from '@/lib/types';

export default async function DashboardPage() {
  const { data: sales, error: salesError } = await supabase.from('sales').select<string, Sale>('*');
  const { data: reminders, error: remindersError } = await supabase.from('reminders').select<string, Reminder>('*');
  const { data: clients, error: clientsError } = await supabase.from('clients').select<string, Client>('*');

  if (salesError || remindersError || clientsError) {
    console.error('Error fetching data:', salesError || remindersError || clientsError);
    return <div>Erro ao carregar os dados.</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Painel" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <Stats sales={sales || []} clients={clients || []} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <SalesChart sales={sales || []} />
          </div>
          <div className="lg:col-span-3">
            <RemindersOverview reminders={reminders || []} />
          </div>
        </div>
      </main>
    </div>
  );
}
