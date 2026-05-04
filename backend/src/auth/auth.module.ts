import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_SECRET ?? 'cesizen-secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

/*
  Résumé du fichier :
  - Sert à organiser la partie authentification.
  - Fonctionne en déclarant AuthController et AuthService dans un module NestJS.
*/
