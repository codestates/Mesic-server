/* validation check */
// optional 하게 들어오게 설정해주자

import { IsString, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly profile: string;

  @IsString()
  readonly nickname: string;
}
