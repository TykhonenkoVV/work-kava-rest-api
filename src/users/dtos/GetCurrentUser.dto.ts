import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetCurrentUserDto {
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
