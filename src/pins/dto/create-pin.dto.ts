import { IsString, IsNumber } from 'class-validator';

export class CreatePinDto {
    @IsString()
    readonly location: string;

    @IsString()
    readonly music: string;

    @IsString()
    readonly photo: string;

    @IsString()
    readonly memo: string;
}
