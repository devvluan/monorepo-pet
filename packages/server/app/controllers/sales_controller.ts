import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class SalesController {
  public async sales({ request, response }: HttpContext) {
    const data = request.all()
    const timestamp = await DateTime.local()
      .setZone('America/Sao_Paulo')
      .toSQL({ includeOffset: false })

    await db.table('sales').insert({ ...data, created_at: timestamp })

    return response.status(200).json(data)
  }

  public async salesHistory({ response }: HttpContext) {
    const data = await db.from('sales').select('client', 'product', 'amount', 'price', 'created_at')

    console.log('informações enviadas: ', data)

    return response.status(200).json(data)
  }
}
