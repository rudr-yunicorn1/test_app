import { HttpContext } from '@adonisjs/core/http'
import Patients from '#models/patient'
import { PatientValidatorCreate, PatientValidatorUpdate } from '#validators/patient'
import Patient from '#models/patient'

export default class PatientsController {
  async show({ response }: HttpContext) {
    const patient = await Patients.all()
    return response.json({ patient })
  }
  async store({ request, response }: HttpContext) {
    const user = await request.validateUsing(PatientValidatorCreate)

    // const patient = await Patients.query()
    //   .where('phone_number', user.phone_number)
    //   .where('patient_name', user.patient_name)
    //   .first()

    if (user) {
      await Patients.create({
        patient_name: user.patient_name,
        father_name: user.father_name,
        age: user.age,
        doctor_id: user.doctor_id,
        vaccine_name: user.vaccine_name,
        phone_number: user.phone_number,
      })
      return response.redirect('/patient/show')
    }
    return response.badRequest({ messages: 'badrequest' })
  }
  async show_id({ response, params }: HttpContext) {
    const patient = await Patients.query().where('patient_id', params.id).first()

    if (patient) {
      return response.json({ patient })
    }
    return response.badRequest({ message: `the id ${params.id} is not valid` })
  }
  async edit({ request, response, params }: HttpContext) {
    const user = request.validateUsing(PatientValidatorUpdate)
    const patient = await Patients.query().where('patient_id', params.id).first()
    if (patient) {
      return response.badRequest({ messsage: ` the id ${params.id} is not in the list` })
    }
    // const patient = await Patients.query().where('patient_id', params.id).update(user)
    if (user) {
      await Patients.query().where('patient_id', params.id).update(user)
      return response.redirect('patient/show')
    }
  }
  async distroy({ response, params }: HttpContext) {
    const patient = await Patient.query().where('patient_id', params.id).delete()
    if (!patient) {
      return response.json({ message: 'patient is deleted' })
    }
    return response.badRequest({ message: `the patient id ${params.id} is not in the list` })
  }
}
