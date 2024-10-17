import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { password } = request.all()

    // Busca o usuário no banco de dados
    const user = await db.from('users').where('email', request.input('email')).first()

    if (!user) {
      return response.status(401).json({
        message: 'Email ou senha inválidos',
      })
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.status(401).json({
        message: 'Senha inválida',
      })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'seu-segredo-jwt')

    return response.status(200).json({
      jwt: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
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

  public async returnDashboard({ auth, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.status(401).json({
          message: 'Usuário não autenticado',
        })
      }

      return response.status(200).json({
        id: user.id,
        email: user.email,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao buscar informações do dashboard',
        error: error.message,
      })
    }
  }
}
