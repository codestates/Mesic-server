/* validation check */

import { IsString, IsArray, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly profile: string;

  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  readonly nickname: string;

  @IsArray()
  readonly follow: string[];

  @IsString()
  refreshToken: string;
}
