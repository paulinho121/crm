'use server';
/**
 * @fileOverview An AI agent that suggests optimal follow-up times for clients based on recent engagement logs and sales data.
 *
 * - suggestOptimalFollowUpTimes - A function that handles the follow-up time suggestion process.
 * - SuggestOptimalFollowUpTimesInput - The input type for the suggestOptimalFollowUpTimes function.
 * - SuggestOptimalFollowUpTimesOutput - The return type for the suggestOptimalFollowUpTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalFollowUpTimesInputSchema = z.object({
  engagementLogs: z
    .string()
    .describe('Registros de engajamento recentes com o cliente.'),
  salesData: z.string().describe('Dados de vendas para o cliente.'),
  clientName: z.string().describe('O nome do cliente.'),
});
export type SuggestOptimalFollowUpTimesInput =
  z.infer<typeof SuggestOptimalFollowUpTimesInputSchema>;

const SuggestOptimalFollowUpTimesOutputSchema = z.object({
  suggestedFollowUpTimes: z
    .string()
    .describe(
      'Horários ideais sugeridos para acompanhamento com o cliente, formatados como uma lista de data e hora separadas por vírgula.'
    ),
  reasoning: z
    .string()
    .describe('Justificativa por trás dos horários de acompanhamento sugeridos.'),
});
export type SuggestOptimalFollowUpTimesOutput =
  z.infer<typeof SuggestOptimalFollowUpTimesOutputSchema>;

export async function suggestOptimalFollowUpTimes(
  input: SuggestOptimalFollowUpTimesInput
): Promise<SuggestOptimalFollowUpTimesOutput> {
  return suggestOptimalFollowUpTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalFollowUpTimesPrompt',
  input: {schema: SuggestOptimalFollowUpTimesInputSchema},
  output: {schema: SuggestOptimalFollowUpTimesOutputSchema},
  prompt: `Você é um assistente de vendas de IA. Seu objetivo é analisar os registros de engajamento do cliente e os dados de vendas e sugerir os melhores horários para acompanhamento.

  Nome do Cliente: {{{clientName}}}
  Registros de Engajamento: {{{engagementLogs}}}
  Dados de Vendas: {{{salesData}}}

  Com base nas informações fornecidas, sugira os melhores horários para acompanhamento com o cliente. Forneça uma breve justificativa para suas sugestões.
  Formate os horários de acompanhamento sugeridos como uma lista de data e hora separadas por vírgula.
`,
});

const suggestOptimalFollowUpTimesFlow = ai.defineFlow(
  {
    name: 'suggestOptimalFollowUpTimesFlow',
    inputSchema: SuggestOptimalFollowUpTimesInputSchema,
    outputSchema: SuggestOptimalFollowUpTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
