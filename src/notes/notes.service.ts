import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { ShareNote } from './entities/share-note.entity';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(ShareNote)
    private shareNoteRepository: Repository<ShareNote>,
    private readonly searchService: SearchService,
  ) {}
  async create(createNoteDto: CreateNoteDto, userId: string) {
    const note = await this.noteRepository.save({
      ...createNoteDto,
      createdBy: userId,
    });

    await this.searchService.indexDocuments('QA_POST', [note]);

    return 'Note created successfully';
  }

  findAll(id: string) {
    return this.noteRepository.find({
      where: {
        createdBy: id,
      },
    });
  }

  findOne(id: string) {
    return this.noteRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneById(id: string, userId: string) {
    return this.noteRepository.findOne({
      where: {
        id,
        createdBy: userId,
      },
    });
  }

  async update(noteId: string, updateNoteDto: UpdateNoteDto) {
    return await this.noteRepository.save({ ...updateNoteDto, id: noteId });
  }

  async remove(noteId: string, userId: string) {
    return this.noteRepository.delete({
      id: noteId,
      createdBy: userId,
    });
  }

  async shareNotes(noteId: string, ownerId: string, sharedId: string) {
    await this.shareNoteRepository.save({
      noteId,
      ownerId,
      sharedId,
    });

    return 'Note shared';
  }

  async getSharedNotes(noteId: string, sharedId: string) {
    try {
      const checkSharedNote = await this.shareNoteRepository.findOne({
        where: {
          noteId,
          sharedId,
        },
      });

      if (!checkSharedNote) {
        throw new HttpException(
          'Note cannot be visible to the user',
          HttpStatus.BAD_REQUEST,
        );
      }

      const noteData = await this.findOne(noteId);

      console.log(noteData);

      return noteData.data;
    } catch (error) {
      throw error;
    }
  }
}
