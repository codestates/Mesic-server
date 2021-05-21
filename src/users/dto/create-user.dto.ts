/* validation check */

import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly profile: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nickname: string;
}
