import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuizService } from '../service/quiz.service';
import { CreateQuiz } from '../dto/create_quiz.dto';
import { CreateQuestionDto } from '../dto/create_question.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('quiz')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.Admin)
export class QuizController {
    constructor(private readonly quizService: QuizService) {}
    //Create a new quiz
    @Post()
    async createQuiz(@Body() createQuiz:CreateQuiz) {
        return await this.quizService.createQuiz(createQuiz);
    }
    //Add Question to Quiz
    @Post(":quizId/questions")
    async addQuestionToQuiz(@Param('quizId') quizId: string,@Body() createQuestionDto: CreateQuestionDto,){
        return await this.quizService.addQuestionToQuiz(quizId, createQuestionDto);
    }
    //Get All Quizzes
    @Get()
    async getAllQuizzes(){
        return await this.quizService.getAllQuizzes();
    }
    //Get Quiz with Questions
    @Get(":quizId")
    async getQuizQuestions(@Param('quizId') quizId: string){
        return await this.quizService.getQuizQuestions(quizId);
    }
    //Delete a Quiz
    @Delete(":quizId")
    async deleteQuiz(@Param('quizId') quizId: string){
        return await this.quizService.deleteQuiz(quizId);
    }
}
