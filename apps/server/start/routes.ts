import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const SalesController = () => import('#controllers/sales_controller')
const SchedulingController = () => import('#controllers/schedulings_controller')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })
  .prefix('auth')

router
  .group(() => {
    router.post('/sales', [SalesController, 'sales'])
    router.get('/history/sales/:profileId', [SalesController, 'salesHistory'])
  })
  .prefix('dashboard')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .group(() => {
    router.post('/scheduling', [SchedulingController, 'setScheduling'])
  })
  .prefix('api')
