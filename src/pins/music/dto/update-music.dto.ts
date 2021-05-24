import { IsObject } from 'class-validator';

export class UpdateMusicDto {
  @IsObject()
  readonly music: Record<string, any>;
}
