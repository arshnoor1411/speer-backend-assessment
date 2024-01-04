import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}
  async create(createNoteDto: CreateNoteDto, userId: string) {
    console.log(userId);
    await this.noteRepository.save({ ...createNoteDto, createdBy: userId });
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
    console.log(id);
    return this.noteRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneById(id: string, userId: string) {
    console.log(userId);
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
}
