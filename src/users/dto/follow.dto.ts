import { IsString } from 'class-validator';

export class FollowDto {
  @IsString()
  readonly id: string;
}
