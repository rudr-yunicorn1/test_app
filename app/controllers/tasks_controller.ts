import type { HttpContext } from '@adonisjs/core/http'
import Patients from '#models/patient'
import Doctors from '#models/doctor'
import Hospitals from '#models/hospital'
import Appointment from '#models/appointment'

export default class TasksController {
  async vaccinated({ response }: HttpContext) {
    const patient = await Appointment.query()
      .where('status_id', 1)
      .preload('patient')
      .select('patient_id')
    return response.json({ patient })
  }
  async doc_patient({ response }: HttpContext) {
    const details = await Patients.query().preload('doctor').select('doctor_id')
    return response.json({ details })
  }
  async age_details({ response, params }: HttpContext) {
    const patients = await Patients.query().where('age', params.id)
    return response.json({ patients })
  }
  // async status({ response, params }: HttpContext) {
  //   const appointment = await Appointment.query().where('id', params.id).first()
  //   if (!appointment) {
  //     return response.badRequest({ message: 'appointment is not there' })
  //   }
  //   const up: number = 0
  //   appointment.status_id =
  // }
}
