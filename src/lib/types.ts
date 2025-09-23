export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string; // CNPJ or CPF
  address: string;
  avatarUrl: string;
  createdAt: string;
};

export type Sale = {
  id: string;
  clientId: string;
  clientName: string;
  product: string;
  value: number;
  status: "Contato inicial" | "Proposta enviada" | "Negociação" | "Fechada" | "Perdida";
  date: string;
};

export type Engagement = {
  id: string;
  clientId: string;
  date: string;
  type: "Email" | "Ligação" | "Reunião";
  notes: string;
};

export type Reminder = {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  date: string;
  status: "pendente" | "concluído";
};
