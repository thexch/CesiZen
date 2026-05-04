import { Module } from '@nestjs/common';
import { InformationsController } from './informations.controller';

@Module({
  controllers: [InformationsController],
})
export class InformationsModule {}

/*
  Résumé du fichier :
  - Sert à organiser la partie informations publiques.
  - Fonctionne en déclarant le contrôleur qui expose les articles.
*/
