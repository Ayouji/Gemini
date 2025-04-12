'use client';

import React, {useState, useEffect} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {getAvailableDoctors, getAvailableTimeSlots, bookAppointment, Doctor, TimeSlot} from '@/services/appointment-booking';
import {useToast} from "@/hooks/use-toast";
import {format} from 'date-fns';

const AppointmentBookingPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | undefined>(undefined);
  const [isBooking, setIsBooking] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    const fetchDoctors = async () => {
      const availableDoctors = await getAvailableDoctors();
      setDoctors(availableDoctors);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedDoctorId || !date) {
        return;
      }

      const formattedDate = format(date, 'yyyy-MM-dd');
      const availableTimeSlots = await getAvailableTimeSlots(selectedDoctorId, formattedDate);
      setTimeSlots(availableTimeSlots);
    };

    fetchTimeSlots();
  }, [selectedDoctorId, date]);

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setTimeSlots([]); // Clear existing time slots when doctor changes
    setSelectedTimeSlot(undefined);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    setTimeSlots([]); // Clear existing time slots when date changes
    setSelectedTimeSlot(undefined);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctorId || !date || !selectedTimeSlot) {
      toast({
        title: 'Error booking appointment',
        description: 'Please select a doctor, date, and time slot.',
        variant: 'destructive',
      });
      return;
    }

    setIsBooking(true);
    try {
      // Replace 'patient123' with the actual patient ID (you might get this from authentication context)
      const success = await bookAppointment('patient123', selectedDoctorId, selectedTimeSlot);
      if (success) {
        toast({
          title: 'Appointment booked',
          description: `Your appointment with Dr. ${doctors.find(d => d.id === selectedDoctorId)?.name} on ${format(date, 'PPP')} at ${selectedTimeSlot.startTime} has been booked.`,
        });
      } else {
        toast({
          title: 'Error booking appointment',
          description: 'Something went wrong while booking your appointment. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium leading-6 text-gray-900">
              Select Doctor:
            </label>
            <Select onValueChange={handleDoctorSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a doctor"/>
              </SelectTrigger>
              <SelectContent>
                {doctors.map(doctor => (
                  <SelectItem key={doctor.id} value={doctor.id}>{doctor.name} ({doctor.specialty})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
              Select Date:
            </label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Select Time Slot:
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {timeSlots.map(slot => (
                <Button
                  key={slot.startTime}
                  variant={selectedTimeSlot === slot ? 'secondary' : 'outline'}
                  onClick={() => handleTimeSlotSelect(slot)}
                  disabled={isBooking}
                >
                  {slot.startTime} - {slot.endTime}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={handleBookAppointment} disabled={isBooking || !selectedDoctorId || !date || !selectedTimeSlot}>
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBookingPage;
