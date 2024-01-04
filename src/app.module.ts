import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationConfig } from 'config/application-config';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ShareNote } from './notes/entities/share-note.entity';
import { SearchModule } from './search/search.module';

@Module({
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
      entities: [User, Note, ShareNote],
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
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
