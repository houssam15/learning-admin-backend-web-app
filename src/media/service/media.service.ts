import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { Media } from '../entity/media.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {

    constructor(
        @InjectRepository(Media) private mediaRepository: Repository<Media>, 
        private readonly configService:ConfigService
      ) {}

    async uploadMedia(file: Express.Multer.File, keyword: string): Promise<Media> {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(
          this.getUploadDirectory(),
          fileName
        );
        // Save the file locally
        fs.writeFileSync(filePath, file.buffer);
        // Save media metadata to the database
        return await this.mediaRepository.save(
            this.mediaRepository.create({
                fileName: fileName,
                keyword: keyword,
                mimeType:file.mimetype
              })
        );
    }

    async getMediaById(id: number): Promise<Media> {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (!media) {
          throw new NotFoundException('Media not found');
        }
        return media;
    }

    async deleteMedia(id: number): Promise<void> {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (!media) {
          throw new NotFoundException('Media not found');
        }
        // Delete the file from the local server
        const filePath = path.join(this.getUploadDirectory(), media.fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the file
        }
        // Remove the media metadata from the database
        await this.mediaRepository.remove(media);
    }

    async searchMediaByKeyword(keyword: string): Promise<Media[]> {
        return this.mediaRepository.find({ where: { keyword } });
    }

    async downloadMedia(id: number){
      const media:Media= await this.getMediaById(id);
      const filePath = path.join(this.getUploadDirectory(),media.fileName); 
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
         throw new NotFoundException('File not found');
      } 
      return { filePath : filePath, mimeType:media.mimeType }
    }

    private getUploadDirectory(){
      const d = path.join(process.cwd(), this.configService.get<string>("media.uploadDirectory"));
      //make the upload direction if not exist
      if (!fs.existsSync(d)) {
        fs.mkdirSync(d, { recursive: true });
      }
      return d;
    }

}
