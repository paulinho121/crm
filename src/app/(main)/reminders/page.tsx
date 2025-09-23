import { Header } from '@/components/header';
import { RemindersList } from '@/components/reminders/reminders-list';

export default function RemindersPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Reminders" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <RemindersList />
      </main>
    </div>
  );
}
