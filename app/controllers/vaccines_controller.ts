import type { HttpContext } from '@adonisjs/core/http'
import Vaccines from '#models/vaccine'
import { VaccineServices } from '#services/vaccine_service'

import { VaccineValidatorCreate, VaccineValidatorUpdate } from '#validators/vaccine'

export default class VaccinesController {
  constructor(private vaccineServices: VaccineServices) {}

  async show({ response }: HttpContext) {
    try {
      const vaccine = await Vaccines.all()
      return response.status(200).json({ vaccine })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(VaccineValidatorCreate)

      await this.vaccineServices.createVaccine(data)

      return response.status(201).json({ message: 'vaccine created' })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async show_id({ response, params }: HttpContext) {
    try {
      const vaccine = await this.vaccineServices.vaccinebyid(params.id)
      if (vaccine) {
        return response.status(200).json({ vaccine })
      }
      return response.status(404).badRequest({ message: `the id ${params.id} is not valid` })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  public async edit({ request, response, params }: HttpContext) {
    try {
      const data = request.validateUsing(VaccineValidatorUpdate)
      const vaccine = await this.vaccineServices.updatebyid(params.id, data)
      return response.status(200).json({ message: ' vaccine is updated', vaccine })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const data = await Vaccines.query().where('id', params.id).delete()
      if (data) {
        await Vaccines.query().where('id', params.id).delete()
        return response.status(200).json({ message: 'Vaccine is deleted' })
      }
      return response
        .status(404)
        .badRequest({ message: `the patient id ${params.id} is not in the list` })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }
}
