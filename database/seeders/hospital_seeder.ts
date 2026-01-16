import Hospital from '#models/hospital'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const hospitals = [
      {
        hospital_name: 'Devi hospital',
        address: 'kalanai nagar',
        city: 'Indore',
        state: 'Madhy Pradesh',
      },
      {
        hospital_name: 'Devilal hospital',
        address: 'sangam nagar',
        city: 'Indore',
        state: 'Madhy Pradesh',
      },
      {
        hospital_name: 'Deviahilya hospital',
        address: 'rajendra nagar',
        city: 'Indore',
        state: 'Madhy Pradesh',
      },
      {
        hospital_name: 'Deshmukh hospital',
        address: 'kalanai nagar',
        city: 'bhopal',
        state: 'Madhy Pradesh',
      },
      {
        hospital_name: 'Anpurna hospital',
        address: 'kalanai nagar',
        city: 'Indore',
        state: 'Dheli',
      },
    ]

    for (const hospital of hospitals) {
      const exists = await Hospital.query()
        .where('hospital_name', hospital.hospital_name)
        .where('address', hospital.address)
        .where('city', hospital.city)
        .where('state', hospital.state)
        .first()
      if (!exists) {
        await Hospital.create(hospital)
      }
    }
  }
}
