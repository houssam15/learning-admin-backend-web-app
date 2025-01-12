import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: (origin,callback)=>{
      if(
        !origin 
        || app.get(ConfigService).get<string[]>("cors.allowedOrigins").includes(origin)
        || app.get(ConfigService).get<boolean>("cors.allowAllOrigins")
        ){
        callback(null,true)
      }else{
        callback(new Error("Not allowed by cors"))
      }
    },
  });
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
