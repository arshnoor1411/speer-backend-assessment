import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationConfig } from '../../config/application-config';
import { Note } from '../notes/entities/note.entity';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users.module';
import { NotesModule } from '../notes/notes.module';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            DATABASE_HOST: Joi.string(),
            DATABASE_POST: Joi.string(),
            DATABASE_NAME: Joi.string(),
            DATABASE_USER: Joi.string(),
            DATABASE_PASSWORD: Joi.string(),
            PORT: Joi.number().default(5050),
            ENV: Joi.string()
              .valid('development', 'base', 'beta', 'qa')
              .default('development'),
          }),
        }),

        TypeOrmModule.forRoot({
          type: 'postgres',
          host: applicationConfig.db.host,
          port: parseInt(applicationConfig.db.port),
          username: applicationConfig.db.user,
          password: applicationConfig.db.password,
          database: applicationConfig.db.name,
          entities: [User, Note],
          synchronize: true,
        }),

        ThrottlerModule.forRoot([
          {
            ttl: applicationConfig.rateLimit.ttl,
            limit: applicationConfig.rateLimit.limit,
          },
        ]),

        UsersModule,
        JwtModule,
        NotesModule,
        User,
        Note,
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
