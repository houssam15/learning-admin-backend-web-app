import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { SessionModule } from './session/session.module';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { User } from './user/user.entity'; // User entity for TypeORM
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { Quiz } from './quiz/entity/quiz.entity';
import { Question } from './quiz/entity/question.entity';
import { Response } from './quiz/entity/response.entity';
import { MediaModule } from './media/media.module';
import { Media } from './media/entity/media.entity';

@Module({
  imports: [
        AuthModule,
        UserModule,
        QuizModule,
        SessionModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal:true
        }),
        TypeOrmModule.forRootAsync({
          imports:[ConfigModule],
          inject:[ConfigService],
          useFactory:(configService:ConfigService)=>({
            type:"mysql", 
            host: configService.get<string>("database.host"), 
            port: configService.get<number>("database.port"), 
            username: configService.get<string>("database.username"), 
            password: configService.get<string>("database.password"), 
            database:  configService.get<string>("database.name"), 
            synchronize: configService.get<boolean>("database.sync"),
            logging:configService.get<boolean>("database.logging"),
            entities: [User,Quiz,Question,Response,Media]    
          })
        }),
        MediaModule
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
