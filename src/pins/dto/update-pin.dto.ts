import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePinDto {
    @IsString()
    @IsOptional()
    readonly location: string;

    @IsString()
    @IsOptional()
    readonly music: string;

    @IsString()
    @IsOptional()
    readonly photo: string;

    @IsString()
    @IsOptional()
    readonly memo: string;
}
