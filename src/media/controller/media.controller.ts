import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors,Delete, ParseFilePipe, ParseFilePipeBuilder, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { MediaService } from '../service/media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Media } from '../entity/media.entity';
import { MediaDto } from '../dto/media.dto';
import { CustomUploadFileTypeValidator } from '../validator/file.validator';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Response } from 'express'; 
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('media')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.Admin)
export class MediaController {
    constructor(
      private readonly mediaService: MediaService,
      private readonly configService:ConfigService
      ) {}

      // Upload Media (Image/Video)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() mediaDto: MediaDto,
  ): Promise<Media> {
    // Validate file size and type dynamically
    const fileValidationPipe = new ParseFilePipeBuilder()
      .addValidator(
        new CustomUploadFileTypeValidator({
          fileType: this.configService.get<string[]>("media.validUploadsMimeType"),
        }),
      )
      .addMaxSizeValidator({ maxSize:this.configService.get<number>("media.maxFileSize")})
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY });
    await fileValidationPipe.transform(file);
    return await this.mediaService.uploadMedia(file, mediaDto.keyword);
  }

  // Get Media by ID
  @Get(':id')
  async getMediaDetails(@Param('id') id: number): Promise<Media> {
      return this.mediaService.getMediaById(id);
  }

  @Get('download/:id')
  @Roles(Role.User)
  async downloadMedia(@Param('id') id: number,@Res() res: Response){
      const {filePath,mimeType} = await this.mediaService.downloadMedia(id);
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${filePath.split('/').pop()}"`);
      fs.createReadStream(filePath).pipe(res);
  }

  // Delete Media
  @Delete(':id')
  async deleteMedia(@Param('id') id: number): Promise<void> {
    return this.mediaService.deleteMedia(id);
  }

  // Search Media by Keyword
  @Get('search')
  async searchMedia(@Body() mediaDto: MediaDto): Promise<Media[]> {
    return this.mediaService.searchMediaByKeyword(mediaDto.keyword);
  }

}
