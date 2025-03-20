import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
// import jwt from 'jsonwebtoken'
import User from '#models/user'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    try {
      const { password, email } = request.all()

      const user = await User.findBy('email', email)
      if (!user) {
        return response.status(401).json({
          message: 'Invalid user credentials',
        })
      }
      const isPasswordValid = await hash.verify(user.password, password)

      if (!isPasswordValid) {
        return response.status(401).json({
          message: 'Invalid user credentials',
          field: 'password',
        })
      }

      const token = await User.accessTokens.create(user, ['*'], {
        name: 'dashboard_login',
      })

      return response.status(200).json({
        type: 'bearer',
        token: token.value!.release(),
        refreshToken: null,
        user: user.toJSON(),
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
