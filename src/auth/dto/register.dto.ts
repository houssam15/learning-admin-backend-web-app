import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    username: string;
}
  