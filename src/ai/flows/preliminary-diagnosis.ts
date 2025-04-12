// src/ai/flows/preliminary-diagnosis.ts
'use server';
/**
 * @fileOverview AI-assisted preliminary diagnosis flow.
 *
 * This file defines a Genkit flow that takes patient symptoms and medical history as input,
 * and suggests potential diagnoses to discuss with a doctor.
 *
 * @exports {
 *   preliminaryDiagnosis,
 *   PreliminaryDiagnosisInput,
 *   PreliminaryDiagnosisOutput
 * }
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PreliminaryDiagnosisInputSchema = z.object({
  symptoms: z.string().describe('The symptoms experienced by the patient.'),
  medicalHistory: z.string().describe('The medical history of the patient.'),
});
export type PreliminaryDiagnosisInput = z.infer<typeof PreliminaryDiagnosisInputSchema>;

const PreliminaryDiagnosisOutputSchema = z.object({
  potentialDiagnoses: z.string().describe('A list of potential diagnoses to discuss with a doctor.'),
  confidenceLevel: z.number().describe('A confidence level (0-1) for the diagnoses suggested.'),
});
export type PreliminaryDiagnosisOutput = z.infer<typeof PreliminaryDiagnosisOutputSchema>;

export async function preliminaryDiagnosis(input: PreliminaryDiagnosisInput): Promise<PreliminaryDiagnosisOutput> {
  return preliminaryDiagnosisFlow(input);
}

const preliminaryDiagnosisPrompt = ai.definePrompt({
  name: 'preliminaryDiagnosisPrompt',
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

const preliminaryDiagnosisFlow = ai.defineFlow<
  typeof PreliminaryDiagnosisInputSchema,
  typeof PreliminaryDiagnosisOutputSchema
>({ name: 'preliminaryDiagnosisFlow', inputSchema: PreliminaryDiagnosisInputSchema, outputSchema: PreliminaryDiagnosisOutputSchema }, async input => {
  const {output} = await preliminaryDiagnosisPrompt(input);
  return output!;
});
