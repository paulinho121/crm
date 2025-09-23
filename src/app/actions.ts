'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Endereço de e-mail inválido'),
  phone: z.string().min(10, 'Número de telefone inválido'),
  document: z.string().min(11, 'Documento inválido (CPF/CNPJ)'),
  address: z.string().min(5, 'Endereço é obrigatório'),
});

export async function createClient(values: z.infer<typeof clientSchema>) {
  const validatedFields = clientSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Campos inválidos!',
    };
  }
  
  const avatarUrl = `https://avatar.vercel.sh/${encodeURIComponent(validatedFields.data.name)}.png`;

  const { data, error } = await supabase
    .from('clients')
    .insert([{ ...validatedFields.data, avatarUrl: avatarUrl }])
    .select();

  if (error) {
    console.error('Error creating client:', error);
    return {
      error: 'Erro no banco de dados: Falha ao criar o cliente.',
    };
  }

  revalidatePath('/clients');
  revalidatePath('/'); // Revalidate the dashboard page as well

  return {
    data: data,
  };
}

export async function deleteClient(clientId: string) {
  const { error } = await supabase.from('clients').delete().eq('id', clientId);

  if (error) {
    console.error('Error deleting client:', error);
    return {
      error: 'Erro no banco de dados: Falha ao excluir o cliente.',
    };
  }

  revalidatePath('/clients');
  revalidatePath('/'); // Revalidate the dashboard page as well
}
