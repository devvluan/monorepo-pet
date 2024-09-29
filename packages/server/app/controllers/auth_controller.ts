import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    if (email === 'admin@admin.com' && password === 'admin1234') {
      return response.status(200).json({
        token: 'admin',
      })
    } else {
      return response.status(401).json({
        message: 'Unauthorized',
      })
    }
  }
}
