import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreatePinDto {
  @IsObject()
  readonly location: string;

  @IsObject()
  readonly user_id: string;

  @IsObject()
  @IsOptional()
  readonly music: string;

  @IsString()
  @IsOptional()
  readonly photo: string;

  @IsString()
  @IsOptional()
  readonly memo: string;
}
