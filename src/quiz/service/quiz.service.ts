import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuiz } from '../dto/create_quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from '../entity/quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create_question.dto';
import { Question } from '../entity/question.entity';

@Injectable()
export class QuizService {

    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>
    ){}
                    
    async createQuiz(createQuiz:CreateQuiz){  
        if(await this.quizRepository.findOne({where:{title:createQuiz.title}}) != null) {
            throw new ConflictException('Quiz already exist !');
        }
        return await this.quizRepository.save(
            this.quizRepository.create({title:createQuiz.title,description:createQuiz.description})
        );
    }

    async addQuestionToQuiz(quizId: string, createQuestionDto: CreateQuestionDto) {
        const quiz = await this.quizRepository.findOne({where:{id:quizId}});
        if (!quiz) {
          throw new NotFoundException(`Quiz with ID ${quizId} not found`);
        }
        const already_exist = await this.questionRepository.findOne({where:{questionText:createQuestionDto.questionText,quiz: { id: quiz.id }}});
        if(already_exist != null ){
          throw new ConflictException("Question already exist");  
        }
        const at_least_on_choise_correct = createQuestionDto.responses.find(elm=>elm.isCorrect==true);
        if(createQuestionDto.isMultiple == false && !at_least_on_choise_correct){
            throw new BadRequestException('At least one choice should be correct when isMultiple is false');
        }
        const question = this.questionRepository.create({
            questionText:createQuestionDto.questionText,
            responses:createQuestionDto.responses,
            helperType:createQuestionDto.questionHelper?.type,
            helperMedia:createQuestionDto.questionHelper?.media,
            isMultiple:createQuestionDto.isMultiple,
            quiz
        });
        return await this.questionRepository.save(question);
    }

    async getAllQuizzes(){
        return await this.quizRepository.find();
    }

    async getQuizQuestions(quizId: string){
        const quiz = await this.quizRepository.findOne({where:{id:quizId}});
        if (!quiz) throw new NotFoundException(`Quiz with ID ${quizId} not found`);
        return await this.questionRepository.find({where:{quiz:{id:quiz.id}},relations:['responses']});  
    }

    async deleteQuiz(quizId: string){
        const quiz = await this.quizRepository.findOne({where:{id:quizId}});
        if(!quiz) throw new NotFoundException(`Quiz with ID ${quizId} not found`);
        return await this.quizRepository.delete({id:quiz.id});
    }
    
}
