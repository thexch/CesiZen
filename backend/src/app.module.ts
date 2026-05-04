import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { InformationsModule } from './informations/informations.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, AdminModule, InformationsModule],
})
export class AppModule {}

/*
  Résumé du fichier :
  - Sert à déclarer les modules principaux du backend.
  - Fonctionne comme le point central qui relie Prisma, Auth, Admin et Informations.
*/
