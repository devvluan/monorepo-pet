import router from '@adonisjs/core/services/router'
const { default: AuthController } = await import('#controllers/auth_controller')

router.post('/auth/login', [AuthController, 'login'])
router.post('/auth/register', [AuthController, 'register'])
