import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  

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
    const mockUserService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports:[
        JwtModule.register({
          secret: 'your_secret_key',
          signOptions: { expiresIn: '1h' },
        }),
        UserModule,
        TypeOrmModule.forRoot({
          type:"mysql", 
          host: mockConfigService.get("database.host"), 
          port: mockConfigService.get("database.port"), 
          username: mockConfigService.get("database.username"), 
          password: mockConfigService.get("database.password"), 
          database:  mockConfigService.get("database.name"), 
          synchronize: mockConfigService.get("database.sync"),
          entities: [User]        
        })
      ],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
