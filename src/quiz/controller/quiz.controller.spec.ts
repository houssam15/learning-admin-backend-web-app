import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuizService } from '../service/quiz.service';

describe('QuizController', () => {
  let controller: QuizController;
  let quizService: QuizService;


  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'database.host': 'localhost',
        'database.port': 3306,
        'database.username': 'root',
        'database.password': '',
        'database.name': 'driving_licence',
        'database.sync': true,
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const mockQuizService = {
      createQuiz:jest.fn()
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers:[
        {
          provide:QuizService,
          useValue:mockQuizService
        }
      ]
    }).compile();

    controller = module.get<QuizController>(QuizController);
    quizService = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
