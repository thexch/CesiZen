import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
})
export class AdminModule {}

/*
  Résumé du fichier :
  - Sert à organiser la partie administration.
  - Fonctionne en reliant AdminController aux services nécessaires.
*/
