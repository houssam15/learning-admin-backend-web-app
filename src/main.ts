import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //all modules protected from incorrect data
  app.useGlobalPipes(
    new ValidationPipe({
        forbidNonWhitelisted: true, // This will reject extra properties
        whitelist: true, // Only properties defined in DTOs are allowed
        transform: true, // Automatically transform plain objects to class instances
    }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
