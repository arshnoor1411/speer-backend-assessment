import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @MaxLength(200)
  data: string;
}
