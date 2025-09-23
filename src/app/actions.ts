'use server';

import {
  suggestOptimalFollowUpTimes,
  type SuggestOptimalFollowUpTimesInput,
  type SuggestOptimalFollowUpTimesOutput,
} from '@/ai/flows/suggest-optimal-follow-up-times';

export async function getFollowUpSuggestions(
  input: SuggestOptimalFollowUpTimesInput
): Promise<SuggestOptimalFollowUpTimesOutput> {
  try {
    const result = await suggestOptimalFollowUpTimes(input);
    return result;
  } catch (error) {
    console.error('Error getting follow-up suggestions:', error);
    // In a real app, you'd want more robust error handling and logging.
    throw new Error('Falha ao obter sugestões da IA. Por favor, tente novamente mais tarde.');
  }
}
