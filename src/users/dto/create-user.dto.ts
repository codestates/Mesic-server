/* validation check */

import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}
