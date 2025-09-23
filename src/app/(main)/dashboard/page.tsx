import { Header } from '@/components/header';
import { Stats } from '@/components/dashboard/stats';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { RemindersOverview } from '@/components/dashboard/reminders-overview';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <Stats />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <SalesChart />
          </div>
          <div className="lg:col-span-3">
            <RemindersOverview />
          </div>
        </div>
      </main>
    </div>
  );
}
