import { Module } from '@nestjs/common';
import { QuizService } from './service/quiz.service';
import { QuizController } from './controller/quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entity/quiz.entity';
import { Question } from './entity/question.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Quiz,Question]),
  ],
  providers: [QuizService],
  controllers: [QuizController]
})

export class QuizModule {}