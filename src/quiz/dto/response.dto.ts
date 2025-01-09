import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ResponseDto{
    @IsString()
    @IsNotEmpty()
    text: string;
  
    @IsNotEmpty()
    isCorrect: boolean;
}