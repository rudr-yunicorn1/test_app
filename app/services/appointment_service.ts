import Appointment from '#models/appointment'

export class AppointmentService {
  async updatebyid(
    id: number,
    data: {
      doctor_id: number
      patient_id: number
      hospital_id: number
      status_id: boolean
    }
  ) {
    const appointment = await Appointment.find(id)
    appointment?.merge(data)
    await appointment?.save()
    return appointment
  }
  async createAppointment(data: {
    doctor_id: number
    patient_id: number
    hospital_id: number
    status_id: boolean
  }) {
    const appointment = await Appointment.create(data)
    return appointment
  }

  async appointmentbyid(id: number) {
    const appointment = await Appointment.find(id)
    return appointment
  }
}
