import { IsString, IsOptional } from 'class-validator';

export class CreatePinDto {
  @IsString()
  readonly location: string;

  @IsString()
  @IsOptional()
  readonly music: string;

  @IsString()
  @IsOptional()
  readonly photo: string;

  @IsString()
  @IsOptional()
  readonly memo: string;
}
