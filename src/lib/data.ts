import type { Client, Sale, Engagement, Reminder } from './types';

export const clients: Client[] = [
  {
    id: '1',
    name: 'InnovateTech Soluções',
    email: 'contato@innovatetech.com',
    phone: '(11) 98765-4321',
    document: '12.345.678/0001-90',
    address: 'Rua da Tecnologia, 123, São Paulo, SP',
    avatarUrl: 'https://picsum.photos/seed/innovate/40/40',
    createdAt: '2023-01-15T09:30:00Z',
  },
  {
    id: '2',
    name: 'GreenLeaf Orgânicos',
    email: 'suporte@greenleaf.com',
    phone: '(21) 91234-5678',
    document: '98.765.432/0001-10',
    address: 'Avenida Sustentável, 456, Rio de Janeiro, RJ',
    avatarUrl: 'https://picsum.photos/seed/greenleaf/40/40',
    createdAt: '2023-02-20T14:00:00Z',
  },
  {
    id: '3',
    name: 'Quantum-Core IA',
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
    email: 'logistica@nexa.com',
    phone: '(41) 98877-6655',
    document: '11.222.333/0001-44',
    address: 'Rodovia do Progresso, 101, Curitiba, PR',
    avatarUrl: 'https://picsum.photos/seed/nexa/40/40',
    createdAt: '2023-04-05T16:20:00Z',
  },
  {
    id: '5',
    name: 'Solaris Energia',
    email: 'energia@solaris.com',
    phone: '(51) 97766-5544',
    document: '44.555.666/0001-88',
    address: 'Estrada do Sol, 202, Porto Alegre, RS',
    avatarUrl: 'https://picsum.photos/seed/solaris/40/40',
    createdAt: '2023-05-25T08:00:00Z',
  },
];

export const sales: Sale[] = [
  { id: '1', clientId: '1', clientName: 'InnovateTech Soluções', product: 'Serviço de Consultoria em IA', value: 15000, status: 'fechada', date: '2023-02-01' },
  { id: '2', clientId: '2', clientName: 'GreenLeaf Orgânicos', product: 'Assinatura de Produtos Orgânicos', value: 1200, status: 'fechada', date: '2023-03-15' },
  { id: '3', clientId: '3', clientName: 'Quantum-Core IA', product: 'Licença de Computação Quântica', value: 50000, status: 'em andamento', date: '2023-04-10' },
  { id: '4', clientId: '1', clientName: 'InnovateTech Soluções', product: 'Pacote de Migração para Nuvem', value: 25000, status: 'em andamento', date: '2023-05-20' },
  { id: '5', clientId: '4', clientName: 'NexaLogistics', product: 'Sistema de Gerenciamento de Frota', value: 35000, status: 'fechada', date: '2023-06-01' },
  { id: '6', clientId: '5', clientName: 'Solaris Energia', product: 'Instalação de Painel Solar', value: 45000, status: 'perdida', date: '2023-06-15' },
  { id: '7', clientId: '2', clientName: 'GreenLeaf Orgânicos', product: 'Campanha de Marketing', value: 5000, status: 'em andamento', date: '2023-07-01' },
  { id: '8', clientId: '3', clientName: 'Quantum-Core IA', product: 'Contrato de Suporte', value: 10000, status: 'fechada', date: '2023-07-05' },
];

export const engagements: Engagement[] = [
    { id: '1', clientId: '1', date: '2023-01-20', type: 'Email', notes: 'Contato inicial e apresentação enviada.' },
    { id: '2', clientId: '1', date: '2023-01-25', type: 'Ligação', notes: 'Ligação de acompanhamento para discutir a proposta. Cliente interessado em consultoria de IA.' },
    { id: '3', clientId: '1', date: '2023-01-28', type: 'Reunião', notes: 'Reunião para finalizar o acordo. Contrato assinado.' },
    { id: '4', clientId: '2', date: '2023-03-01', type: 'Email', notes: 'Pedido de informações sobre produtos orgânicos. Enviamos nosso catálogo.' },
    { id: '5', clientId: '2', date: '2023-03-05', type: 'Ligação', notes: 'Cliente fez um pedido por telefone.' },
    { id: '6', clientId: '3', date: '2023-04-05', type: 'Reunião', notes: 'Demonstração da plataforma de Computação Quântica. Cliente ficou impressionado.' },
    { id: '7', clientId: '3', date: '2023-04-08', type: 'Email', notes: 'Cotação e contrato de licença enviados.' },
];

export const reminders: Reminder[] = [
  { id: '1', clientId: '3', clientName: 'Quantum-Core IA', title: 'Acompanhamento da licença Quantum', date: '2024-07-28', status: 'pendente' },
  { id: '2', clientId: '4', clientName: 'NexaLogistics', title: 'Verificar sobre novos recursos', date: '2024-07-30', status: 'pendente' },
  { id: '3', clientId: '1', clientName: 'InnovateTech Soluções', title: 'Discutir progresso da migração para nuvem', date: '2024-07-25', status: 'concluído' },
  { id: '4', clientId: '2', clientName: 'GreenLeaf Orgânicos', title: 'Enviar nova proposta de marketing', date: '2024-08-01', status: 'pendente' },
];
