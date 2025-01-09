import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../service/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
    ) {
    super({
      jwtFromRequest: (req:any) => {
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req) || req?.query?.[this.configService.get<string>('jwt.queryAccessTokenKey')];
      },
      ignoreExpiration: false, // Don't ignore token expiration
      secretOrKey: configService.get<string>('jwt.secret'), // Same secret used to sign the token
    });
  }

  async validate(payload: any) {
    return this.authService.validateUser(payload); // Return the user based on JWT payload
  }
}
