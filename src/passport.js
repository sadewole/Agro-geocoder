import {
  Strategy as JWTStrategy,
  ExtractJwt
} from 'passport-jwt'
import {
  Strategy as LocalStrategy
} from 'passport-local'
import passport from 'passport'
import helper from './middlewares/helper'
import {
  User
} from './model'
import 'dotenv/config'


// init passport JWTStrategy
passport.use(
  'jwt',
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub)

                //  confirm user existence
                if (!user) return done(null, false)

                return done(null, user)
            } catch (error) {
      done(error, null, error.message)
            }
  }
  )
)



// init passport localStrategy
passport.use(
  'local',
  new LocalStrategy({
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      // confirm email
      email = email.toLowerCase().trim()
      const user = await helper.existEmail(email)
      // if not user
      if (!user) return done(null, false)



                // confirm password
                const comparePassword = await helper.comparePassword(
        password,
        user.password
      )


                // check validity && password
                if (!comparePassword) return done(null, false)

                return done(null, user)
            } catch (error) {
      return done(error, null, error.message)
            }
  }
  )
)
