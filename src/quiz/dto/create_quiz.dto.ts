import { IsNotEmpty } from "class-validator";

export class CreateQuiz{
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}