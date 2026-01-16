import type { HttpContext } from '@adonisjs/core/http'
import Patients from '#models/patient'
import Doctors from '#models/doctor'
import Hospitals from '#models/hospital'
import Appointment from '#models/appointment'

export default class TasksController {
  async vaccinated({ response }: HttpContext) {
    // const patient = await Patients.query().join(Appointment, (query) => {
    //   query.where('status_id', 1)
    // })
    return response.json({})
  }
}

