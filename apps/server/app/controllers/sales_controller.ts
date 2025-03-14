import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class SalesController {
  public async sales({ request, response }: HttpContext) {
    try {
      const { body } = request.all()
      console.log(body)

      if (!body.client) {
        return response.status(400).json({ error: "O campo 'client' é obrigatório." })
      }

      await db.table('sales').insert({
        ...body,
        created_at: DateTime.local().setZone('America/Sao_Paulo').toFormat('yyyy-MM-dd HH:mm:ss'),
      })

      return response.status(200).json(body)
    } catch (error) {
      console.error(error)
      return response.status(400).json(error.message)
    }
  }

  public async salesHistory({ response }: HttpContext) {
    try {
      const data = await db
        .from('sales')
        .select('client', 'product', 'quantity', 'price', 'form_payment', 'created_at')

      return response.status(200).json(data)
    } catch (error) {
      console.error(error)
      return response.status(400).json(error.message)
    }
  }
}
