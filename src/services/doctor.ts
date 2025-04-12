/**
 * Represents a doctor with their availability.
 */
export interface Doctor {
  /**
   * The unique identifier of the doctor.
   */
  id: string;
  /**
   * The name of the doctor.
   */
  name: string;
  /**
   * The specialisation of the doctor.
   */
  specialisation: string;
  /**
   * The availability of the doctor.
   */
  availability: string[];
}

/**
 * Asynchronously retrieves a list of available doctors.
 *
 * @returns A promise that resolves to an array of Doctor objects.
 */
export async function getAvailableDoctors(): Promise<Doctor[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      name: 'Dr. Smith',
      specialisation: 'Cardiologist',
      availability: ['Monday 9:00-17:00', 'Wednesday 9:00-17:00'],
    },
    {
      id: '2',
      name: 'Dr. Johnson',
      specialisation: 'Dermatologist',
      availability: ['Tuesday 9:00-17:00', 'Thursday 9:00-17:00'],
    },
  ];
}
