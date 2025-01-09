import { IsEnum } from "class-validator";
import { Role } from "src/enums/role.enum";

export class UpdateUserRoleDto {
    @IsEnum(Role)
    role: Role;
}