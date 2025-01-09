import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;

  const mockQuizRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide:"QuizRepository",
          useValue:mockQuizRepository
        }
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
