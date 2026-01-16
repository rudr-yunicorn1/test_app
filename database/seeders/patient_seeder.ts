import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Patients from '#models/patient'

export default class extends BaseSeeder {
  async run() {
    const patients = [
      {
        patient_name: 'Rudresh Dixit',
        father_name: 'Rajendra Dixit',
        age: 5,
        doctor_id: 1,
        vaccine_name: 'polio',
        phone_number: 1234567780,
      },
      {
        patient_name: 'priyanshi Dixit',
        father_name: 'rahendra Dixit',
        age: 4,
        doctor_id: 2,
        vaccine_name: 'corona',
        phone_number: 1234577780,
      },
      {
        patient_name: 'rakesh Dixit',
        father_name: 'Rampal Dixit',
        age: 5,
        doctor_id: 3,
        vaccine_name: 'corona',
        phone_number: 1234566780,
      },
      {
        patient_name: 'Dixit',
        father_name: 'Dixit',
        age: 5,
        doctor_id: 4,
        vaccine_name: 'polio',
        phone_number: 1234567888,
      },
      {
        patient_name: 'Rudresh',
        father_name: 'Rajendra',
        age: 5,
        doctor_id: 5,
        vaccine_name: '1',
        phone_number: 1134567780,
      },
      {
        patient_name: 'Rudr Dixit',
        father_name: 'Raj Dixit',
        age: 5,
        doctor_id: 6,
        vaccine_name: '2',
        phone_number: 1224567780,
      },
      {
        patient_name: 'RudrDixit',
        father_name: 'RajDixit',
        age: 5,
        doctor_id: 7,
        vaccine_name: '3',
        phone_number: 1234537780,
      },
      {
        patient_name: 'Rudr Dixit',
        father_name: 'Raj Dixit',
        age: 5,
        doctor_id: 8,
        vaccine_name: '4',
        phone_number: 1234567780,
      },
      {
        patient_name: 'Rudresh Dixit',
        father_name: 'Rajendra Dixit',
        age: 5,
        doctor_id: 9,
        vaccine_name: 'polio',
        phone_number: 1234567780,
      },
      {
        patient_name: 'Rudresh Dixit',
        father_name: 'Rajendra Dixit',
        age: 5,
        doctor_id: 10,
        vaccine_name: 'polio',
        phone_number: 1234567780,
      },
      {
        patient_name: 'Rudresh Dixit',
        father_name: 'Rajendra Dixit',
        age: 5,
        doctor_id: 11,
        vaccine_name: '11',
        phone_number: 1233567780,
      },
    ]
    for (const patient of patients) {
      const exist = await Patients.query().where('phone_number', patient.phone_number).first()
      if (!exist) {
        await Patients.create(patient)
      }
    }
  }
}
