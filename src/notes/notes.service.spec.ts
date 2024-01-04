import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { applicationConfig } from '../../config/application-config';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from '../users/users.module';
import { NotesModule } from './notes.module';
import { User } from '../users/entities/user.entity';

describe('NotesService', () => {
  let notesService: NotesService;
  let notesRepository: Repository<Note>;
  const NOTE_REPOSITORY_TOKEN = getRepositoryToken(Note);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: NOTE_REPOSITORY_TOKEN,
          useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn() },
        },
      ],
    }).compile();

    notesService = module.get<NotesService>(NotesService);
    notesRepository = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(notesService).toBeDefined();
  });

  describe('create', () => {
    it('userRepository should be defined', async () => {
      await notesService.create(
        { data: 'Hello World Lorem Ipsum' },
        '80836db6-5d2a-4a9c-965c-11a4606b873c',
      );
    });
  });
});
