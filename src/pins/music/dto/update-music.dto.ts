import { IsString } from 'class-validator';

export class UpdateMusicDto {
  @IsString()
  readonly music: string;
}
