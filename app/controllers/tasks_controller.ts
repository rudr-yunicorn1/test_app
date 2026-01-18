import type { HttpContext } from '@adonisjs/core/http'
import Patients from '#models/patient'
import Doctors from '#models/doctor'
import Hospitals from '#models/hospital'
import Appointment from '#models/appointment'

export default class TasksController {
  //this will give us the vaccinated patient details
  async vaccinated({ response }: HttpContext) {
    try {
      const patient = await Appointment.query()
        .where('status_id', 1)
        .preload('patient')
        .select('patient_id')
      return response.status(200).json({ patient })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async doc_patient({ response }: HttpContext) {
    try {
      const details = await Patients.query().preload('doctor').select('doctor_id')
      return response.status(200).json({ details })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async age_details({ response, params }: HttpContext) {
    try {
      const patients = await Patients.query().where('age', params.id)
      return response.status(200).json({ patients })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async status({ response, params }: HttpContext) {
    try {
      const appointment = await Appointment.query().where('id', params.id).first()
      if (!appointment) {
        return response.badRequest({ message: 'appointment is not there' })
      }
      const up: boolean = true
      appointment.status_id = up
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}
