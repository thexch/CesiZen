import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}

/*
  Résumé du fichier :
  - Sert à communiquer avec la base de données PostgreSQL.
  - Fonctionne avec PrismaClient et l'adaptateur PostgreSQL configuré par DATABASE_URL.
*/
