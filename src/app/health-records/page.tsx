'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

const HealthRecordsPage = () => {
  const records = [
    {date: '2024-01-15', type: 'Consultation', description: 'General checkup', doctor: 'Dr. Smith'},
    {date: '2023-12-20', type: 'Lab Test', description: 'Blood test results', doctor: 'Dr. Smith'},
    {date: '2023-11-05', type: 'Prescription', description: 'New prescription for allergies', doctor: 'Dr. Lee'},
  ];

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Electronic Health Records</CardTitle>
          <CardContent>
            <p>Secure storage and management of your medical records.</p>
          </CardContent>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A comprehensive list of your health records.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Doctor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>{record.doctor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecordsPage;
