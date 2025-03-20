import { Sales } from '#models/sales'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  public async sales({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user
      console.log(user)
      const { body } = request.all()

      if (!body.client) {
        return response.status(400).json({ error: "O campo 'client' é obrigatório." })
      }

      await Sales.create({ ...body, profileId: 1 })

      return response.status(200).json(body)
    } catch (error) {
      console.error(error)
      return response.status(400).json(error.message)
    }
  }

  public async salesHistory({ params, response }: HttpContext) {
    try {
      const { profileId } = params
      const sales = await Sales.findBy('profileId', profileId)

      return response.status(200).json({ sales })
    } catch (error) {
      console.error(error)
      return response.status(400).json(error.message)
    }
  }
}
