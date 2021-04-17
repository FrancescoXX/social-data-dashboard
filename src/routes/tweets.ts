import controller from '../controllers/tweets'
import Router from 'express'

const router = Router.Router()

// CRUD Model-Agnostic.
// Keep them at the end of the route file for url parsing requests
router
  .get('/:username', controller.getAll)
  // .get('/:id', controller.getOne)
  .post('/', controller.createOne)
  // .put('/:id', controller.updateOne)
  // .delete('/:id', controller.deleteOne)

module.exports = router;
