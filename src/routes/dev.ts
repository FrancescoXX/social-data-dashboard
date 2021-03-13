import controller from '../controllers/dev'
import Router from 'express'

const router = Router.Router()

router.get('/config', controller.getConfig)
router.get('/version', controller.getVersion)
router.get('/seq', controller.seq) // test sequelize connection

module.exports = router;
