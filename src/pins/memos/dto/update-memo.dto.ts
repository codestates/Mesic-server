import { IsString } from 'class-validator';

export class UpdateMemoDto {
  @IsString()
  readonly memo: string;
}
