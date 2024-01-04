import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationConfig } from 'config/application-config';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Note } from './entities/note.entity';
import { NotesModule } from './notes.module';

describe('NotesController', () => {
  let controller: NotesController;

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

        JwtModule.register({
          secret: applicationConfig.jwt.secret,
          signOptions: { expiresIn: '12h' },
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
      ],
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
