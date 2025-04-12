// src/ai/flows/diagnosis-suggestions.ts
'use server';
/**
 * @fileOverview AI-powered diagnosis suggestions flow.
 *
 * This file defines a Genkit flow that takes patient symptoms and medical history as input,
 * and suggests potential diagnoses to discuss with a doctor.
 *
 * @exports {
 *   diagnosisSuggestions,
 *   DiagnosisSuggestionsInput,
 *   DiagnosisSuggestionsOutput
 * }
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const DiagnosisSuggestionsInputSchema = z.object({
  symptoms: z.string().describe('The symptoms experienced by the patient.'),
  medicalHistory: z.string().describe('The medical history of the patient.'),
});
export type DiagnosisSuggestionsInput = z.infer<typeof DiagnosisSuggestionsInputSchema>;

const DiagnosisSuggestionsOutputSchema = z.object({
  potentialDiagnoses: z.string().describe('A list of potential diagnoses to discuss with a doctor.'),
  confidenceLevel: z.number().describe('A confidence level (0-1) for the diagnoses suggested.'),
});
export type DiagnosisSuggestionsOutput = z.infer<typeof DiagnosisSuggestionsOutputSchema>;

export async function diagnosisSuggestions(input: DiagnosisSuggestionsInput): Promise<DiagnosisSuggestionsOutput> {
  return diagnosisSuggestionsFlow(input);
}

const diagnosisSuggestionsPrompt = ai.definePrompt({
  name: 'diagnosisSuggestionsPrompt',
  input: {
    schema: z.object({
      symptoms: z.string().describe('The symptoms experienced by the patient.'),
      medicalHistory: z.string().describe('The medical history of the patient.'),
    }),
  },
  output: {
    schema: z.object({
      potentialDiagnoses: z.string().describe('A list of potential diagnoses to discuss with a doctor.'),
      confidenceLevel: z.number().describe('A confidence level (0-1) for the diagnoses suggested.'),
    }),
  },
  prompt: `You are an AI assistant that provides potential diagnoses based on patient symptoms and medical history.

  Based on the following information, suggest potential diagnoses to discuss with a doctor.

  Symptoms: {{{symptoms}}}
  Medical History: {{{medicalHistory}}}

  Provide a confidence level (0-1) for the diagnoses suggested.
  `,
});

const diagnosisSuggestionsFlow = ai.defineFlow<
  typeof DiagnosisSuggestionsInputSchema,
  typeof DiagnosisSuggestionsOutputSchema
>({
  name: 'diagnosisSuggestionsFlow',
  inputSchema: DiagnosisSuggestionsInputSchema,
  outputSchema: DiagnosisSuggestionsOutputSchema,
}, async input => {
  const {output} = await diagnosisSuggestionsPrompt(input);
  return output!;
});
