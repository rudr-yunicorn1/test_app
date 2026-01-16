import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Doctors from '#models/doctor'
// import Hospital from '#models/hospital'

export default class extends BaseSeeder {
  async run() {
    const doctors = [
      { doctor_name: 'devilal sharma', hospital_id: 1, specialization: 'Kids' },
      { doctor_name: 'devilal sharma', hospital_id: 2, specialization: 'Kids' },
      { doctor_name: 'devilal sharma', hospital_id: 3, specialization: 'Kids' },
      { doctor_name: 'devilal sharma', hospital_id: 4, specialization: 'Kids' },
      { doctor_name: 'devilal sharma', hospital_id: 5, specialization: 'Kids' },
      { doctor_name: 'devilal mishra', hospital_id: 1, specialization: 'Kids' },
      { doctor_name: 'devilal mishra', hospital_id: 2, specialization: 'Kids' },
      { doctor_name: 'devilal mishra', hospital_id: 3, specialization: 'Kids' },
      { doctor_name: 'devilal mishra', hospital_id: 4, specialization: 'Kids' },
      { doctor_name: 'devilal mishra', hospital_id: 5, specialization: 'Kids' },
      { doctor_name: 'abhi mishra', hospital_id: 1, specialization: 'Kids' },
      { doctor_name: 'abhi mishra', hospital_id: 2, specialization: 'Kids' },
      { doctor_name: 'abhi mishra', hospital_id: 3, specialization: 'Kids' },
      { doctor_name: 'abhi mishra', hospital_id: 4, specialization: 'Kids' },
      { doctor_name: 'abhi mishra', hospital_id: 5, specialization: 'Kids' },
    ]

    for (const doctor of doctors) {
      const exists = await Doctors.query()
        .where('doctor_name', doctor.doctor_name)
        .where('hospital_id', doctor.hospital_id)
        .where('specialization', doctor.specialization)
        .first()
      if (!exists) {
        await Doctors.create(doctor)
      }
    }
  }
}
