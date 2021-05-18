/* validation check */
// optional 하게 들어오게 설정해주자

import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nickname: string;
}
