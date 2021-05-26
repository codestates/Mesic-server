/* validation check */

import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly profile: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  password: string;

  @IsString()
  readonly nickname: string;

  @IsArray()
  readonly follow: string[];

  @IsString()
  refreshToken: string;
}
