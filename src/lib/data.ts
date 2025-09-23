import type { Client, Sale, Engagement, Reminder } from './types';

export const clients: Client[] = [
  {
    id: '1',
    name: 'InnovateTech Solutions',
    email: 'contact@innovatetech.com',
    phone: '(11) 98765-4321',
    document: '12.345.678/0001-90',
    address: 'Rua da Tecnologia, 123, São Paulo, SP',
    avatarUrl: 'https://picsum.photos/seed/innovate/40/40',
    createdAt: '2023-01-15T09:30:00Z',
  },
  {
    id: '2',
    name: 'GreenLeaf Organics',
    email: 'support@greenleaf.com',
    phone: '(21) 91234-5678',
    document: '98.765.432/0001-10',
    address: 'Avenida Sustentável, 456, Rio de Janeiro, RJ',
    avatarUrl: 'https://picsum.photos/seed/greenleaf/40/40',
    createdAt: '2023-02-20T14:00:00Z',
  },
  {
    id: '3',
    name: 'Quantum-Core AI',
    email: 'dev@quantumcore.ai',
    phone: '(31) 99988-7766',
    document: '55.432.198/0001-22',
    address: 'Alameda da Inovação, 789, Belo Horizonte, MG',
    avatarUrl: 'https://picsum.photos/seed/quantum/40/40',
    createdAt: '2023-03-10T11:45:00Z',
  },
  {
    id: '4',
    name: 'NexaLogistics',
    email: 'logistics@nexa.com',
    phone: '(41) 98877-6655',
    document: '11.222.333/0001-44',
    address: 'Rodovia do Progresso, 101, Curitiba, PR',
    avatarUrl: 'https://picsum.photos/seed/nexa/40/40',
    createdAt: '2023-04-05T16:20:00Z',
  },
  {
    id: '5',
    name: 'Solaris Energy',
    email: 'energia@solaris.com',
    phone: '(51) 97766-5544',
    document: '44.555.666/0001-88',
    address: 'Estrada do Sol, 202, Porto Alegre, RS',
    avatarUrl: 'https://picsum.photos/seed/solaris/40/40',
    createdAt: '2023-05-25T08:00:00Z',
  },
];

export const sales: Sale[] = [
  { id: '1', clientId: '1', clientName: 'InnovateTech Solutions', product: 'AI Consulting Service', value: 15000, status: 'closed', date: '2023-02-01' },
  { id: '2', clientId: '2', clientName: 'GreenLeaf Organics', product: 'Organic Products Subscription', value: 1200, status: 'closed', date: '2023-03-15' },
  { id: '3', clientId: '3', clientName: 'Quantum-Core AI', product: 'Quantum Computing License', value: 50000, status: 'ongoing', date: '2023-04-10' },
  { id: '4', clientId: '1', clientName: 'InnovateTech Solutions', product: 'Cloud Migration Package', value: 25000, status: 'ongoing', date: '2023-05-20' },
  { id: '5', clientId: '4', clientName: 'NexaLogistics', product: 'Fleet Management System', value: 35000, status: 'closed', date: '2023-06-01' },
  { id: '6', clientId: '5', clientName: 'Solaris Energy', product: 'Solar Panel Installation', value: 45000, status: 'lost', date: '2023-06-15' },
  { id: '7', clientId: '2', clientName: 'GreenLeaf Organics', product: 'Marketing Campaign', value: 5000, status: 'ongoing', date: '2023-07-01' },
  { id: '8', clientId: '3', clientName: 'Quantum-Core AI', product: 'Support Contract', value: 10000, status: 'closed', date: '2023-07-05' },
];

export const engagements: Engagement[] = [
    { id: '1', clientId: '1', date: '2023-01-20', type: 'Email', notes: 'Initial contact and presentation sent.' },
    { id: '2', clientId: '1', date: '2023-01-25', type: 'Call', notes: 'Follow-up call to discuss proposal. Client interested in AI consulting.' },
    { id: '3', clientId: '1', date: '2023-01-28', type: 'Meeting', notes: 'Meeting to finalize the deal. Contract signed.' },
    { id: '4', clientId: '2', date: '2023-03-01', type: 'Email', notes: 'Inquiry about organic products. Sent our catalog.' },
    { id: '5', clientId: '2', date: '2023-03-05', type: 'Call', notes: 'Client placed an order via phone.' },
    { id: '6', clientId: '3', date: '2023-04-05', type: 'Meeting', notes: 'Demo of the Quantum Computing platform. Client was impressed.' },
    { id: '7', clientId: '3', date: '2023-04-08', type: 'Email', notes: 'Sent quote and license agreement.' },
];

export const reminders: Reminder[] = [
  { id: '1', clientId: '3', clientName: 'Quantum-Core AI', title: 'Follow-up on Quantum license', date: '2024-07-28', status: 'pending' },
  { id: '2', clientId: '4', clientName: 'NexaLogistics', title: 'Check in about new features', date: '2024-07-30', status: 'pending' },
  { id: '3', clientId: '1', clientName: 'InnovateTech Solutions', title: 'Discuss cloud migration progress', date: '2024-07-25', status: 'completed' },
  { id: '4', clientId: '2', clientName: 'GreenLeaf Organics', title: 'Send new marketing proposal', date: '2024-08-01', status: 'pending' },
];
