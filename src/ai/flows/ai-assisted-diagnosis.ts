// src/ai/flows/ai-assisted-diagnosis.ts
'use server';
/**
 * @fileOverview AI-assisted preliminary diagnosis flow.
 *
 * This file defines a Genkit flow that takes patient symptoms and medical history as input,
 * and suggests potential diagnoses to discuss with a doctor.
 *
 * @exports {
 *   aiAssistedDiagnosis,
 *   AiAssistedDiagnosisInput,
 *   AiAssistedDiagnosisOutput
 * }
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AiAssistedDiagnosisInputSchema = z.object({
  symptoms: z.string().describe('The symptoms experienced by the patient.'),
  medicalHistory: z.string().describe('The medical history of the patient.'),
});
export type AiAssistedDiagnosisInput = z.infer<typeof AiAssistedDiagnosisInputSchema>;

const AiAssistedDiagnosisOutputSchema = z.object({
  potentialDiagnoses: z.string().describe('A list of potential diagnoses to discuss with a doctor.'),
  confidenceLevel: z.number().describe('A confidence level (0-1) for the diagnoses suggested.'),
});
export type AiAssistedDiagnosisOutput = z.infer<typeof AiAssistedDiagnosisOutputSchema>;

export async function aiAssistedDiagnosis(input: AiAssistedDiagnosisInput): Promise<AiAssistedDiagnosisOutput> {
  return aiAssistedDiagnosisFlow(input);
}

const aiAssistedDiagnosisPrompt = ai.definePrompt({
  name: 'aiAssistedDiagnosisPrompt',
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

const aiAssistedDiagnosisFlow = ai.defineFlow<
  typeof AiAssistedDiagnosisInputSchema,
  typeof AiAssistedDiagnosisOutputSchema
>({
  name: 'aiAssistedDiagnosisFlow',
  inputSchema: AiAssistedDiagnosisInputSchema,
  outputSchema: AiAssistedDiagnosisOutputSchema,
}, async input => {
  const {output} = await aiAssistedDiagnosisPrompt(input);
  return output!;
});
