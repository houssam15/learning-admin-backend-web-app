import { IsIn, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class QuestionHelper {
    @IsIn(['text','image', 'video'])
    type: 'text' | 'image' | 'video';
    
    @IsUrl({})
    media: string;
}
