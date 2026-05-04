import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

/*
  Résumé du fichier :
  - Sert à rendre Prisma utilisable dans les autres modules NestJS.
  - Fonctionne en exportant PrismaService pour les contrôleurs et services.
*/
