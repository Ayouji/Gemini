'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const TeleconsultationPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Video Teleconsultation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Secure video platform for real-time consultations between patients and doctors.</p>
          {/* Placeholder for video component */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md">
            {/* Replace with actual video component */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Teleconsultation Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeleconsultationPage;
