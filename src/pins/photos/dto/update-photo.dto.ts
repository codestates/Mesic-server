import { IsString } from 'class-validator';

export class UpdatePhotoDto {
  @IsString()
  readonly photo: string;
}
