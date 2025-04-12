// src/app/ai-diagnosis/page.tsx
'use client';

import {useState} from 'react';
import {aiAssistedDiagnosis} from '@/ai/flows/ai-assisted-diagnosis';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';

export default function AiDiagnosisPage() {
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiagnosis = async () => {
    setIsLoading(true);
    try {
      const result = await aiAssistedDiagnosis({
        symptoms: symptoms,
        medicalHistory: medicalHistory,
      });
      setDiagnosis(result.potentialDiagnoses);
      setConfidenceLevel(result.confidenceLevel);
    } catch (error) {
      console.error('Error during AI diagnosis:', error);
      setDiagnosis('Error occurred while processing diagnosis.');
      setConfidenceLevel(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Assisted Preliminary Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium leading-6 text-gray-900">
              Symptoms:
            </label>
            <div className="mt-2">
              <Textarea
                id="symptoms"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter symptoms"
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="medicalHistory" className="block text-sm font-medium leading-6 text-gray-900">
              Medical History:
            </label>
            <div className="mt-2">
              <Textarea
                id="medicalHistory"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter medical history"
                value={medicalHistory}
                onChange={e => setMedicalHistory(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleDiagnosis} disabled={isLoading}>
            {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
          </Button>
          {diagnosis && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Potential Diagnosis:</h2>
              <p>{diagnosis}</p>
              <p>Confidence Level: {confidenceLevel}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
