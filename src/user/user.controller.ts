import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UpdateUserRoleDto } from './dto/update_user_role.dto';

@Controller('user')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UserController {
    constructor(private userService:UserService){}

    @Put(":user_id/update_role")
    @Roles(Role.Admin)
    async updateUserRole(@Param("user_id") user_id:string,@Body() updateUserRoleDto:UpdateUserRoleDto){
        return await this.userService.updateUserRole(user_id,updateUserRoleDto.role);
    }
}
