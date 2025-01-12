import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

      async create(registerDto: RegisterDto){
        const { email, password, username } = registerDto;
        const existingUser = await this.userRepository.findOne({ where: { email:registerDto.email } });
        if (existingUser) {
          throw new ConflictException('User already exists with this email');
        }
        const user = await this.userRepository.save(
          this.userRepository.create({
            email,
            password,
            username,
            role: Role.User
          })
        );
        return {id:user.id,email:user.email,username:user.username,role:user.role};
      }   
      
      async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email },select: ['id', 'email', 'username', 'password', 'role']});
      }

      async findByEmailOrUsername(emailOrUsername:string):Promise<User | undefined>{
        return await this.userRepository.findOne({where: [
          {email:emailOrUsername},
          {username:emailOrUsername}
        ], select: ['id', 'email', 'username', 'password', 'role']});
      }

      async findById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { id } });
      }

      async updateUserRole(user_id: string, role: Role){
        const id = parseInt(user_id, 10);
        if (isNaN(id)) {
          throw new BadRequestException(`Invalid user ID: ${user_id}`);
        }
        const result = await this.userRepository.update({ id: id }, { role: role });
        if (result.affected === 0) {
          throw new NotFoundException(`User with ID ${user_id} not found`);
        }
        
        return "User updated successfully";
      }

}
