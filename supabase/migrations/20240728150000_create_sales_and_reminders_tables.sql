-- Create sales table
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "clientId" UUID REFERENCES clients(id) ON DELETE CASCADE,
    "clientName" TEXT NOT NULL,
    product TEXT NOT NULL,
    value NUMERIC NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Contato inicial', 'Proposta enviada', 'Negociação', 'Fechada', 'Perdida')),
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Create reminders table
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "clientId" UUID REFERENCES clients(id) ON DELETE CASCADE,
    "clientName" TEXT NOT NULL,
    title TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pendente', 'concluído')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Enable Row Level Security (RLS) for the new tables
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- Create policies to allow users to access their own data
-- For now, we'll allow all authenticated users to do all operations.
-- You should restrict these policies further based on your app's requirements.

CREATE POLICY "Allow all operations for authenticated users on sales" 
ON sales
FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Allow all operations for authenticated users on reminders" 
ON reminders
FOR ALL 
TO authenticated 
USING (true);
