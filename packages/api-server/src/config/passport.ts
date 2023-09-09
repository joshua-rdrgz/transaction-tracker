import { Request } from 'express';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { PassportStatic } from 'passport';

import User from '@/models/userModel';

const extractTokenFromCookie = function(req: Request) {
  let token: string | null = null;
  if (req && req.cookies) {
    token = req.cookies['jwtToken'];
  }
  return token;
};

const options: StrategyOptions = {
  jwtFromRequest: extractTokenFromCookie,
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
