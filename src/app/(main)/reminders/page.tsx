import { Header } from '@/components/header';
import { RemindersList } from '@/components/reminders/reminders-list';
import { supabase } from '@/lib/supabase';
import { Reminder } from '@/lib/types';

export default async function RemindersPage() {
  const { data: reminders, error } = await supabase.from('reminders').select<string, Reminder>('*');

  if (error) {
    console.error('Error fetching reminders:', error);
    return <div>Erro ao carregar os lembretes.</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Lembretes" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <RemindersList reminders={reminders || []} />
      </main>
    </div>
  );
}
