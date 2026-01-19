import { HttpContext } from '@adonisjs/core/http'
import Patients from '#models/patient'
import { PatientValidatorCreate, PatientValidatorUpdate } from '#validators/patient'
import { PatientService } from '#services/patient_service'
import ExcelJS from 'exceljs'
import { inject } from '@adonisjs/core'

@inject()
export default class PatientsController {
  constructor(private patientServices: PatientService) {}

  private styleExcelHeader(worksheet: ExcelJS.Worksheet) {
    const headerRow = worksheet.getRow(1)
    headerRow.height = 25
  }

  async show({ response }: HttpContext) {
    try {
      const patient = await Patients.all()
      return response.status(200).json({ patient })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(PatientValidatorCreate)

      await this.patientServices.createPatient(data)

      return response.status(201).json({ message: 'patient created' })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async show_id({ response, params }: HttpContext) {
    try {
      const patient = await this.patientServices.patientbyid(params.id)
      if (patient) {
        return response.status(200).json({ patient })
      }
      return response.status(404).badRequest({ message: `the id ${params.id} is not valid` })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  public async edit({ request, response, params }: HttpContext) {
    try {
      const user = request.validateUsing(PatientValidatorUpdate)
      const patient = await this.patientServices.updatebyid(params.id, user)
      return response.status(200).json({ message: 'patient is updated', patient })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const data = await Patients.query().where('id', params.id).delete()
      if (data) {
        await Patients.query().where('id', params.id).delete()
        return response.status(200).json({ message: 'Patient deleted' })
      }
      return response
        .status(404)
        .badRequest({ message: `the patient id ${params.id} is not in the list` })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async export({ response }: HttpContext) {
    try {
      const patients = await Patients.all()

      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Patients')

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Father_name', key: 'father_name', width: 30 },
        { header: 'Age', key: 'age', width: 10 },
        { header: 'Doctor', key: 'doctor_id', width: 25 },
        { header: 'Vaccine', key: 'vaccine_name', width: 40 },
        { header: 'Mobile', key: 'phone_number', width: 15 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ]

      patients.forEach((patient) => {
        worksheet.addRow({
          id: patient.id,
          name: patient.patient_name,
          father_name: patient.father_name,
          age: patient.age,
          doctor_id: patient.doctor_id,
          vaccine_name: patient.vaccine_name,
          phone_number: patient.phone_number,
          createdAt: patient.createdAt?.toFormat('yyyy-MM-dd HH:mm:ss') || '',
          updatedAt: patient.updatedAt?.toFormat('yyyy-MM-dd HH:mm:ss') || '',
        })
      })

      worksheet.getRow(1).font = { bold: true }
      this.styleExcelHeader(worksheet)

      const buffer = await workbook.xlsx.writeBuffer()

      response.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      response.header('Content-Disposition', 'attachment; filename=patients.xlsx')
      return response.status(200).send(buffer)
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}
