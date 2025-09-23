-- Create the clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  document TEXT, -- CNPJ or CPF
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create the sales table
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  product TEXT NOT NULL,
  value NUMERIC NOT NULL,
  status TEXT CHECK (status IN ('Contato inicial', 'Proposta enviada', 'Negociação', 'Fechada', 'Perdida')) NOT NULL,
  date DATE NOT NULL
);

-- Create the engagements table
CREATE TABLE engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  type TEXT CHECK (type IN ('Email', 'Ligação', 'Reunião')) NOT NULL,
  notes TEXT
);

-- Create the reminders table
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('pendente', 'concluído')) NOT NULL
);

-- Function to get client name for sales
CREATE OR REPLACE FUNCTION get_client_name(client_id_param UUID)
RETURNS TEXT AS $$
DECLARE
  client_name_var TEXT;
BEGIN
  SELECT name INTO client_name_var FROM clients WHERE id = client_id_param;
  RETURN client_name_var;
END;
$$ LANGUAGE plpgsql;

-- Alter sales table to add client_name
ALTER TABLE sales
ADD COLUMN client_name TEXT;

-- Trigger to update client_name on sales insert
CREATE OR REPLACE FUNCTION set_client_name_on_sale()
RETURNS TRIGGER AS $$
BEGIN
  NEW.client_name := get_client_name(NEW.client_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_client_name_trigger
BEFORE INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION set_client_name_on_sale();

-- Function to get client name for reminders
CREATE OR REPLACE FUNCTION get_client_name_for_reminder(client_id_param UUID)
RETURNS TEXT AS $$
DECLARE
  client_name_var TEXT;
BEGIN
  SELECT name INTO client_name_var FROM clients WHERE id = client_id_param;
  RETURN client_name_var;
END;
$$ LANGUAGE plpgsql;

-- Alter reminders table to add client_name
ALTER TABLE reminders
ADD COLUMN client_name TEXT;

-- Trigger to update client_name on reminders insert
CREATE OR REPLACE FUNCTION set_client_name_on_reminder()
RETURNS TRIGGER AS $$
BEGIN
  NEW.client_name := get_client_name_for_reminder(NEW.client_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_client_name_on_reminder_trigger
BEFORE INSERT ON reminders
FOR EACH ROW
EXECUTE FUNCTION set_client_name_on_reminder();
