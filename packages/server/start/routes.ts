import router from '@adonisjs/core/services/router'
const { default: AuthController } = await import('../app/controllers/auth_controller.js')

router.post('/login', new AuthController().login)

export default router
