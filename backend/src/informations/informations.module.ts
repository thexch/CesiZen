import { Module } from '@nestjs/common';
import { InformationsController } from './informations.controller';

@Module({
  controllers: [InformationsController],
})
export class InformationsModule {}
