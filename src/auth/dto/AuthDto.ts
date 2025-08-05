import { IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string
}

export class RegisterDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    password: string
}