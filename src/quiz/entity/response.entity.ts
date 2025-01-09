import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, (question) => question.responses, { onDelete: 'CASCADE' })
  question: Question;

  @Column()
  text: string;

  @Column({ default: false,select:false })
  isCorrect: boolean;
}
