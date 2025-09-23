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
  status: "ongoing" | "closed" | "lost";
  date: string;
};

export type Engagement = {
  id: string;
  clientId: string;
  date: string;
  type: "Email" | "Call" | "Meeting";
  notes: string;
};

export type Reminder = {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  date: string;
  status: "pending" | "completed";
};
