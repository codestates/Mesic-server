/* validation check */

import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nickname: string;
}
