    import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt';
    import { UserService } from '../../user/user.service';
    import { RegisterDto } from '../dto/register.dto';
    import { LoginDto } from '../dto/login.dto';
    import * as bcrypt from 'bcrypt';
    import { Role } from 'src/enums/role.enum';

    @Injectable()
    export class AuthService {

        constructor(
            private userService: UserService,
            private jwtService: JwtService,
        ){}

        // Registration: Hash the password and create a new user
        async register(registerDto: RegisterDto) {
            return await this.userService.create({
                email:registerDto.email,
                password: await bcrypt.hash(registerDto.password, 10),
                name:registerDto.name
            });
        }

        // Login: Check if user exists, validate password, and issue a token
        async login(loginDto: LoginDto) {
            // Find user by email
            const user = await this.userService.findByEmail(loginDto.email)
            if (!user) {
                throw new NotFoundException('User not found');
            }
            // Compare passwords
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }
            // Generate and return JWT token
            const accessToken = this.jwtService.sign({ email: user.email, sub: user.id,role: user.role}); // Issue a JWT token
            return { accessToken };
        }

    // Validate the user based on the JWT payload (used in Passport strategy)
    async validateUser(payload: any) {
            return { id: payload.sub, email: payload.email ,role:payload.role};
    }
    
    }
