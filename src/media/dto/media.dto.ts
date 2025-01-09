import { IsString, IsOptional } from 'class-validator';

export class MediaDto {
  @IsString()
  @IsOptional()
  keyword: string;
}