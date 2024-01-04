import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser';
import { CurrentUserDecoratorTypes } from 'src/types';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @CurrentUser() currentUser: CurrentUserDecoratorTypes,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(createNoteDto, currentUser.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@CurrentUser() currentUser: CurrentUserDecoratorTypes) {
    return this.notesService.findAll(currentUser.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOneById(
    @CurrentUser() currentUser: CurrentUserDecoratorTypes,
    @Param('id') id: string,
  ) {
    return this.notesService.findOneById(id, currentUser.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @CurrentUser() currentUser: CurrentUserDecoratorTypes,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    console.log(id);
    const note = await this.notesService.findOne(id);

    if (!note) {
      throw new HttpException(
        'Note doesnt exist for the user',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (note.createdBy !== currentUser.sub) {
      throw new HttpException(
        'Note is not created by the user',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @CurrentUser() currentUser: CurrentUserDecoratorTypes,
    @Param('id') id: string,
  ) {
    const note = await this.notesService.findOne(id);

    if (!note) {
      throw new HttpException(
        'Note doesnt exist for the user',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (note.createdBy !== currentUser.sub) {
      throw new HttpException(
        'Note is not created by the user',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.notesService.remove(id, currentUser.sub);

    return 'Note deleted successfully';
  }
}
