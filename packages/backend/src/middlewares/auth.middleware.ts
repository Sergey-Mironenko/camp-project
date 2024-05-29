import JwtStrategy from 'passport-jwt';
import passport from 'passport';

import { jwtOptions } from '../utils/jwtOptions';
import prisma from '@/utils/db';


export class AuthMiddlewares {
  constructor() {}

  public checkAuthorization = passport.authenticate( 'jwt', { session: false });

  public jwtStrategy = new JwtStrategy.Strategy(jwtOptions, (jwtPayload, done) => {
    const user = prisma.user.findUnique({
      where: {
        id: jwtPayload.sub,
      }
    });
  
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
};

const authMiddlewares = new AuthMiddlewares();
export default authMiddlewares;
