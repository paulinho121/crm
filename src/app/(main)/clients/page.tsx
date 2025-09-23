import { Header } from '@/components/header';
import { ClientList } from '@/components/clients/client-list';

export default function ClientsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Clients" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <ClientList />
      </main>
    </div>
  );
}
