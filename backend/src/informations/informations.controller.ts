import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('informations')
export class InformationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.information.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

/*
  Résumé du fichier :
  - Sert à fournir les informations publiques au frontend.
  - Fonctionne en récupérant les articles en base avec Prisma, du plus récent au plus ancien.
*/
