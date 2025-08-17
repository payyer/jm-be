import { IsEmail, IsNotEmpty, IsPhoneNumber, minLength, MinLength } from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    emailOrPhone: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string
}

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber("VN")
    phone: string;

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @MinLength(6)
    password: string
}

export class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    @MinLength(6)
    otpCode: string
}