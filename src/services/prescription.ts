/**
 * Represents a prescription.
 */
export interface Prescription {
  /**
   * The unique identifier of the prescription.
   */
  id: string;
  /**
   * The name of the medication.
   */
  medication: string;
  /**
   * The dosage of the medication.
   */
  dosage: string;
  /**
   * The frequency of the medication.
   */
  frequency: string;
  /**
   * The doctor who prescribed the medication.
   */
  doctor: string;
  /**
   * The patient who was prescribed the medication.
   */
  patient: string;
}

/**
 * Asynchronously creates a prescription.
 *
 * @param prescription The prescription to create.
 * @returns A promise that resolves to a Prescription object.
 */
export async function createPrescription(prescription: Prescription): Promise<Prescription> {
  // TODO: Implement this by calling an API.

  return {
    id: '1',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice daily',
    doctor: 'Dr. Smith',
    patient: 'John Doe',
  };
}
