'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {generatePrescription, sendPrescription, Prescription} from '@/services/prescription-management';
import {useToast} from "@/hooks/use-toast";

const PrescriptionManagementPage = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const {toast} = useToast();

  const handleGeneratePrescription = async () => {
    setIsGenerating(true);
    try {
      const newPrescription = await generatePrescription(patientId, doctorId, medication, dosage, instructions);
      setPrescription(newPrescription);
      toast({
        title: 'Prescription Generated',
        description: `Prescription for ${newPrescription.medication} has been generated.`,
      });
    } catch (error) {
      console.error('Error generating prescription:', error);
      toast({
        title: 'Error Generating Prescription',
        description: 'Failed to generate prescription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendPrescription = async () => {
    if (!prescription) {
      toast({
        title: 'No Prescription',
        description: 'Please generate a prescription first.',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);
    try {
      const success = await sendPrescription(prescription.id, patientId);
      if (success) {
        toast({
          title: 'Prescription Sent',
          description: `Prescription for ${prescription.medication} has been sent to patient ${patientId}.`,
        });
      } else {
        toast({
          title: 'Error Sending Prescription',
          description: 'Failed to send prescription. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sending prescription:', error);
      toast({
        title: 'Error Sending Prescription',
        description: 'Failed to send prescription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Prescription Management</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium leading-6 text-gray-900">
              Patient ID:
            </label>
            <Input
              type="text"
              id="patientId"
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
              placeholder="Enter Patient ID"
            />
          </div>
          <div>
            <label htmlFor="doctorId" className="block text-sm font-medium leading-6 text-gray-900">
              Doctor ID:
            </label>
            <Input
              type="text"
              id="doctorId"
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              placeholder="Enter Doctor ID"
            />
          </div>
          <div>
            <label htmlFor="medication" className="block text-sm font-medium leading-6 text-gray-900">
              Medication:
            </label>
            <Input
              type="text"
              id="medication"
              value={medication}
              onChange={e => setMedication(e.target.value)}
              placeholder="Enter Medication"
            />
          </div>
          <div>
            <label htmlFor="dosage" className="block text-sm font-medium leading-6 text-gray-900">
              Dosage:
            </label>
            <Input
              type="text"
              id="dosage"
              value={dosage}
              onChange={e => setDosage(e.target.value)}
              placeholder="Enter Dosage"
            />
          </div>
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium leading-6 text-gray-900">
              Instructions:
            </label>
            <Input
              type="text"
              id="instructions"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="Enter Instructions"
            />
          </div>
          <Button onClick={handleGeneratePrescription} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Prescription'}
          </Button>
          {prescription && (
            <Button onClick={handleSendPrescription} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Prescription'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionManagementPage;
