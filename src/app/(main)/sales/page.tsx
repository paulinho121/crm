import { Header } from '@/components/header';
import { SalesList } from '@/components/sales/sales-list';

export default function SalesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Sales" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <SalesList />
      </main>
    </div>
  );
}
