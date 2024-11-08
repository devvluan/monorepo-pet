import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SchedulingsController {
  public async setScheduling({ request, response }: HttpContext) {
    try {
      const data = request.all()

      return response.status(200).json(data)
    } catch {
      throw new Error('Method not implemented.')
    }
  }
}
