import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { PassportStatic } from 'passport';

import User from '@/models/userModel';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: process.env.JWT_EXPIRES_IN,
  },
};

export function setUpJwtStrategy(passport: PassportStatic) {
  passport.use(
    new JwtStrategy(options, function(payload, done) {
      User.findOne({ _id: payload.sub })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => done(err, false));
    })
  );
}
