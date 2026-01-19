import Patient from '#models/patient'

export class PatientService {
  public async updatebyid(
    id: number,
    data: {
      patient_name: string
      father_name: string
      age: number
      doctor_id: number
      vaccine_name: string
      phone_number: string
    }
  ) {
    const patient = await Patient.find(id)
    patient?.merge(data)
    await patient?.save()
    return patient
  }
  async createPatient(data: {
    patient_name: string
    father_name: string
    age: number
    doctor_id: number
    vaccine_name: string
    phone_number: string
  }) {
    const patient = await Patient.create({
      patient_name: data.patient_name,
      father_name: data.father_name,
      age: data.age,
      doctor_id: data.doctor_id,
      vaccine_name: data.vaccine_name,
      phone_number: data.phone_number,
    })
    return patient
  }

  async patientbyid(id: number) {
    const patient = await Patient.find(id)
    return patient
  }
}
