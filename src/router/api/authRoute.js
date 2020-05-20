import {
  Router
} from 'express'
import helper from '../../middlewares/helper'
import authController from '../../controller/authController'
import passport from 'passport'
import '../../passport' // as strategy in ./passport.js needs passport object

// init Router
const router = Router()

router.route('/auth/signup').post(helper.validateBody(helper.schemas.authSchema), authController.signup)

router.route('/auth/signin').post(passport.authenticate('local', {
  session: false
}), helper.validateBody(helper.schemas.signSchema), authController.signin)

router.route('/auth/secret').get(passport.authenticate('jwt', {
  session: false
}), authController.secret)

export default router
