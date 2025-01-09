import { Module } from '@nestjs/common';
import { MediaService } from './service/media.service';
import { MediaController } from './controller/media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entity/media.entity';


@Module({
  imports:[
        TypeOrmModule.forFeature([Media]),
  ],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
