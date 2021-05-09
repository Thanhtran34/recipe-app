/**
 * Module for using passport to check user input.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */
import { User } from '../models/user.js'
import passportJWT from 'passport-jwt'

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET

/**
 * Passport configuration.
 *
 * @param {*} passport - the passport configuration.
 */
export function config (passport) {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
