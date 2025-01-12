import { Role } from 'src/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column({select:false})
    password: string;
  
    @Column({ unique: true })
    username: string;
  
    @Column({ default: Role.User }) 
    role: Role;
}