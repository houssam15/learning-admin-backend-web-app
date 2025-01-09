import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ResponseDto } from "./response.dto";
import { QuestionHelper } from "./question_helper.dto";

export class CreateQuestionDto{
    @IsString()
    @IsNotEmpty()
    questionText: string;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => QuestionHelper)
    questionHelper: QuestionHelper;
    
    
    @IsOptional()
    @IsBoolean()
    isMultiple:boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ResponseDto)
    responses: ResponseDto[];
}