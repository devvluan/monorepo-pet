import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const user = await db.from('users').where('email', request.input('email')).first()

    if (!user) {
      return response.status(401).json({
        message: 'Email ou senha inválidos',
      })
    }

    const passwordIsValid = await hash.verify(user.password, request.input('password'))

    if (!passwordIsValid) {
      return response.status(401).json({
        message: 'Email ou senha inválidos',
      })
    }

    return response.status(200).json({
      message: 'Login bem-sucedido',
    })
  }

  public async register({ request, response }: HttpContext) {
    const { fullName, email, password } = request.all()

    const hashedPassword = await hash.make(password)
    const timestamp = new Date()

    await db.table('users').insert({
      full_name: fullName,
      email,
      password: hashedPassword,
      created_at: timestamp,
    })

    return response.status(201).json({
      message: 'Usuário registrado com sucesso',
    })
  }
}
