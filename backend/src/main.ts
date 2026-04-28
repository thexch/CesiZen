import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // LA LIGNE MAGIQUE POUR AUTORISER LE FRONTEND VITE
  app.enableCors({
    origin: 'http://localhost:5173', // Adresse de ton frontend
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();