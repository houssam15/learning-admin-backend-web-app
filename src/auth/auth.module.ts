import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        secret: configService.get<string>("jwt.secret"),
        signOptions: { expiresIn: configService.get<string>("jwt.expiresIn") }
      })
    }),
    UserModule
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})

export class AuthModule {}
