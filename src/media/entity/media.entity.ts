// src/media/media.model.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  mimeType: string;

  @Column({ nullable: true })
  keyword: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
