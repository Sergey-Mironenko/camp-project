import ExtractJwt from 'passport-jwt';

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};
