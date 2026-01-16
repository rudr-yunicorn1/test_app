import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    return response
  }
}
