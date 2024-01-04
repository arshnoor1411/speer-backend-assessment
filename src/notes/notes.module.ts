import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ShareNote } from './entities/share-note.entity';
import { SearchService } from 'src/search/search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note, ShareNote])],
  controllers: [NotesController],
  providers: [NotesService, JwtService, SearchService],
})
export class NotesModule {}
