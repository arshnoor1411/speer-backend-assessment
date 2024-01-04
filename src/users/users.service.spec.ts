import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Note } from '../notes/entities/note.entity';

describe('UsersService', () => {
  let service: UsersService;

  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(Note);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('userRepository should be defined', async () => {
      await service.create({
        firstName: 'Arshnoor',
        lastName: 'Singh',
        email: 'arshnoors196@gmail.com',
        password: 'test@123',
        otp: '123456',
      });
    });
  });
});
