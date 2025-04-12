/**
 * Represents a doctor with their availability.
 */
export interface Doctor {
  /**
   * The name of the doctor.
   */
  name: string;
  /**
   * The doctor's speciality
   */
  speciality: string;
  /**
   * The doctor's availability.
   */
  availability: string[];
}

/**
 * Asynchronously retrieves a list of available doctors.
 *
 * @returns A promise that resolves to a list of Doctor objects.
 */
export async function getAvailableDoctors(): Promise<Doctor[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Dr. Smith',
      speciality: 'Cardiologist',
      availability: ['Monday 9:00-12:00', 'Wednesday 14:00-17:00'],
    },
    {
      name: 'Dr. Jones',
      speciality: 'Dermatologist',
      availability: ['Tuesday 10:00-13:00', 'Thursday 15:00-18:00'],
    },
  ];
}
