/* validation check */

import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateGoogleUserDto {
  @IsString()
  readonly profile: string;

  @IsString()
  readonly googleId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsArray()
  readonly follow: string[];

  @IsString()
  readonly refreshToken: string;
}
