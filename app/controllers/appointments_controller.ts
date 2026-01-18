import { HttpContext } from '@adonisjs/core/http'
import Appointment from '#models/appointment'
import { ValidatorCreate, ValidatorUpdate } from '#validators/appointment'
import { AppointmentService } from '#services/appointment_service'
import { PassThrough } from 'node:stream'
import PDFDocument from 'pdfkit'

export default class AppointmentController {
  constructor(private appointmentServices: AppointmentService) {}

  async show({ response }: HttpContext) {
    try {
      const appointments = await Appointment.all()
      return response.status(200).json({ appointments })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const appointment = await request.validateUsing(ValidatorCreate)
      const appointmento = await this.appointmentServices.createAppointment(appointment)

      return response.status(201).json({ message: 'the appointment is created', appointmento })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async show_id({ response, params }: HttpContext) {
    try {
      const appointment = await this.appointmentServices.appointmentbyid(params.id)
      if (appointment) {
        return response.status(200).json({ appointment })
      }
      return response
        .status(404)
        .badRequest({ message: `the appointment id ${params.id} is not valid` })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async edit({ request, response, params }: HttpContext) {
    try {
      const data = request.validateUsing(ValidatorUpdate)
      const appointment = await this.appointmentServices.updatebyid(params.id, data)
      if (appointment) {
        return response.status(200).json({ appointment })
      }
      return response
        .status(404)
        .badRequest({ messsage: ` the id ${params.id} is not in the list` })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const data = await Appointment.query().where('id', params.id).first()
      if (data) {
        await Appointment.query().where('id', params.id).delete()
        return response.status(200).json({ message: 'appointment deleted' })
      }
      return response
        .status(404)
        .badRequest({ message: `the appointment id ${params.id} is not in the list` })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async pdfdownload({ response }: HttpContext) {
    try {
      const appointments = await Appointment.all()
      // now creating the pdf file
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
      })
      const stream = new PassThrough()
      doc.pipe(stream)

      doc.fontSize(12)

      appointments.forEach((appointment, index) => {
        doc
          .text(`Appointment #${index + 1}`)
          .text(`Doctor ID: ${appointment.doctor_id}`)
          .text(`Patient ID: ${appointment.patient_id}`)
          .text(`Hospital ID: ${appointment.hospital_id}`)
          .text(`Status ID: ${appointment.status_id}`)
          .moveDown()
      })
      doc.end()

      response.header(`Content-Type`, 'application/pdf')
      response.header('content-Disposition', 'attachment; filename= "appointment.pdf"')
      return response.status(200).stream(stream)
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}
