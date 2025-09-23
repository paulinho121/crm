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
    .describe('Recent engagement logs with the client.'),
  salesData: z.string().describe('Sales data for the client.'),
  clientName: z.string().describe('The name of the client.'),
});
export type SuggestOptimalFollowUpTimesInput =
  z.infer<typeof SuggestOptimalFollowUpTimesInputSchema>;

const SuggestOptimalFollowUpTimesOutputSchema = z.object({
  suggestedFollowUpTimes: z
    .string()
    .describe(
      'Suggested optimal times for follow-ups with the client, formatted as a comma-separated list of datetimes.'
    ),
  reasoning: z
    .string()
    .describe('Reasoning behind the suggested follow-up times.'),
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
  prompt: `You are an AI sales assistant. Your goal is to analyze client engagement logs and sales data and suggest optimal times for follow-ups.

  Client Name: {{{clientName}}}
  Engagement Logs: {{{engagementLogs}}}
  Sales Data: {{{salesData}}}

  Based on the provided information, suggest optimal times for follow-ups with the client. Provide a brief reasoning for your suggestions.
  Format the suggested follow-up times as a comma-separated list of datetimes.
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
