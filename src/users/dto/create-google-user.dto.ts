/* validation check */

import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateGoogleUserDto {
  @IsString()
  readonly profile: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsArray()
  readonly follow: string[];

  @IsString()
  readonly refreshToken: string;
}
