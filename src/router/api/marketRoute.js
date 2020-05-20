import {
  Router
} from 'express'
import marketController from '../../controller/marketController'
import uploads from '../../middlewares/multer'
import passport from 'passport'
import '../../passport'

const router = Router()

router.route('/market/').get(marketController.fetchAllMarket).post(passport.authenticate('jwt', {
  session: false
}), uploads.array('images', 5), marketController.addMarket)

export default router
