  import { Test, TestingModule } from '@nestjs/testing';
  import { AuthController } from './auth.controller';
  import { AuthService } from '../service/auth.service';
  import { RegisterDto } from '../dto/register.dto';
  import { User } from '../../user/user.entity';
  import { UserService } from '../../user/user.service';
  import { LoginDto } from '../dto/login.dto';
  import { ConflictException, UnauthorizedException } from '@nestjs/common';
  import { PassportModule } from '@nestjs/passport';
  import { JwtModule } from '@nestjs/jwt';
  import { UserModule } from '../../user/user.module';
  import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/enums/role.enum';

  describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let userService: UserService;
    
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

      const mockAuthService = {
        register: jest.fn(),
        login: jest.fn(),
      };
     
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          PassportModule,
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
        controllers: [AuthController],
        providers: [
          {
            provide: AuthService,
            useValue: mockAuthService,
          },
          {
            provide: UserService,  // Mock UserService
            useValue: mockUserService,
          },
          {
            provide: ConfigService,
            useValue: mockConfigService,
          },
  
        ],
      }).compile();


      authController = module.get<AuthController>(AuthController);
      authService = module.get<AuthService>(AuthService);
      userService = module.get<UserService>(UserService);

    });
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });
    describe('register', () => {
      it('should call authService.register with the correct parameters', async () => {
        const registerDto = {
          email: 'test2@test.com',
          password: 'password',
          name: 'test',
          role: Role.User
        };
        jest.spyOn(authService, 'register').mockResolvedValue({
          id: 3,
          email: 'test2@test.com',
          name: 'test',
          role: Role.User
        });
        const result = await authController.register(registerDto);
        expect(result).toMatchObject({
          email: 'test2@test.com',
          password: expect.any(String),
          name: 'test',
          role: 'student',
          id: expect.any(Number)
        });
        expect(authService.register).toHaveBeenCalledWith(registerDto);
      });
      it('should throw error if user creation fails', async () => {
          const registerDto = {
            email: 'test@test.com',
            password: 'password',
            name: 'test',
            role: Role.User
          };
          jest.spyOn(authService, 'register').mockRejectedValue(
            new ConflictException('User already exists with this email')
          );
          await expect(authController.register(registerDto)).rejects.toThrow(
            'User already exists with this email'
          );
      });
    });
    describe('login', () => {
      it('should call authService.login with the correct parameters and return a token', async () => {
        const loginDto: LoginDto = { email: 'testuser@gmail.com', password: 'testpassword' };
        const mockUser: User = {
          email: 'testuser@gmail.com', name: 'test', role: Role.User, id: 1,
          password: ''
        };
        const mockAccessToken = { accessToken: 'mocked-jwt-token' };
        jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
        jest.spyOn(authService, 'login').mockResolvedValue(mockAccessToken);
        const result = await authController.login(loginDto);
        expect(result).toEqual(mockAccessToken);  // Verifies the returned token
        expect(authService.login).toHaveBeenCalledWith(loginDto);  // Ensures the login method was called with the correct parameters
        
      })
      it('should throw an error if credentials are invalid', async () => {
        const loginDto: LoginDto = { email: 'testuser@gmail.com', password: 'wrongpassword' };
        jest.spyOn(userService, 'findByEmail').mockResolvedValue({ email: 'testuser@gmail.com', password: 'hashedPassword' } as User);
        jest.spyOn(authService, 'login').mockRejectedValue(new UnauthorizedException('Invalid credentials'));
        await expect(authController.login(loginDto)).rejects.toThrow(UnauthorizedException);
      });
    })
  });
