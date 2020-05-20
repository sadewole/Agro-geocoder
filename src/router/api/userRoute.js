import {
  Router
} from 'express'
import userController from '../../controller/userController'
import passport from 'passport'
import '../../passport' // as strategy in ./passport.js needs passport object

// init Router
const router = Router()

router.route('/user/').get(passport.authenticate('jwt', {
  session: false
}), userController.getAllUser)

router.route('/user/:id')
  .get(passport.authenticate('jwt', {
    session: false
  }), userController.getSingleUser)
  .delete(passport.authenticate('jwt', {
    session: false
  }), userController.deleteUser)

export default router
