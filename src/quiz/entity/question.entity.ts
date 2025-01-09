import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { Response } from "./response.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quiz;

  @Column()
  questionText: string;

  @Column({ nullable: true })
  helperType:'text' | 'image' | 'video';

  @Column({default:false})
  isMultiple:boolean;
    
  @Column({ nullable: true })
  helperMedia:string

  @OneToMany(() => Response, (response) => response.question, { cascade: true })
  responses: Response[];
}
