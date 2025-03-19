import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import User from '#models/user'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    try {
      const { password, email } = request.all()

      const user = await User.findBy('email', email)
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

      const token = jwt.sign({ id: user.id, email: user.email }, 'token-jwt')

      return response.status(200).json({
        token,
      })
    } catch (error) {
      throw error
    }
  }

  public async register({ request, response }: HttpContext) {
    try {
      const { fullName, email, password } = request.all()
      const user = await User.create({
        fullName,
        email,
        password,
      })
      await user.related('profile').create({})

      return response.status(201).json({ message: 'Usuário criado com sucesso' })
    } catch (error) {
      throw error
    }
  }
}
