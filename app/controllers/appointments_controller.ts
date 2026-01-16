import { HttpContext } from '@adonisjs/core/http'
import Appointment from '#models/appointment'
import { ValidatorCreate, ValidatorUpdate } from '#validators/appointment'

export default class AppointmentController {
  async show({ response }: HttpContext) {
    const appointments = await Appointment.all()
    return response.json({ appointments })
  }
  async store({ request, response }: HttpContext) {
    const appointment = await request.validateUsing(ValidatorCreate)

    if (appointment) {
      await Appointment.create({
        doctor_id: appointment.doctor_id,
        patient_id: appointment.patient_id,
        hospital_id: appointment.hospital_id,
        status_id: appointment.status_id,
      })
      return response.redirect('/appointment/show')
    }
    return response.badRequest({ messages: 'badrequest' })
  }

  async show_id({ response, params }: HttpContext) {
    const appointment = await Appointment.query().where('id', params.id).first()

    if (appointment) {
      return response.json({ appointment })
    }
    return response.badRequest({ message: `the appointment id ${params.id} is not valid` })
  }
  async edit({ request, response, params }: HttpContext) {
    const data = request.validateUsing(ValidatorUpdate)
    const appointment = await Appointment.query().where('id', params.id).first()
    if (appointment) {
      await Appointment.query().where('id', params.id).update(data)
      return response.redirect('appointment/show')
    }
    return response.badRequest({ messsage: ` the id ${params.id} is not in the list` })
  }
  async distroy({ response, params }: HttpContext) {
    const data = await Appointment.query().where('id', params.id).first()
    if (data) {
      await Appointment.query().where('id', params.id).delete()
      return response.redirect('appointment/show')
    }
    return response.badRequest({ message: `the appointment id ${params.id} is not in the list` })
  }
}
