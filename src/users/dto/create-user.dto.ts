/* validation check */

import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

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
}
