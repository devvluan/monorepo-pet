import router from '@adonisjs/core/services/router'

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
    router.post('/vendas', [SalesController, 'sales'])
    router.get('/historico/vendas', [SalesController, 'salesHistory'])
  })
  .prefix('dashboard')

router
  .group(() => {
    router.post('/scheduling', [SchedulingController, 'setScheduling'])
  })
  .prefix('api')
